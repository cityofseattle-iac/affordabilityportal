import React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Print} from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({

    root: {
        textTransform: 'uppercase',
        margin: '0 20px',
    }

});

class ProgramInfoHeader extends React.Component {
    constructor(props) {
        super(props);
        this.onClickPrint = this.onClickPrint.bind(this);
    }

    onClickPrint() {
        window.print();
    }

    render() {

        const {classes, program} = this.props;

        return (

            <React.Fragment>
                <div className={classes.root} id={program.category.toLowerCase().replace(/-/g, '')}>
                    <Grid container alignItems="flex-end">
                        <Grid item lg={10} xs={8} md={8} xl={10}>
                            <Typography variant={"h5"}>{program.category.replace(/-/g, ' ')}</Typography>
                        </Grid>
                        <Grid item lg={2} xs={4} md={4} xl={2}>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <IconButton
                                        title={'Print'}
                                        onClick={this.onClickPrint}
                                    >
                                        <Print/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>

        );

    }

}

export default withStyles(styles)(ProgramInfoHeader);
