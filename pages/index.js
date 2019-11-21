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
import { getCategories } from '../api/categoryApi';
import { getPrograms } from '../api/programsApi';

const style = theme => ({

    root: {
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
    },
    repos: {
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '10px',
    },
    bkgContainer: {
      width: '100%',
      backgroundImage: 'url(static/DSC_1212-Edit.jpg)',
      minHeight: '350px',
      display: 'block'    
    }
});

class Index extends React.Component {

    static async getInitialProps(ctx) {

        const { categories, programs } = ctx.store.getState()

        if (categories.length === 0) {
            const data = await getCategories()
            await ctx.store.dispatch(setCategories(data))
        }
        if (programs.length === 0) {
            const data = await getPrograms()
            await ctx.store.dispatch(setPrograms(data))
        }

        let language = "en";
        if (ctx.req === undefined) {
            if(i18n.language !== undefined) language = i18n.language;
        } else if (ctx.req.language !== undefined) language = ctx.req.language;

        return {
            namespacesRequired: ['common', "seo", 'hero-image', 'main-nav', 'title-bar', 'slim-calc',
                'community-programs', 'input-adults', 'input-children', 'input-family', 'input-income',
                'input-age', 'input-zipcode']
        };
    }

    render() {

        const {classes, t} = this.props;

        return (
            <Page title={t('title')} description={t('description')} keywords={t('keywords')}>
                <TitleBar/>
                <div className={classes.bkgContainer}>
                  <div className={classes.repos}>
                    <SlimEligibilityCalculator/>
                  </div>
                </div>                
                <div className={classes.root}>
                    <Programs/>
                </div>
            </Page>
        );
    }
}

export default connect(state => state)(withStyles(style)(withTranslation('seo')(Index)));