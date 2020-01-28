import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {Link, withTranslation} from '../../localization/i18n';

const styles = {

    root: {
        flexGrow: 1,
        marginTop: 0,
        margin: '0 auto',
        maxWidth: 1200,
        padding: '40px 20px'
    },

    desc: {
        textAlign: 'left',
        color: '#4C4C4C',
    }

};

class EligibleProgramSummary extends React.Component {

    setFocus = (e) => {
        e.preventDefault()
        
        let details = document.getElementById("programDetails")
        details.focus()
        details.scrollIntoView()
    }

    render() {

        const {classes, t} = this.props;

        let count = this.props.filtered_programs.length;
        const desc = t('description');
        let final_desc = desc.replace("${count}", count.toString());

        return (

            <div className={classes.root} id="eligibility">
                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                        <Typography variant={"h3"}>{t('headerText')}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                        <div className={classes.desc}>
                            <Typography variant={"body1"}>{final_desc}</Typography>
                            <Typography variant={"body1"}>
                                <a id="viewProgramDetails" href="#" onClick={this.setFocus}>View program details</a>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );

    }

}

export default connect(state => state)(withStyles(styles)(withTranslation('eligible-programs')(EligibleProgramSummary)));