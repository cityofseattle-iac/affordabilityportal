import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link} from '../../localization/i18n';
import Button from '@material-ui/core/Button'

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
        marginRight: 6,
        marginLeft: 6,
        verticalAlign: 'top',
        margin: 'auto',
        display: 'inline-block',
    }
});

class Spheres extends React.Component {

    setFocus = cat => e => {
        e.preventDefault()

        let details = document.getElementById(cat)
        details.focus()
        details.scrollIntoView()
    }

    render() {

        const {classes, categories} = this.props;

        return (

            <div className={classes.root}>
                {categories.map((category) => {
                    return (
                        //<a href="#" onClick={this.setFocus(category.name.toLowerCase())} >
                        <Button onClick={this.setFocus(category.name.toLowerCase())} key={category.id}>
                            {/* <img className={classes.sphere} src={'http://www.seattle.gov/' + category.iconImage} alt={category.name}/> */}
                            test
                        </Button>
                        //</a>
                    );
                })}
            </div>
        );
    }
}

export default withStyles(styles)(Spheres);
