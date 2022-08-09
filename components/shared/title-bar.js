import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {Link, withTranslation} from '../../localization/i18n';

const styles = {

    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        margin: '0 auto',
        paddingTop: '0',
    },

    body: {
        flexGrow: 1,
        maxWidth: '1200px',
        textAlign: 'left',
        padding: '40px 20px',
        margin: '0 auto',
        position: 'sticky',
    },

    gridItem:{
        width: '100%'
    },

    titleCTA: {
        padding: '20px 0',
        height: '100%',
        backgroundColor: '#eeeeee'
    },

    button: {
        width: '100%',
        backgroundColor: '#003da5',
        padding: '6px 0',
        '&:focus': {
            outline: 'solid 3px rgb(229,151,0)',
        },
    },

};

class TitleBar extends React.Component {

    render() {

        const {classes, t} = this.props;

        return (
            <main className={classes.root}>
                <div className={classes.body}>
                    <Grid container
                          direction="row"
                          justify="space-evenly"
                          alignItems="center"
                    >
                        <Grid item className={classes.gridItem}>
                            <Grid container
                                  direction="row"
                                  justify="space-evenly"
                                  alignItems="flex-start"
                                  spacing={2}
                            >
                                <Grid item lg={12} md={12} xs={10} sm={10}>
                                    <Typography component="h1" variant="h4" gutterBottom>
                                        {t('text')}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {t('intro-text')}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </main>
        );
    }
}

export default connect(state => state)(withStyles(styles)(withTranslation('title-bar')(TitleBar)));

