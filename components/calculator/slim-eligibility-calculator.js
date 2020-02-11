import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InputZipcode from "./input-zipcode";
import Tooltip from '@material-ui/core/Tooltip';
import InputHouseholdIncome from "./input-income";
import FamilyInput from "./input-family";
import {connect} from "react-redux";
import {applyFilters, setFilteredPrograms} from "../../redux/actions";
import _ from "lodash";
import {Router, withTranslation} from '../../localization/i18n';
import {trackEvent} from '../../pages/utils/google-analytics/ga-track';


const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        margin: '12px 12px',
        backgroundColor: '#fff',
        padding: '10px'
    },
    body: {
        flexGrow: 1,
        textAlign: 'left',
        maxWidth: 1200,
    },
    headerText: {
        padding: 10,
    },
    inputText: {
        paddingLeft: 10,
        margin: 0,
        fontWeight: 100,
    },
    expandedSection: {
        paddingLeft: 0,
        margin: 0,
        fontWeight: 100,
    },
    grid: {
        width: '100%',
        margin: '0 auto',
        padding: 0,
    },
    familyGridItem: {
        minWidth: '260px'
    },
    incomeGridItem: {
        minWidth: '285px'
    },
    submitGridContainer: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: '8px',
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: '8px',
        },
    },
    submitGridItem: {
        borderRadius: 0,
        boxShadow: 'none',
    },
    ctaSize: {
        padding: '12px 0',
        height: '55px',
        width: '100%',
    },
    ctaText: {
        color: '#FFFFFF',
        width: 100,
        textAlign: 'center',
    },
    ctaText_Disabled: {
        color: '#373737',
        width: 100,
        textAlign: 'center',
    },
    input: {
        padding: 0,
        border: 0,
    },
});

class SlimEligibilityCalculator extends React.Component {

    constructor(props) {

        super(props);

        let validated = this.validateInputs();
        this.state = {
            calculatorInputValid: validated
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onFilterChange() {

        let validated = this.validateInputs();

        let filters = this.props.filters;
        filters.calculatorInputValid = validated;
        this.props.dispatch(applyFilters(filters));

        this.setState({
            calculatorInputValid: validated
        })

    }

    validateInputs() {
        let validated = false;
        if ((this.props.filters.adultsCount > 0 || this.props.filters.childrenCount > 0) &&
            (this.props.filters.householdIncomeValue && this.props.filters.householdIncomeValue >= 0)) {
            validated = true;
        }
        return validated;
    }

    handleSubmit(event) {
        event.preventDefault();

        /***************************************************************
         *
         * This can be moved to a server side API
         * when a headless CMS is available. The filters
         * object from the Redux store can be passed
         * as the POST body to the API. The call to the headless CMS
         * should happen on the server side (assuming the headless CMS
         * is not publicly exposed). The response would
         * be the filtered set of programs that can be set
         * in the Redux store before a client side nav to
         * the Results page. The Results page would retrieve
         * the filtered results (or ids) and render the results
         *
         **************************************************************/
        const getAgeList = () => {
            const q_ages = [];

            const adults = this.props.filters.adultsCount;
            const adultsArr = _.range(0, adults);
            _.forEach(adultsArr, function () {
                q_ages.push(19);
            });

            const children = this.props.filters.childrenArr;
            _.forEach(children, function (child) {
                q_ages.push(child.value);
            });
            return q_ages;
        };

        //Income Rule
      /*  const incomeQualified = (programCriteria, size, income) => {
            if (_.has(programCriteria, 'income_limit')) {
                return _.some(programCriteria.income_limit,
                    p => income <= p.income && size >= p.size);
            }
            return true;
        };*/
        // Modifying so that the code takes accounts of min and max income (p.min_income < income < p.income)
        const incomeQualified = (programCriteria, size, income) => {
            if (_.has(programCriteria, 'incomeLimit')) {
                return _.some(programCriteria.incomeLimit,
                    p => parseFloat(p.minIncome) <= parseFloat(income) &&
                         parseFloat(income) <= parseFloat(p.income) &&
                         parseInt(size) >= parseInt(p.Size))
            }
            return true;
        };  


        //Age Rule
        const ageQualified = (programCriteria, ages) => {
            if (_.has(programCriteria, 'ageRequirement')) {
                return _.some(ages, 
                    m => _.inRange(
                        m, 
                        parseInt(programCriteria.ageRequirement.min) - 1, 
                        parseInt(programCriteria.ageRequirement.max) + 1
                    )
                )
            }
            return true;
        };

        //ZipCode Rule
        const zipCodeQualified = (programCriteria, zipcode) => {
            if (_.has(programCriteria, 'zipCodeRequirement')) {
                const filteredZipCodes = _.filter(programCriteria.zipCodeRequirement, p => (p.length > 0)) 
                return filteredZipCodes.length == 0 ? true : _.includes(programCriteria.zipCodeRequirement, zipcode);
            }
            return true;
        };

        //Filter
        const getQualifiedPrograms = (data, ages, income, zipcode) => {
            const size = ages.length;
            return _.filter(data,
                p => incomeQualified(p.criteria, size, income) && 
                     ageQualified(p.criteria, ages) &&
                     zipCodeQualified(p.criteria, zipcode)
            );
        };

        const filtered_programs = getQualifiedPrograms(this.props.programs, getAgeList(),
            this.props.filters.householdIncomeValue, this.props.filters.zipcodeValue);

        this.props.dispatch(setFilteredPrograms(filtered_programs));

        /************** End of fetch API handling once the headless CMS is available ****************/

        trackEvent({
            category: 'Form',
            action: 'Submit Find Services Form'
        });
        Router.push("/eligible-programs");
    };

    render() {

        const {classes, t} = this.props;

        return (

            <section className={classes.root} id="calculator" aria-label="Eligibility calculator">
                <div className={classes.body}>
                    <form onSubmit={this.handleSubmit}>
                        <Typography
                            component="div"
                            variant={"h5"}
                            align={'left'}
                            className={classes.headerText}
                        >
                            {t('introText')}
                        </Typography>

                        <Grid
                            item container
                            direction="row"
                            justify="center"
                            className={classes.grid}
                            xs={12} sm={8} md={12} lg={12}
                        >
                            <Grid
                                item container
                                xs={12} sm={12} md={10} lg={10}
                                direction="row"
                                justify="space-evenly"
                                alignItems="stretch"
                                spacing={1}
                            >
                                <Grid item xs={12} sm={12} md lg={4} className={classes.familyGridItem}>
                                    <FamilyInput onFilterChange={this.onFilterChange}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md lg className={classes.incomeGridItem}>
                                    <InputHouseholdIncome
                                        placeholderText={t('incomePlaceholder')}
                                        name="householdIncomeValue"
                                        inputType={"text"}
                                        onFilterChange={this.onFilterChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg>
                                    <InputZipcode
                                        value={this.props.filters.zipcodeValue}
                                        placeholderText={t('zipCodePlaceHolder')}
                                        name="zipcodeValue"
                                        inputType={"text"}
                                        onFilterChange={this.onFilterChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={12} md={2} lg={2}
                                  direction="row"
                                  alignItems="flex-start"
                                  spacing={1}
                                  className={classes.submitGridContainer}
                            >
                                <Grid className={classes.submitGridItem} item  xs={12} sm={12} md={12} lg={12}>
                                    <Tooltip title={this.state.calculatorInputValid ? "" : t('calcButtonTooltip')}>
                                        <span>
                                            <Button variant='contained' color={"secondary"}
                                                    className={classes.ctaSize}
                                                    type="submit"
                                                    disabled={!this.state.calculatorInputValid}>
                                                <Typography variant={'button'} className={this.state.calculatorInputValid ? classes.ctaText : classes.ctaText_Disabled}>
                                                    {t('buttonText')}
                                                </Typography>
                                            </Button>
                                        </span>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </section>
        );
    }
}

export default connect(state => {
    return state;
})(withStyles(styles)(withTranslation('slim-calc')(SlimEligibilityCalculator)));
