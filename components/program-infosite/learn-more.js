import React from 'react';
import {Link, withTranslation} from '../../localization/i18n';
import {withStyles} from '@material-ui/core'
import Button from "@material-ui/core/Button";

const styles = {
    button: {
        '&:focus': {
            outline: 'solid 3px rgb(229,151,0)',
        }
    }
}

class LearnMore extends React.Component {

    render() {

        const {t, program, classes} = this.props;

        return (
            <Button 
                variant="contained" 
                size="large" 
                color="primary" 
                href={program.url}
                target={"_blank"}
                aria-label="Learn more about this program at Seattle.gov"
                aria-describedby="new-window-warning"
                className={this.props.classes.button}
            >
                {t('cta-text')}
            </Button>
        );
    }

}

export default (withStyles(styles)(withTranslation('learn-more')(LearnMore)));
