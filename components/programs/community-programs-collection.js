import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import Spheres from "../shared/spheres";
import {withTranslation} from '../../localization/i18n';

const styles = theme => ({
    root: {
        margin: '12px 12px 12px 12px',
        [theme.breakpoints.down('sm')]: {
            margin: '24px 12px',
        },
    },
    collectionContainer: {
        display: 'inline-block',
    },
    desc: {
        display: 'inline-block',
        textAlign: 'left',
        color: '#4C4C4C',
        verticalAlign: 'text-top',
        width: 'calc(100% - 312px);', //size of spheres
        [theme.breakpoints.only('xs')]: {
            width: '100%',
        },
    }
});

class CommunityPrograms extends React.Component {

    render() {

        const {classes, categories, t} = this.props;

        return (
            <React.Fragment>
                <aside className={classes.root} id="programs" aria-label={t('headerText')}>
                    <Typography component="h2" variant={"h3"}>{t('headerText')}</Typography>
                    <div className={classes.collectionContainer}>
                        <Spheres categories={categories}/>
                        <div className={classes.desc}>
                            <Typography variant={"body1"}>{t('description')}</Typography>
                        </div>
                    </div>
                </aside>
            </React.Fragment>
        );
    }
}

export default connect(state => state)(withStyles(styles)(withTranslation('community-programs')(CommunityPrograms)));
