import React from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Actions from './eligible-program-details-actions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Link, withTranslation} from '../../localization/i18n';
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import config from '../../config/config'

const style = theme => ({

    root: {
        flexGrow: 1,
        width: '100%',
        margin: '0 auto'
    },
    body: {
        flexGrow: 1,
        maxWidth: 1152,
        textAlign: 'left',
        padding: '40px 20px',
        margin: '0 auto'
    },
    boldText: {
        fontWeight: '100',
    },
    resultCard: {
        backgroundColor: '#EAEAEA',
    },
    media: {
        width: '100%',
        height: 'auto',
    },
    item: {
        paddingBottom: 20,
    },
    resultImageContainer: {
        height: '100%',
    },
    resultImage: {
        minHeight: 300,
        height: '100%',
    },
    card: {
        margin: '0 auto',
        borderRadius: 0,
        boxShadow: 'none',
        minHeight: 300,
        height: 'auto',
    },
    cardBody: {
        margin: '0 auto',
        borderRadius: 0,
        boxShadow: 'none',
        minHeight: 300,
        height: 'auto',
        position: 'relative',
        backgroundColor: '#EAEAEA',
    },
    cardContent: {
        margin: '0 auto',
        borderRadius: 0,
        paddingBottom: 35,
        boxShadow: 'none',
        position: 'relative',
        // [theme.breakpoints.only('sm')]: {
        //     marginBottom: '75px',
        // },

    },
    cardText: {
        color: '#000',
    },
    resultSectionLight: {
        backgroundColor: 'rgba(153, 153, 153, 0.10)',
        padding: 10,
    },
    resultSectionDark: {
        backgroundColor: 'rgba(79, 79, 79, 0.15)',
        padding: 10,
    },
    resultActions: {
        padding: 0,
        margin: 0,
    },
    mediaLink: {
        fontSize: 18,
        fontWeight: 500,
        textDecoration: 'none',
        color: '#0065B8',
    },
});

class EligibleProgramDetails extends React.Component {

    render() {
        const {classes, filtered_programs, t} = this.props;

        return (
            <div className={classes.root}>
                <a id="programDetails" tabIndex="-1"></a>
                <div className={classes.body}>
                    <Typography component="h2" variant={'h3'} align={'left'}>Program Details {filtered_programs.header}</Typography>
                    {filtered_programs.map((result) => {

                        return (
                            <div key={result.id} className={classes.item}>
                                <Grid key={result.id}
                                      container
                                      direction="row"
                                      justify="space-evenly"
                                >
                                    <Grid item lg={3} md={3} xs={12} sm={12}>
                                        <Card className={classes.resultImageContainer}>
                                            <CardMedia
                                                component="img"
                                                image={config.apiHost + '/' + result.image}
                                                alt={result.name}
                                                className={classes.resultImage}
                                            />
                                        </Card>
                                    </Grid>
                                    <Grid item lg={9} md={9} xs={12} sm={12}>
                                        <Card className={classes.cardBody}>
                                            <CardContent className={classes.cardContent}>
                                                <Typography variant="h5" component="h1" className={classes.cardText}>
                                                    {result.name}
                                                </Typography>
                                                <Typography variant="body1" className={classes.cardText}>
                                                    {result.description}
                                                </Typography>
                                                <Typography variant={'body1'} gutterBottom align={'left'}>
                                                    <Link
                                                        href={`/program-info?id=${result.vanityUrl}#${result.category.toLowerCase()}`}
                                                        as={`/program-info/${result.vanityUrl}#${result.category.toLowerCase().replace(/-/g, '')}`}>
                                                        <a className={classes.mediaLink} aria-label={result.name}>{t('learnMore')}</a>
                                                    </Link>
                                                </Typography>
                                            </CardContent>
                                            <Actions time_hear_back={result.time_hear_back}
                                                     time_to_apply={result.time_to_apply}
                                                     savings={result.savings}
                                                     age = {result.age_range}
                                                     class_name="cardActions"/>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                        );
                    })}
                </div>
            </div>

        );

    }

}

EligibleProgramDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(state => state)(withStyles(style)(withTranslation('eligible-programs-details')(EligibleProgramDetails)));
