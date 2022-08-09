import Meta from '../components/shared/meta';
import MainNav from "../components/shared/main-nav";
import React from "react";

class Page extends React.Component {

    componentDidMount() {
        // ***OPTIONAL*** 
        //   Config Settings for Seattle.Gov Branding:
        //   Defaults:
        //     var seaBrandConfig = {
        //       header: true, 
        //       search: true,
        //       footer: true,
        //       deptName: '',
        //       deptURL: '',
        //       deptSubtitle: '',
        //       containBody: false,
        //     }
        const vars = document.createElement('script');
        vars.innerHTML = 'var seaBrandConfig = { search: false, footer: false, translation: true }';
        document.head.appendChild(vars)
        
        const script = document.createElement('script');
        script.src = 'https://www.seattle.gov/prebuilt/js/seaBrand/autoSeaBrand.js';
        document.head.appendChild(script);
    }

    render() {

        const {title, description, keywords, children} = this.props;

        return (
            <div>
                <Meta title={title} description={description} keywords={keywords}/>
                { children }
            </div>
        );
    }

}
export default Page;