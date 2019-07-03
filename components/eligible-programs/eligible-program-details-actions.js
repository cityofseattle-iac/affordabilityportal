import React from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Typography from "@material-ui/core/Typography";

//TODO: Pullout strings into resource file (Average savings, Average time to apply, etc.)

const style = theme => ({
    cardActions: {
        minHeight: 30,
        padding: 0,
        margin: 0,
        color: '#ffffff',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        [theme.breakpoints.only('xs')]: {
            position: 'relative',
        },
    },
    resultSectionLight: {
        backgroundColor: 'rgba(79, 79, 79, 0.26)',
        padding: '10px',
        height: '100%',
    },
    resultSectionDark: {
        backgroundColor: 'rgba(153, 153, 153, 0.33)',
        padding: '10px',
        height: '100%',
    }
});


function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

class EligibleProgramDetailsActions extends React.Component {
    render() {

        const {classes, time_hear_back, time_to_apply, savings, class_name} = this.props;

        return (
            <React.Fragment>
                <CardActions className={classes[class_name]}>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="stretch"
                    >
                        <Grid item lg={4} md={4} xs={12} sm={4}>
                            <div className={classes.resultSectionLight}>
                                <Typography variant="body2" component="h2">
                                    Average savings: ${ccyFormat(savings)} / Month
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12} sm={4}>
                            <div className={classes.resultSectionDark}>
                                <Typography variant="body2" component="h2">
                                    Average time to apply: {time_to_apply}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12} sm={4}>
                            <div className={classes.resultSectionLight}>
                                <Typography variant="body2" component="h2">
                                    Avg Response time: {time_hear_back}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </CardActions>
            </React.Fragment>
        );

    }

}

EligibleProgramDetailsActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(EligibleProgramDetailsActions);