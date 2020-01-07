import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link} from '../../localization/i18n';

const styles = theme => ({
    root: {
        display: 'inline-block',
        [theme.breakpoints.only('xs')]: {
            display: 'block',
        },
    },
    sphere: {
        width: 62,
        height: 62,
        marginRight: 12,
        verticalAlign: 'top',
        margin: 'auto',
        display: 'inline-block',
    }
});

class Spheres extends React.Component {

    componentDidMount() {
        /** This is where you'd wire up the fetch API call when you switch over to the headless CMS **/
    }

    render() {

        const {classes, categories} = this.props;

        return (

            <div className={classes.root}>
                {categories.map((category) => {
                    return (
                        <Link key={`program-category-${category.id}`}
                              href={`#${category.name.toLowerCase()}`}
                        >
                            <a href={`#${category.name.toLowerCase()}`}>
                                <img className={classes.sphere} src={'http://www.seattle.gov/' + category.iconImage} alt={category.name}/>
                            </a>
                        </Link>
                    );
                })}
            </div>
        );
    }
}

export default withStyles(styles)(Spheres);
