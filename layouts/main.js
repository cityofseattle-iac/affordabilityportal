import Meta from '../components/shared/meta';
import MainNav from "../components/shared/main-nav";
import React from "react";

class Page extends React.Component {

    render() {

        const {title, description, keywords, children} = this.props;

        return (
            <div>
                <Meta title={title} description={description} keywords={keywords}/>
                <MainNav/>
                { children }
            </div>
        );
    }

}
export default Page;