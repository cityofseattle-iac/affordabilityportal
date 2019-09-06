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
                        if (item.category === 'cell' || item.category === 'email') {
                            return (<Typography key={index} variant={"body1"}>{item.value}</Typography>)
                        }
                        else if (item.category === 'website'){
                            return (<Typography key={index} variant={"body1"}>
                                <a href={item.value}>{'Ask Questions Here'}</a> </Typography>)
                        }
                    })}
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(withTranslation('questions')(Questions));
