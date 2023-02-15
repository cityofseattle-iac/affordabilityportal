import React from 'react';
import ProgramCategorySection from "./program-category-section";
import ProgramCategoryFact from "./program-category-fact";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
        margin: '0px auto',
        maxWidth: 1200,
    },
};

class ProgramCategoryCollection extends React.Component {

    render() {

        const {classes, categories} = this.props;

        return (

            <React.Fragment>
                <div className={classes.root}>
                    <Grid container>
                        {categories.map((category) => {

                            return (
                                <Grid item key={"category_" + category.name}>
                                    <ProgramCategoryFact
                                        divId={category.name}
                                        headerText={category.factHeaderText}
                                        bodyText={category.factText}
                                        ctaText={category.factCtaText}
                                        ctaLink={"#calculator"}
                                        iconImage={category.iconImage}
                                    />
                                    <ProgramCategorySection programCategoryName={category.name} programCategoryHeader={category.HeaderText} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </React.Fragment>

        );
    }
}

export default connect(state => state)(withStyles(styles)(ProgramCategoryCollection));
