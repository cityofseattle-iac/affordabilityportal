import React from 'react';
import {Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {withTranslation} from '../../localization/i18n';

const styles = theme => ({
    legend: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '24px 12px',
    },
    legendIcon: {
        width: '60px',
    },
    legendText: {
        fontSize: '1.2em',
    }
});

class ProgramLegend extends React.Component {

    render() {

        const {classes} = this.props;

        return (
            <React.Fragment>
                <div className={classes.legend}>
                    <img className={classes.legendIcon} src='https://www.seattle.gov/images/BenefitsCalculator/CiviFormClock.png' alt='Clock icon' />
                    <Typography className={classes.legendText} variant={"body1"}>
                        Programs with this symbol can be applied for online in under 10 minutes
                    </Typography>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(state => state)(withStyles(styles)(withTranslation('program-legend')(ProgramLegend)));
