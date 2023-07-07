import React from 'react';
import CommunityProgramsCollection from "./community-programs-collection";
import ProgramCategoryCollection from "./program-category-collection";
import ProgramLegend from './program-legend';
import {connect} from "react-redux";

class AllPrograms extends React.Component {

    componentDidMount() {
        /** This is where you'd wire up the fetch API call when you switch over to the headless CMS **/
    }

    render() {

        return (
            <div className={"root"}>
                <ProgramLegend/>
                <CommunityProgramsCollection/>
                <ProgramCategoryCollection/>
            </div>
        );

    }

}

export default connect(state => state)(AllPrograms);