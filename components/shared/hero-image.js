import React from 'react';
import {Background, Parallax} from 'react-parallax';
import {withStyles} from '@material-ui/core/styles';
import {withTranslation} from '../../localization/i18n';

const styles = {

    root: {
        height: 293,
        backgroundColor: '#4C4C4C',
    },

    image: {
        minHeight: 293,
        display: 'block',
    },

};


class HeroImage extends React.Component {

    render() {
        const {
            classes,
            image = 'https://www.seattle.gov/assets/images/2015_IMG/PageBackgrounds/DSC_1212-Edit.jpg',
            t
        } = this.props;
        const alt = t('image_alt');

        return (
            <div className={classes.root}>
                <Parallax strength={300}>
                    <div className={classes.image}/>
                    <Background className={classes.image}>
                        <img src={image} alt={alt}/>
                    </Background>
                </Parallax>
            </div>
        );
    }

}

export default withStyles(styles)(withTranslation('hero-image')(HeroImage));
