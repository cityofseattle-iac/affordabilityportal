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
        backgroundColor: '#EAEAEA',
        margin: '0 auto',

    },

    body: {
        flexGrow: 1,
        maxWidth: '1200',
        textAlign: 'left',
        padding: '40px 20px',
        margin: '0 auto',
    },

    titleCTA: {
        padding: '20px 0',
        height: '100%',
    },

    button: {
        width: '100%',
        backgroundColor: '#003da5',
        padding: '6px 0',
    },

};

class TitleBar extends React.Component {

    render() {

        const {classes, t} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.body}>
                    <Grid container
                          direction="row"
                          justify="space-evenly"
                          alignItems="center"
                    >
                        <Grid item>
                            <Grid container
                                  direction="row"
                                  justify="space-evenly"
                                  alignItems="center"
                                  spacing={2}
                            >
                                <Grid item lg={8} md={8} xs={10} sm={10}>
                                    <Typography variant="h4" gutterBottom>
                                        {t('text')}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {t('intro-text')}
                                    </Typography>
                                </Grid>
                                <Grid item lg={4} md={4} xs={8} sm={8} className={classes.titleCTA}>
                                    <Link href={"#programs"}>
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            {t('button-text')}
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default connect(state => state)(withStyles(styles)(withTranslation('title-bar')(TitleBar)));
