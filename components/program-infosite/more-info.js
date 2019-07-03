import React from 'react';
import {withStyles} from "@material-ui/core";
import HowItWorks from "./how-it-works";
import Grid from "@material-ui/core/Grid";
import HowtoApply from "./how-to-apply";
import AreYouEligible from "./are-you-eligible";
import StuffNeeded from "./stuff-needed";
import LearnMore from "./learn-more";

const styles = {
    root: {
        margin: '20px',
    }
};

class MoreInfo extends React.Component {

    render() {

        const {classes, program} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={10}>
                    <Grid item sm={12} xs={12} md={8} lg={8} xl={8}>
                        <Grid container direction={"column"} spacing={4}>
                            <Grid item xs={12}>
                                <HowItWorks program={program}/>
                            </Grid>
                            <Grid item xs={12}>
                                <AreYouEligible program={program}/>
                            </Grid>
                            <Grid item xs={12}>
                                <StuffNeeded program={program}/>
                            </Grid>
                            <Grid item xs={12}>
                                <LearnMore program={program}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={4} xl={4}>
                        <HowtoApply program={program}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MoreInfo);
