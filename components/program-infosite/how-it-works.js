import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withTranslation} from '../../localization/i18n';
import {withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const styles = {
    root: {
        marginTop: 10,
    },
    info: {
        marginTop: 10
    }
};

class HowItWorks extends React.Component {

    render() {

        const {classes, t, program} = this.props;

        return (
            <section className={classes.root} aria-label={t('title')}>
                <Typography component="h2" variant={"h4"}>{t('title')}</Typography>
                <Divider/>
                <div className={classes.info}>
                    <Typography variant={"body1"} component="div">
                        <div dangerouslySetInnerHTML={{__html: program.how_it_works}} />    
                    </Typography>                            
                </div>
            </section>
        );
    }

}

export default withStyles(styles)(withTranslation('how-it-works')(HowItWorks));