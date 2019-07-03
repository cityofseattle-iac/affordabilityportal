import React from 'react';
import App, {Container} from 'next/app';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import {makeStore} from "../redux/store";
import theme from "../themes/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import {appWithTranslation} from '../localization/i18n';

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

export default withRedux(makeStore)(appWithTranslation(IacApp));
