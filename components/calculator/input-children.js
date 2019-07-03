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
    root: {
        padding: '6px 0',
    },
    inputContainer: {
        position: 'relative',
        left: '12px',
    },
    input: {
        textAlign: 'left',
        maxWidth: 10,
        padding: '3px 7px',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
    },
    itemText: {
        fontSize: 14,
        fontWeight: 300,
    },
    icon: {
        width: 12,
        height: 12,
    },
    countCol: {
        textAlign: 'right',
    },
});

class InputChildren extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            childrenCount: this.props.filters.childrenCount,
        };
        this.input = React.createRef();
        this.incrementCount = this.incrementCount.bind(this);
        this.decrementCount = this.decrementCount.bind(this);
    }

    incrementCount = event => {

        if (this.state.childrenCount < 9) {
            let count = this.state.childrenCount + 1;
            this.setState({childrenCount: count});

            this.props.addChild();
        }
    };

    decrementCount = event => {

        if (this.state.childrenCount >= 1) {
            let count = this.state.childrenCount - 1;
            this.setState({childrenCount: count});

            this.props.removeChild();
        }

    };

    render() {
        const {t} = this.props;

        const formFieldId = 'children-input';
        const aria_label = t('children_in_household');

        return (
            <div className={this.props.classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <InputLabel htmlFor={formFieldId}>
                            <Typography className={this.props.classes.itemText}>{this.props.itemText}</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item>
                        <Grid
                            className={this.props.classes.inputContainer}
                            container
                            alignItems="center"
                        >
                            <IconButton
                                disabled={this.state.childrenCount <= MIN_COUNT}
                                title={t('remove_1_child')} type="button" onClick={this.decrementCount}
                            >
                                <SubtractIcon className={this.props.classes.icon}/>
                            </IconButton>
                            <Input
                                id={formFieldId}
                                readOnly
                                disableUnderline={true}
                                value={this.state.childrenCount}
                                inputProps={{
                                    min: MIN_COUNT,
                                    max: MAX_COUNT,
                                    'aria-label':  aria_label,
                                    'className': this.props.classes.input,
                                }}
                                name={this.props.name}
                                inputRef={this.input}
                            />
                            <IconButton
                                disabled={this.state.childrenCount >= MAX_COUNT}
                                title={t('add_1_child')} type="button" onClick={this.incrementCount}>
                                <AddIcon className={this.props.classes.icon}/>
                            </IconButton>

                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(state => state)(withStyles(styles)(withTranslation('input-children')(InputChildren)));
