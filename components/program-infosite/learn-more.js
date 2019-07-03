import React from 'react';
import {Link, withTranslation} from '../../localization/i18n';
import Button from "@material-ui/core/Button";

class LearnMore extends React.Component {

    render() {

        const {t, program} = this.props;

        return (
            <Button variant="contained" size="large" color="primary" href={program.url}
                    target={"_blank"}>{t('cta-text')}</Button>
        );
    }

}

export default withTranslation('learn-more')(LearnMore);
