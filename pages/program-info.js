import React from 'react';
import ProgramInfoHeader from '../components/program-infosite/header';
import {withStyles} from "@material-ui/core";
import {i18n, Link, withTranslation} from "../localization/i18n";
import {setCategories, setPrograms} from "../redux/actions";
import Page from '../layouts/main';
import ProgramInfoCardsSection from '../components/program-infosite/card';
import MoreInfo from "../components/program-infosite/more-info";
import ProgramDetails from "../components/program-infosite/details";
import ProgramInfoBreadcrumbs from "../components/program-infosite/program-info-breadcrumbs";
import { connect } from 'react-redux';
import { getCategories } from '../api/categoryApi';
import { getPrograms } from '../api/programsApi';
import NewWindowWarning from '../components/shared/new-window-warning'

const styles = theme => ({

    root: {
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
    }

});

class ProgramInfo extends React.Component {

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

        let id = "";
        if (ctx.isServer) id = ctx.req.params.id;
        else id = ctx.query.id;

        return {
            namespacesRequired: ['common', 'main-nav', 'program-info-card',
                'how-it-works', 'how-to-apply', 'stuff-needed', 'learn-more', 'questions',
                'program-info-breadcrumbs'],
            id: id
        };
    }

    render() {
        const {classes, programs, id} = this.props;
        let program = programs.find(program => program.vanityUrl === id);

        return (

            <Page title={program.seo_title} description={program.seo_description} keywords={program.seo_keywords}>
                <div className={classes.root}>
                    <NewWindowWarning/>
                    <ProgramInfoBreadcrumbs/>
                    <ProgramInfoHeader program={program}/>
                    <ProgramDetails program={program}/>
                    <ProgramInfoCardsSection program={program}/>
                    <MoreInfo program={program}/>
                </div>
            </Page>

        );

    }

}

export default connect(state => state)(withStyles(styles)(withTranslation('common')(ProgramInfo)));