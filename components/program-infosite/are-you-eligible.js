import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withTranslation} from '../../localization/i18n';
import {withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Hidden from "@material-ui/core/Hidden";

const styles = {
    root: {
        marginTop: 10,
        overflowX: 'auto',
    },
    info: {
        marginTop: 10
    },
    table: {
        marginTop: 20,
    }
};

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#EAEAEA',
        color: theme.palette.common.black,
        fontSize: 12,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);

class AreYouEligible extends React.Component {

    render() {

        const {classes, t, program} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant={"h4"}>{t('title')}</Typography>
                <Divider/>
                <div className={classes.info}>
                    <ul>
                        {program.criteria.text.map((item, index) => {
                                if (item.category !== 'income') {
                                    return (
                                        <React.Fragment key={index}>
                                            <li>
                                                <Typography key={index} variant={"body1"}>{item.value}</Typography>
                                            </li>
                                        </React.Fragment>
                                    )
                                } else {
                                    return (
                                        <React.Fragment key={index}>
                                            <li>
                                                <Typography key={index} variant={"body1"}>{item.value}</Typography>
                                            </li>
                                            <Table className={classes.table}>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell
                                                            align="center">{t('col-1-header')}</StyledTableCell>
                                                        <Hidden only={['sm', 'xs']}>
                                                            <StyledTableCell
                                                                align="center">{t('col-2-header')}</StyledTableCell>
                                                        </Hidden>
                                                        <StyledTableCell
                                                            align="center">{t('col-3-header')}</StyledTableCell>
                                                        <Hidden only={['sm', 'xs']}>
                                                            <StyledTableCell
                                                                align="center">{t('col-4-header')}</StyledTableCell>
                                                        </Hidden>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {program.criteria.income_limit.map((result) => {
                                                        if (result.min_income !== 0) {
                                                            return (
                                                                <TableRow key={result.size}>
                                                                    <StyledTableCell
                                                                        align="center">{result.size}</StyledTableCell>
                                                                    <Hidden only={['sm', 'xs']}>
                                                                        <StyledTableCell
                                                                            align="center">{""}</StyledTableCell>
                                                                    </Hidden>
                                                                    <StyledTableCell
                                                                        align="center">{"$"}{result.min_income}{" - $"}{result.income}</StyledTableCell>
                                                                    <Hidden only={['sm', 'xs']}>
                                                                        <StyledTableCell
                                                                            align="center">{""}</StyledTableCell>
                                                                    </Hidden>
                                                                </TableRow>
                                                            );
                                                        }
                                                        else if (result.min_income === 0){
                                                            return (
                                                                <TableRow key={result.size}>
                                                                    <StyledTableCell
                                                                        align="center">{result.size}</StyledTableCell>
                                                                    <Hidden only={['sm', 'xs']}>
                                                                        <StyledTableCell
                                                                            align="center">{""}</StyledTableCell>
                                                                    </Hidden>
                                                                    <StyledTableCell
                                                                        align="center">{"$"}{result.income}</StyledTableCell>
                                                                    <Hidden only={['sm', 'xs']}>
                                                                        <StyledTableCell
                                                                            align="center">{""}</StyledTableCell>
                                                                    </Hidden>
                                                                </TableRow>
                                                            );
                                                        }
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </React.Fragment>
                                    )
                                }
                            }
                        )}
                    </ul>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(withTranslation('are-you-eligible')(AreYouEligible));


/*

Removed Annual and Weekly income

<TableBody>
            {program.criteria.income_limit.map((result) => {
                return (
                    <TableRow key={result.size}>
                        <StyledTableCell
                            align="center">{result.size}</StyledTableCell>
                        <Hidden only={['sm', 'xs']}>
                            <StyledTableCell
                                align="center">{result.annual_income}</StyledTableCell>
                        </Hidden>
                        <StyledTableCell
                            align="center">{result.income}</StyledTableCell>
                        <Hidden only={['sm', 'xs']}>
                            <StyledTableCell
                                align="center">{result.weekly_income}</StyledTableCell>
                        </Hidden>
                    </TableRow>
                );
            })}
</TableBody>






 */