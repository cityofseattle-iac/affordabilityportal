import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withTranslation} from '../../localization/i18n';
import {withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid/Grid";

const styles = {
    root: {
        marginTop: 10,
    },
    info: {
        marginTop: 10
    }
};

class Questions extends React.Component {

    render() {

        const {classes, t, program} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant={"h4"}>{t('title')}</Typography>
                <Divider/>

                <div className={classes.info}>
                    {program.questions.text.map((item, index) =>{
                        if (item.category == 'cell') {
                            return (
                                <React.Fragment key={index}>
                                    <Typography key={index} variant={"body1"}>{item.value}</Typography>
                                </React.Fragment>
                            )
                        }
                        else if (item.category == 'email'){
                            return (
                                <React.Fragment key={index}>
                                    <Typography key={index} variant={"body1"}>{item.value}</Typography>
                                </React.Fragment>
                            )
                        }
                        else if (item.category == 'website'){
                            return (
                                <React.Fragment key={index}>
                                    <Typography key={index} variant={"body1"}>{item.value}</Typography>
                                </React.Fragment>
                            )
                        }
                    })}

                </div>
            </div>
        );
    }

}

export default withStyles(styles)(withTranslation('questions')(Questions));

/*

 <Grid item>
                        <Typography variant={"h6"}>
                            {t('email')}
                        </Typography>
                        <Typography variant={"body1"}>
                            {program.email}
                        </Typography>
                    </Grid>


                    <Grid item>
                        <Typography variant={"h6"}>
                            {t('phone')}
                        </Typography>
                        <Typography variant={"body1"}>
                            {program.phone}
                        </Typography>
                    </Grid>
 */