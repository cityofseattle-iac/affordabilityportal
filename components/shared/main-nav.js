import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {connect} from "react-redux";
import {withTranslation, Link} from '../../localization/i18n';

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor: '#003da5',
    },
    navBar: {
        boxShadow: 'none!important',
        maxWidth: 1200,
        margin: '0 auto',
    },

    toolbar: {
        alignItems: 'center',
        justifyContent: 'spaceBetween',
    },

    logo: {
        position: 'relative',
        width: 200,
        height: 60,
        flexGrow: 1,
    },

    logoImage: {
        position: 'absolute',
        left: 0,
        maxHeight: 60,
        width: 42,
        padding: '8px 0px',
    },

    logoTitle: {
        display: 'inline-block',
        fontSize: 19,
        fontWeight: 900,
        position: 'relative',
        left: 55,
        top: 8,
        color: '#fff',
        textDecoration: 'none',
    },

    'logoTitle:hover': {
        textDecoration: 'underline'
    },


    logoSlogan: {
        fontWeight: 500,
        fontSize: 14,
        position: 'absolute',
        fontFamily: 'sans-serif',
        left: 55,
        top: 32,
    }

};

class MainNav extends React.Component {

    render() {

        const {classes, t} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="sticky" className={classes.navBar}>
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.logo}>
                            <Link href={'/'}>
                                <a className={"logoImageContainer"}>
                                    <img className={classes.logoImage} src={"/static/logo.png"}
                                         alt={t('image_alt')}/>
                                </a>
                            </Link>
                            <Link href={'/'}>
                                <a className={classes.logoTitle}>{t('title')}</a>
                            </Link>
                            <span className={classes.logoSlogan}>{t('mayor-name')}</span>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MainNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(state => state)(withStyles(styles)(withTranslation('main-nav')(MainNav)));
