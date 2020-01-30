import React from 'react';
import Grid from "@material-ui/core/Grid";
import {CardContent, Typography, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {withTranslation} from '../../localization/i18n'

const styles = theme => ({
    root: {
        margin: '20px',
    },
    card: {
        height: '100%',
        backgroundColor: '#C4C4C4',
        textColor: '#4C4C4C',
    },
    cardContent: {
        paddingBottom: '16px',
    }
});

class ProgramInfoCardsSection extends React.Component {

    render() {

        const {classes, program, t} = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item lg={4} md={4} xs={12} sm={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant={"body1"}>{t('savingsHeader')}</Typography>
                                    <Typography component="div" variant={"h4"}>{program.savingsByPeriod}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12} sm={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant={"body1"}>{t('applicationHeader')}</Typography>
                                    <Typography component="div" variant={"h4"}>{program.time_to_apply}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12} sm={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant={"body1"}>{t('notificationHeader')}</Typography>
                                    <Typography component="div" variant={"h4"}>{program.time_hear_back}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }

}

export default withStyles(styles)(withTranslation('program-info-card')(ProgramInfoCardsSection));
