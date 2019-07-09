import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import {applyFilters} from "../../redux/actions";
import {connect} from "react-redux";
import {withTranslation} from '../../localization/i18n';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        margin: '0 auto',
    },
    body: {
        flexGrow: 1,
        textAlign: 'left',
        maxWidth: 1200,
        margin: '0 auto',
    },
    headerText: {
        padding: 10,
    },
    inputText: {
        paddingLeft: 10,
        margin: 0,
        fontWeight: 700,
    },
    inputMonthlyIncomeField: {
        width: '100%',
    },
    paper: {
        padding: '4px 12px',
        color: '#000000',
        backgroundColor: '#EAEAEA',
        borderRadius: 0,
        boxShadow: 'none',
    },
    ctaSize: {
        width: '100%',
    },
    ctaText: {
        width: '100%',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    input: {
        fontSize: '1rem',
        fontWeight: 400,
        color:  theme.palette.common.black,
        '&::placeholder': {
            overflow: 'hidden',
            textOverflow: 'ellipsis !important',
            opacity: 1,
            fontWeight: 200,
        },
    },
    editDoneText: {
        fontSize: 12,
        fontWeight: "bolder",
        textTransform: 'uppercase',
    },
});

class InputHouseholdIncome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            householdIncomeText: props.placeholderText,
            householdIncomeValue: props.filters.householdIncomeValue
        };
        this.input = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        this.setState({active: true}); // Set State for Edit Text
        if (!this.state.active) {
            this.input.current.focus(); // Set Focus on Input
        }
    }

    handleBlur(e) {
        const {value} = e.target;
        if (value !== undefined && !isNaN(Number(value))) {
            let householdIncomeValue = value ? Number(value).toFixed(2) : null;
            this.setState({householdIncomeValue}); // Set State for Edit Text
            let filters = this.props.filters;
            filters.householdIncomeValue = householdIncomeValue;
            this.props.dispatch(applyFilters(filters));

            this.props.onFilterChange();
        }
        this.setState({active: false}); // Set State for Edit Text
    }

    handleChange(e) {
        const {value} = e.target;

        if (value !== undefined) {

            let householdIncomeValue = value;
            this.setState({householdIncomeValue: householdIncomeValue});

            let filters = this.props.filters;
            filters.householdIncomeValue = householdIncomeValue;
            this.props.dispatch(applyFilters(filters));

            this.props.onFilterChange();
        }
    }

    render() {

        let placeholder = this.state.householdIncomeText;
        let value = this.state.householdIncomeValue ? this.state.householdIncomeValue : '';

        const {classes} = this.props;

        return (
            <Paper className={this.props.classes.paper} onClick={this.handleClick}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <TextField
                            required
                            id={this.props.name}
                            value={value}
                            type={this.props.inputType}
                            label={placeholder}
                            className={classes.textField}
                            name={this.props.name}
                            inputRef={this.input}
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            fullWidth
                            margin="none"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            InputLabelProps={{ required: false }}
                            inputProps={{
                            'aria-label': this.props.inputName,
                            'className': this.props.classes.input,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant={"body1"}
                            className={this.props.classes.editDoneText}>{this.state.active ? this.props.t('done') : this.props.t('edit')}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

}

InputHouseholdIncome.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number']).isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

export default connect(state => state)(withStyles(styles)(withTranslation('input-income')(InputHouseholdIncome)));
