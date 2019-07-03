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

class StuffNeeded extends React.Component {

    render() {

        const {classes, t, program} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant={"h4"}>{t('title')}</Typography>
                <Divider/>
                <div className={classes.info}>
                    <ul>
                        {program["stuff_needed"].map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Typography key={index} variant={"body1"}>{item}</Typography>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(withTranslation('stuff-needed')(StuffNeeded));