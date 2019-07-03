import React from 'react';

import TitleBar from '../components/shared/title-bar';
import HeroImage from '../components/shared/hero-image';
import SlimEligibilityCalculator from '../components/calculator/slim-eligibility-calculator';
import Programs from '../components/programs/programs';
import {connect} from "react-redux";
import Page from '../layouts/main';
import {i18n, Link, withTranslation} from '../localization/i18n';
import {PropTypes} from 'prop-types';
import {setCategories, setPrograms} from "../redux/actions";
import {withStyles} from "@material-ui/core";

const style = theme => ({

    root: {
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
    },
});

class Index extends React.Component {

    static async getInitialProps(ctx) {

        /********************** Move to API when headless CMS in place ************************/

        function getCategories(language) {
            return require('../content/' + language + '/data/categories');
        }

        function getPrograms(language) {
            return require('../content/' + language + '/data/programs');
        }

        const language = ctx.req === undefined ? i18n.language : ctx.req.language;

        const categories = getCategories(language);
        ctx.store.dispatch(setCategories(categories));

        const programs = getPrograms(language);
        ctx.store.dispatch(setPrograms(programs));

        return {
            namespacesRequired: ['common', "seo", 'hero-image', 'main-nav', 'title-bar', 'slim-calc',
                'community-programs', 'input-adults', 'input-children', 'input-family', 'input-income',
                'input-age', 'input-zipcode'],
            programs: programs,
            categories: categories
        };
    }

    render() {

        const {classes, t} = this.props;

        return (
            <Page title={t('title')} description={t('description')} keywords={t('keywords')}>
                <TitleBar/>
                <div className={classes.root}>
                    <SlimEligibilityCalculator/>
                    <HeroImage/>
                    <Programs/>
                </div>
            </Page>
        );
    }
}

export default connect(state => state)(withStyles(style)(withTranslation('seo')(Index)));