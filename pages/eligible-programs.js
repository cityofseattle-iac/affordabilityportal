import React from 'react';
import {withStyles} from '@material-ui/core';
import SlimEligibilityCalculator from '../components/calculator/slim-eligibility-calculator';
import EligibleProgramsTable from "../components/eligible-programs/eligible-programs-table";
import EligibleProgramDetails from '../components/eligible-programs/eligible-program-details';
import {connect} from "react-redux";
import EligibleProgramSummary from "../components/eligible-programs/eligible-programs-summary";
import Page from '../layouts/main';
import {i18n, withTranslation} from "../localization/i18n";
import {setCategories, setPrograms} from "../redux/actions";
import EligibleProgramsBreadcrumbs from "../components/eligible-programs/eligible-programs-breadcrumbs";
import { getCategories } from '../api/categoryApi';
import { getPrograms } from '../api/programsApi';

const style = theme => ({

    root: {
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
    },
});

class EligiblePrograms extends React.Component {

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

        const language = ctx.req === undefined ? i18n.language : ctx.req.language;

        return {
            namespacesRequired: ['seo', 'slim-calc', 'eligible-programs', 'eligible-programs-table', 'eligible-programs-table',
                'eligible-programs-breadcrumbs', 'input-adults', 'input-children', 'input-family', 'input-income', 'input-age', 'input-zipcode']
        };
    }

    render() {

        const {t} = this.props;

        return (
            <Page title={t('title')} description={t('description')} keywords={t('keywords')}>
                <div className={this.props.classes.root}>
                    <EligibleProgramsBreadcrumbs/>
                    <SlimEligibilityCalculator/>
                    <EligibleProgramSummary/>
                    <EligibleProgramsTable/>
                    <a name="programdetails"></a>
                    <EligibleProgramDetails/>
                </div>
            </Page>

        );

    }

}

export default connect(state => state)(withStyles(style)(withTranslation('seo')(EligiblePrograms)));
