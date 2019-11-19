import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheets} from '@material-ui/styles';
import flush from 'styled-jsx/server';

class MyDocument extends Document {

    render() {

        const {classes} = this.props;

        return (
            <html lang="en">
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-33712689-7"></script>
                <script src="/static/scripts/googleanalytics.js"></script>
                <link rel="shortcut icon" type="image/x-icon" href="https://www.seattle.gov/favicon.ico"/>
                <link href="/static/stylesheets/app.css" rel="stylesheet" />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = async ctx => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,

        // Styles fragment is rendered after the app and page rendering finish.
        styles: (
            <React.Fragment>
                {sheets.getStyleElement()}
                {flush() || null}
            </React.Fragment>
        ),
    };
};

export default MyDocument;
