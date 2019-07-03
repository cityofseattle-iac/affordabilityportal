import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withTranslation} from '../../localization/i18n';
import {CardContent, withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const styles = {
    root: {
        marginTop: 10,
    },
    info: {
        marginTop: 10
    }
};

class HowtoApply extends React.Component {

    render() {

        const {classes, t, program} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant={"h4"}>{t('title')}</Typography>
                <Divider/>
                <Grid className={classes.info} container direction={"column"} spacing={2}>
                    <Grid item>
                        <Typography variant={"body1"}>{t('cta')} {t('screening')}</Typography>
                    </Grid>
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
                            {t('fax')}
                        </Typography>
                        <Typography variant={"body1"}>
                            {program.address.address_section_fax}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h6"}>
                            {t('mail')}
                        </Typography>

                        <Typography variant={"body1"}>{program.address.address_section_addr_line_1}</Typography>
                        <Typography variant={"body1"}>{program.address.address_section_addr_line_2}</Typography>
                        <br/>
                        <Typography variant={"body1"}>{program.address.address_section_phone}</Typography>
                        <Typography variant={"body1"}>{program.address.address_section_fax}</Typography>

                    </Grid>
                    <Grid item>
                        <Typography variant={"h6"}>
                            {t('phone')}
                        </Typography>
                        <Typography variant={"body1"}>
                            {program.phone} {t('phone_timings')}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default withStyles(styles)(withTranslation('how-to-apply')(HowtoApply));
