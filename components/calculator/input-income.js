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
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'

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
        padding: '2px 10px',
        color: '#000000',
        backgroundColor: '#EAEAEA',
        borderRadius: 0,
        boxShadow: 'none',
        border: 'solid 2px transparent',
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
        padding: '10px 0',
        minWidth: 40,
        float: 'right',
    },
    activeInput: {
        borderColor: grey[700],
    }
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
        if (!this.state.active) {
            this.input.current.focus(); // Set Focus on Input
        } else {
            this.input.current.blur(); 
        }
    }

    handleFocus = () => {
        this.setState({ active: true }); // Set State for Edit Text
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
            <Paper className={`${this.props.classes.paper} ${this.state.active ? this.props.classes.activeInput : ''}`}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={10}>
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
                            onFocus={this.handleFocus}
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
                    <Grid item md={2}>
                        <Button
                            className={this.props.classes.editDoneText}
                            onClick={this.handleClick}
                            aria-label={this.state.active ? 'Click to finish editing' : `Click to edit ${placeholder}`}
                        >
                            {this.state.active ? this.props.t('done') : this.props.t('edit')}
                        </Button>
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
