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
            <div className={classes.root}>
                <Typography variant={"h4"}>{t('title')}</Typography>
                <Divider/>
                <div className={classes.info}>
                    {program["how_it_works"].map((item, index) => {
                            return (
                                <Typography key={index} variant={"body1"}>{item}</Typography>
                            )
                        }
                    )}
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(withTranslation('how-it-works')(HowItWorks));