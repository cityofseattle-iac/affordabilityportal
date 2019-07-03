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

    editDoneText: {
        fontSize: 12,
        fontWeight: "bolder",
        textTransform: 'uppercase',
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
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {

        this.setState({active: true}); // Set State for Edit Text
        if (!this.state.active) {
            this.input.current.focus(); // Set Focus on Input
        }

    }

    handleBlur() {
        this.setState({active: false}); // Set State for Edit Text
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
            <Paper className={this.props.classes.paper} onClick={this.handleClick}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid
                        item
                        md={10}
                    >
                        <TextField
                            id={this.props.name}
                            value={value}
                            type={this.props.inputType}
                            label={placeHolder}
                            name={this.props.name}
                            inputRef={this.input}
                            onBlur={this.handleBlur}
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

InputZipcode.propTypes = {
    inputType: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

export default connect(state => state)(withStyles(styles)(withTranslation('input-zipcode')(InputZipcode)));
