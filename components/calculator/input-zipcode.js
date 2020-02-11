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
    paper: {
        padding: '2px 10px',
        color: '#000000',
        backgroundColor: '#EAEAEA',
        borderRadius: 0,
        boxShadow: 'none',
        border: 'solid 2px transparent'
    },

    ctaSize: {
        width: '100%',
    },
    ctaText: {
        width: '100%',
        color: '#FFFFFF',
        textAlign: 'center',
    },

    editDoneText: {
        fontSize: 12,
        fontWeight: "bolder",
        textTransform: 'uppercase', 
        padding: '10px 0',
        minWidth: 40,
        float: 'right'
    },
    activeInput: {
        borderColor: 'rgb(229,151,0)',
    },
});

class InputZipcode extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            active: false,
            zipcodeText: props.placeholderText,
            zipcodeValue: 0
        };
        this.input = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        if (this.state.active) {
            this.input.current.blur()
        } else {
            this.input.current.focus()
        }
    }

    handleBlur() {
        this.setState({active: false})
    }
    handleFocus() {
        this.setState({active: true})
    }

    handleChange(e) {
        const {value} = e.target;

        const zipcode = value.substring(0,5); //only use first 5 to match format of programs
        this.setState({zipcodeValue: zipcode});

        if (value !== undefined) {
            let filters = this.props.filters;
            filters.zipcodeValue = zipcode;
            this.props.dispatch(applyFilters(filters));

            this.props.onFilterChange();
        }
    }

    render() {

        const placeHolder = this.state.zipcodeText;
        let value = '';
        if(this.props.filters.zipcodeValue !== undefined && this.props.filters.zipcodeValue !== 0) {
            value = this.props.filters.zipcodeValue.toString();
        }

        return (
            <Paper className={`${this.props.classes.paper} ${this.state.active ? this.props.classes.activeInput : ''}`} >
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={10} md={9}>
                        <TextField
                            id={this.props.name}
                            value={value}
                            type={this.props.inputType}
                            label={placeHolder}
                            name={this.props.name}
                            inputRef={this.input}
                            onBlur={this.handleBlur}
                            onFocus={this.handleFocus}
                            onChange={this.handleChange}
                            fullWidth
                            margin="none"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            inputProps={{
                                min: 0,
                                'className': this.props.classes.input,
                            }}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Button
                            className={this.props.classes.editDoneText}
                            onClick={this.handleClick}
                            aria-label={this.state.active ? 'Click to finish editing' : `Click to edit ${placeHolder}`}
                        >
                            {this.state.active ? this.props.t('done') : this.props.t('edit')}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

}

InputZipcode.propTypes = {
    inputType: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

export default connect(state => state)(withStyles(styles)(withTranslation('input-zipcode')(InputZipcode)));
