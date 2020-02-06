import React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Link} from '../../localization/i18n';
import config from '../../config/config'

const styles = theme => ({
    root: {
        margin: '36px 12px 0 12px',
        flexGrow: 1,
        display: 'inline-block',
    },
    sphere: {
        display: 'inline-block',
        width: 62,
        height: 62,
        marginRight: 12,
        marginBottom: 10,
        verticalAlign: 'top',
    },
    factHeader: {
        paddingBottom: 4,
    },
    factDescription: {
        display: 'inline-block',
        width: 'calc(100% - 74px);', //size of sphere
    },
});

class ProgramCategoryFact extends React.Component {

    render() {

        const {classes} = this.props;
        const {divId, headerText, bodyText, ctaText, ctaLink, iconImage} = this.props;

        return (
          <React.Fragment>
            <a id={divId.toLowerCase()} tabIndex="-1"></a>
            <aside className={classes.root} id={divId.toLowerCase()} aria-label={headerText}>
              <img
                className={classes.sphere}
                src={config.apiHost + '/' + iconImage}
                alt={''}
              />
              <div className={classes.factDescription}>
                <Typography
                  component="h3"
                  variant={'h4'}
                  align={'left'}
                  className={'factHeader'}
                >
                  {headerText}
                </Typography>
                <Typography variant={'body1'} align={'left'}>
                  {bodyText}{' '}
                  <Link href={ctaLink}>
                    <a>{ctaText}</a>
                  </Link>
                </Typography>
              </div>
            </aside>
          </React.Fragment>
        )
    }
}

export default withStyles(styles)(ProgramCategoryFact);
