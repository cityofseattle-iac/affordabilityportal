import React from 'react';
import App, {Container} from 'next/app';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import {makeStore} from "../redux/store";
import theme from "../themes/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import {appWithTranslation, Router} from '../localization/i18n';
import {initializeGoogleAnalytics, trackPageView} from './utils/google-analytics/ga-track';

class IacApp extends App {

    static async getInitialProps({Component, ctx}) {

        let pageProps = {};
        pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return {
            pageProps
        };

    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }

        trackPageView(this.props.router.asPath);
        Router.events.on('routeChangeComplete', () => {
            trackPageView(this.props.router.asPath);
        });

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
        const {Component, pageProps, store} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <Container>
                    <Provider store={store}>
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </Provider>
                </Container>
            </MuiThemeProvider>
        );
    }
}

initializeGoogleAnalytics();
export default withRedux(makeStore)(appWithTranslation(IacApp));
