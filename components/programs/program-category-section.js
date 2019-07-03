import React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from '../../localization/i18n';
import {connect} from "react-redux";


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

class ProgramCategorySection extends React.Component {

    render() {

        const numRowElements = 3; // Number of programs to display per row
        const {classes, programCategoryText, programs} = this.props;

        let header = <Typography component="h4" variant="h5">{programCategoryText}</Typography>;

        return (

            <div className={classes.root}>
                {header}
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
                                      lg={4} md={4} xs={12} sm={12}
                                >
                                    <Card className={classes.card}>
                                        <div className={classes.cardInsides}>
                                        <CardMedia className={classes.media} image={program.image}
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
                                            <Link href={`/program-info?id=${program.vanityUrl}#${program.category}`}
                                                  as={`/program-info/${program.vanityUrl}#${program.category.toLowerCase()}`}>
                                                <a className={classes.mediaLink} title={program.name}>
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

            </div>

        );
    }
}

export default connect(state => state)(withStyles(styles)(ProgramCategorySection));