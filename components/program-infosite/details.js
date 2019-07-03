import React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddressInfoSection from "./address";

const styles = theme => ({

    root: {
        margin: '20px',
    },
    name: {
        lineHeight: '32px',
    }

});

class ProgramDetails extends React.Component {

    render() {

        const {classes, program} = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                            <Grid container direction={"column"} spacing={1}>
                                <Grid item>
                                    <Typography variant={"h2"} className={classes.name}>{program.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"body1"}>{program['description-jump']}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <AddressInfoSection program={program}/>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>

        );

    }

}

export default withStyles(styles)(ProgramDetails);
