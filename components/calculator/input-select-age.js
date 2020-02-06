import React from 'react';
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {withTranslation} from '../../localization/i18n';

const styles = theme => ({
    root: {
        padding: '6px 0',
    },
    input: {
        textAlign: 'right',
        padding: '4px 8px',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontWeight: 400,
    },
    itemText: {
        fontSize: 14,
        fontWeight: 400,
    },
    icon: {
        padding: 5,
    },
    countCol: {
        textAlign: 'right',
    },
});

class InputAge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            age: this.props.age,
        };
        this.input = React.createRef();
    }

    handleChange = event => {

        this.setState({age: event.target.value});
        this.props.handleChildrenAgeChanges(event);
    };

    render() {
        const {formFieldId} = this.props;
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
                            container
                            alignItems="center"
                            className={this.props.classes.margin}>
                                <Select
                                    className={this.props.classes.input}
                                    name={this.props.name}
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    displayEmpty
                                    inputProps={{
                                        name: this.props.name,
                                        id: formFieldId,
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>{this.props.t('select')}</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                    <MenuItem value={14}>14</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={16}>16</MenuItem>
                                    <MenuItem value={17}>17</MenuItem>
                                    <MenuItem value={18}>18</MenuItem>
                                </Select>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(withTranslation('input-age')(InputAge));
