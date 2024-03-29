import React from 'react';
import {withStyles} from "@material-ui/core";
import {Link, withTranslation} from '../../localization/i18n';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography";

const styles = {
    root: {
        margin: '20px',
        paddingTop: '0',
    }
};

class ProgramInfoBreadcrumbs extends React.Component {

    render() {

        const {classes, t} = this.props;

        return (
            <div className={classes.root}>
                <Breadcrumbs separator="›" aria-label="Breadcrumb">
                    <Link href="/">
                        <IconButton href="/" component="a" title="Home" aria-label="Return to homepage">
                            <HomeIcon/>
                        </IconButton>
                    </Link>
                    <Typography aria-current="location" color="textPrimary">{t('program')}</Typography>
                </Breadcrumbs>
            </div>
        );
    }
}

export default withStyles(styles)(withTranslation('program-info-breadcrumbs')(ProgramInfoBreadcrumbs));