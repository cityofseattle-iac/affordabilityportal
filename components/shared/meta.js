import Head from 'next/head'
import React from "react";

class Meta extends React.Component {

    render() {

        const {title, description, keywords} = this.props;

        return (<div>
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta charSet="utf-8"/>
                    <meta name="description" content={description}/>
                    <meta name="keywords" content={keywords}/>
                </Head>
            </div>
        );
    }
}

export default Meta;