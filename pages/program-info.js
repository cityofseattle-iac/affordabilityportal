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

const styles = theme => ({

    root: {
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
    }

});

class ProgramInfo extends React.Component {

    static async getInitialProps(ctx) {

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

        let id = "";
        if (ctx.isServer) id = ctx.req.params.id;
        else id = ctx.query.id;

        return {
            namespacesRequired: ['common', 'main-nav', 'program-info-card',
                'how-it-works', 'how-to-apply', 'stuff-needed', 'learn-more', 'questions',
                'program-info-breadcrumbs'],
            programs: programs,
            categories: categories,
            id: id
        };
    }

    render() {
        const {classes, programs, id} = this.props;
        let program = programs.find(program => program.vanityUrl === id);

        return (

            <Page title={program.seo_title} description={program.seo_description} keywords={program.seo_keywords}>
                <div className={classes.root}>
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

export default withStyles(styles)(withTranslation('common')(ProgramInfo));