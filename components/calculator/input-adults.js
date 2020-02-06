import React from 'react';
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import SubtractIcon from '@material-ui/icons/RemoveCircleOutline';
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from '@material-ui/core/InputLabel';
import {withTranslation} from '../../localization/i18n';

const MIN_COUNT = 0;
const MAX_COUNT = 9;
const styles = theme => ({
    root:{
        padding: '6px 0',
    },
    inputContainer: {
        position: 'relative',
        left: '12px',
    },
    input: {
        textAlign:'left',
        maxWidth:10,
        padding:'3px 7px',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontWeight: 400,
    },
    itemText:{
        fontSize:14,
        fontWeight:400,
    },
    icon: {
        width: 12,
        height: 12,
    },
    countCol:{
        textAlign: 'right',
    },
});

class InputAdults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            count: this.props.filters.adultsCount,
        };
        this.input = React.createRef();
        this.incrementCount = this.incrementCount.bind(this);
        this.decrementCount = this.decrementCount.bind(this);
    }

    incrementCount(){

        if(this.state.count < 9){

            let count = this.state.count + 1;
            this.setState({
                count: count
            });
            this.props.handleAdultsChange(count);
        }

    }

    decrementCount(){

        if(this.state.count >= 1){

            let count = this.state.count - 1;
            this.setState({
                count: count
            });

            this.props.handleAdultsChange(count);
        }

    }

    render() {
        const {classes, t} = this.props;

        const formFieldId = 'adults-input';
        const aria_label = t('adults in household');

        return (
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <InputLabel htmlFor={formFieldId}>
                            <Typography className={classes.itemText}>{this.props.itemText}</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item>
                    <Grid
                        className={classes.inputContainer}
                        container
                        alignItems="center"
                    >
                        <IconButton disabled={this.state.count <= MIN_COUNT}
                                    title={t('remove_1_adult')} type="button" onClick={this.decrementCount} >
                            <SubtractIcon className={classes.icon}/>
                        </IconButton>
                        <Input
                            id={formFieldId}
                            readOnly
                            disableUnderline={true}
                            value={this.state.count}
                            inputProps={{
                                'aria-label': aria_label,
                                'className': classes.input,
                            }}
                            name={this.props.name}
                            inputRef={this.input}
                          />
                        <IconButton  disabled={this.state.count >= MAX_COUNT}
                            title={t('add_1_adult')} type="button" onClick={this.incrementCount}>
                            <AddIcon className={classes.icon}/>
                        </IconButton>

                    </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default connect(state => state)(withStyles(styles)(withTranslation('input-adults')(InputAdults)));
