import React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from '../../localization/i18n';
import {connect} from "react-redux";
import config from '../../config/config'

const styles = theme => ({
    root: {
        margin: 12,
    },
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        backgroundColor: '#EAEAEA',
        boxShadow: 'none',
        position: 'relative',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardActions: {
        padding: 16,
    },
    mediaLink: {
        position: 'absolute',
        bottom: 16,
        verticalAlign: 'bottom',
        fontSize: 18,
        fontWeight: 500,
        textDecoration: 'none',
        color: '#0065B8',
    },
});

/*
Change the size of the card from lg = {4} and md = {4} to  lg = {3} and md = {3}
 */

class ProgramCategorySection extends React.Component {

    render() {

        const numRowElements = 8; // Number of programs to display per row
        const {classes, programCategoryText, programs} = this.props;
        const cleanProgramCategoryText = programCategoryText.replace(/-/g, ' ')

        return (

            <section className={classes.root} aria-label={cleanProgramCategoryText}>
                <Typography component="h4" variant="h5">{cleanProgramCategoryText}</Typography>
                <Grid container
                      spacing={2}
                      alignItems="stretch"
                >
                    {programs
                        .filter(program => program.category === programCategoryText)
                        .slice(0, numRowElements).map(function (program, i) {
                            return ( 
                                <Grid key={"program_" + program.name}
                                    item
                                    lg={3} md={3} xs={12} sm={12}
                                >
                                    <Card className={classes.card}>
                                        <div className={classes.cardInsides}>
                                        <CardMedia className={classes.media} image={config.imagePath + '/' + program.image}
                                                title={program.name}/>
                                        <CardContent>
                                            <Typography variant="h5" component="h5">
                                                {program.name}
                                            </Typography>
                                            <Typography variant="body1">
                                                {program.description}
                                            </Typography>
                                        </CardContent>

                                        <CardActions className={classes.cardActions}>
                                                <Link href={`/program-info?id=${program.vanityUrl}#${program.category.toLowerCase()}`}
                                                    as={`/program-info/${program.vanityUrl}#${program.category.toLowerCase().replace(/-/g, '')}`}>
                                                <a className={classes.mediaLink} aria-label={program.name}>
                                                    Learn more
                                                </a>
                                            </Link>
                                        </CardActions>
                                        </div>
                                    </Card>
                                </Grid>
                                
                            );
                        })}
                </Grid>
            </section>
        );
    }
}

export default connect(state => state)(withStyles(styles)(ProgramCategorySection));
