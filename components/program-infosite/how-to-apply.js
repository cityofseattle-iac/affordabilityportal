import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withTranslation} from '../../localization/i18n';
import {CardContent, withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import {Link} from "../programs/program-category-fact";
import Table from "@material-ui/core/Table/Table";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Button from "@material-ui/core/Button/Button";

const styles = {
    root: {
        marginTop: 10,
    },
    info: {
        marginTop: 10
    }
};
/*
CHANGE: I removed <Typography variant={"body1"}>{t('cta')} {t('screening')}</Typography> and replaced it by
<Typography variant={"body1"}>{program.application_info}</Typography> so that there could be a text at the
head of the HOW TO APPLY section

I also added a field for a website and online application

removed the Fax on the field of apply by mail and change the position of the Information of apply by phone
<Typography variant={"body1"}>{program.address.address_section_fax}</Typography>
<Typography variant={"body1"}>{program.phone} {t('phone_timings')}</Typography>


LINK : {bodyText} <Link href={ctaLink}><a>{ctaText}</a></Link>

address title :  <Typography variant={"h6"}>{program.address.address_section_title}</Typography>
 */

class HowtoApply extends React.Component {

    render() {

        const {classes, t, program} = this.props;


        return (
            <div className={classes.root}>
                <Typography variant={"h4"}>{t('title')}</Typography>
                <Divider/>
                <Grid className={classes.info} container direction={"column"} spacing={2}>
                    <Grid item>
                        <Typography variant={"body1"}>{program.application_info}</Typography>
                    </Grid>

                    <Grid item >
                        <Typography variant={"h6"}>
                            {t('website')}
                        </Typography>

                        <Typography variant={"body1"}>
                            {program.online_application}
                        </Typography>

                        <Typography variant={"body1"}>
                            <a href={program.online_application_link} target={"_blank"}>{program.online_application_link}</a>
                        </Typography>
                    </Grid>

                    <Grid item >
                        <Typography variant={"h6"}>
                            {t('paper_form')}
                        </Typography>

                        <Typography variant={"body1"}>
                            {program.application_form}
                        </Typography>

                        <Typography variant={"body1"}>
                            <a href={program.application_form_link} target={"_blank"}>{program.application_form_link}</a>
                        </Typography>
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
                            {t('mail')}
                        </Typography>

                        <Typography variant={"body1"}>{program.address.address_section_addr_line_1}</Typography>
                        <Typography variant={"body1"}>{program.address.address_section_addr_line_2}</Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant={"h6"}>{t('phone')}</Typography>
                        <Typography variant={"body1"}>{program.address.address_section_phone}</Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant={"h6"}>
                            {t('person')}
                        </Typography>
                        <Typography variant={"body1"}>
                            {program.person_application}
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


                </Grid>
            </div>
        );
    }

}

export default withStyles(styles)(withTranslation('how-to-apply')(HowtoApply));
