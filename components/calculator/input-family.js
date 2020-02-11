import React from 'react';
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import InputAdults from './input-adults';
import InputChildCount from './input-children';
import InputSelectAge from './input-select-age';
import {connect} from "react-redux";
import {applyFilters} from "../../redux/actions";
import {withTranslation} from '../../localization/i18n';
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'

//TODO: Pullout strings into resource file (Adults. childern, child, etc.)
const placeholder = 'People in Household';
const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        margin: '0 auto',
    },
    body: {
        flexGrow: 1,
        textAlign: 'left',
        maxWidth: 1200,
        margin: '0 auto',
    },
    headerText: {
        padding: 10,
    },
    inputText: {
        paddingLeft: 10,
        margin: 0,
    },
    grid: {
        width: '100%',
        margin: 0,
        padding: 0,
    },
    paper: {
        padding: '2px 10px',
        height: '100%',
        color: '#000000',
        backgroundColor: '#EAEAEA',
        borderRadius: 0,
        boxShadow: 'none',
    },
    ctaSize: {
        width: '100%',
    },
    input: {
        fontSize: '1rem',
        fontWeight: 400,
        color:  theme.palette.common.black,
        '&::placeholder': {
            overflow: 'hidden',
            textOverflow: 'ellipsis !important',
            opacity: 1,
            fontWeight: 400,
        }
    },
    ctaText: {
        width: '100%',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    editDoneText: {
        fontSize: 12,
        fontWeight: "bolder",
        textTransform: 'uppercase',
        padding: '10px 0',
        minWidth: 40,

    },
    familySection: {
        backgroundColor: '#EAEAEA',
        padding: '16px 12px',
        borderTop: '1px solid #000000',
        display: 'block',
    },
    hideFamilySection: {
        display: 'none',
    },
    inputContainer: {
        border: 'solid 2px #EAEAEA'
    },
    activeInput: {
        borderColor: grey[700],
    },
});

class FamilyInput extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            childrenArr: this.props.filters.childrenArr,
            childrenCount: this.props.filters.childrenCount,
            adultsCount: this.props.filters.adultsCount,
            inputText: this.handleHouseholdInputText(this.props.filters.adultsCount,
                this.props.filters.childrenCount)
        };

        this.input = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.addChild = this.addChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
    }

    handleHouseholdInputText = (adults, children) => {

        if (adults > 1 && children > 1) {
            return `${adults} ${this.props.t('adults')}, ${children} ${this.props.t('children')}`;
        } else if (adults === 1 && children > 1) {
            return `${adults} ${this.props.t('adult')}, ${children} ${this.props.t('children')}`;
        } else if (adults === 1 && children === 1) {
            return `${adults} ${this.props.t('adult')}, ${children} ${this.props.t('child')}`;
        } else if (adults > 1 && children === 1) {
            return `${adults} ${this.props.t('adults')}, ${children} ${this.props.t('child')}`;
        } else if (adults === 0 && children > 1) {
            return `${children} ${this.props.t('children')}`;
        } else if (adults <= 0 && children === 1) {
            return `${children} ${this.props.t('child')}`;
        } else if (adults > 1 && children === 0) {
            return `${adults} ${this.props.t('adults')}`;
        } else if (adults === 1 && children === 0) {
            return `${adults} ${this.props. t('adult')}`;
        } else {
            return '';
        }
    };

    handleAdultsChange = (value) => {
        let text = this.handleHouseholdInputText(value, this.state.childrenArr.length);
        let count = value ? Number(value) : 0;

        this.setState({
            adultsCount: count,
            inputText: text,
        });

        let filters = this.props.filters;
        filters.adultsCount = count;
        this.props.dispatch(applyFilters(filters));

        this.props.onFilterChange();
    };

    handleUpdatesToChildrenArr = (arr) => {

        let text = this.handleHouseholdInputText(this.state.adultsCount, arr.length);
        this.setState({
            childrenCount: arr.length,
            childrenArr: arr,
            inputText: text,
        });

        let filters = this.props.filters;
        filters.childrenCount = arr.length;
        filters.childrenArr = arr;
        this.props.dispatch(applyFilters(filters));

        this.props.onFilterChange();

    };

    handleChildrenAgeChanges = (e) => {

        const {name, value} = e.target;

        const index = this.state.childrenArr.findIndex((obj => obj.id.toString() === name));
        let updateChildrenArr = this.state.childrenArr;

        if (index !== -1) {

            // Update item in Array.
            const updatedObj = {...this.state.childrenArr[index], value: value};
            updateChildrenArr = [
                ...this.state.childrenArr.slice(0, index),
                updatedObj,
                ...this.state.childrenArr.slice(index + 1),
            ];
        } else {

            // Add item to Array
            updateChildrenArr = [...this.props.filters.childrenArr, {id: name, value: value}];
            this.setState(previousState => ({
                childrenArr: [...previousState.childrenArr, {id: name, value: value}],
                householdInputText: this.handleHouseholdInputText(this.state.adultsCount, this.state.childrenArr.length + 1),
            }));
        }

        this.setState({
            childrenArr: updateChildrenArr,
            householdInputText: this.handleHouseholdInputText(this.state.adultsCount, updateChildrenArr.length),
        });

        let filters = this.props.filters;
        filters.childrenArr = updateChildrenArr;
        filters.childrenCount = updateChildrenArr.length;
        this.props.dispatch(applyFilters(filters));

    };

    addChild() {
        let array = [...this.state.childrenArr, {'id': this.state.childrenArr.length, 'value': ''}];
        this.handleUpdatesToChildrenArr(array);
    }

    removeChild() {
        let array = [...this.state.childrenArr]; // make a separate copy of the array
        array.pop();
        this.handleUpdatesToChildrenArr(array);
    }

    handleClick() {
        const currentState = this.state.active; // Set State for Edit Text
        this.setState({active: !currentState}); // Set State for Edit Text
    }

    render() {

        return (
            <div className={`${this.props.classes.inputContainer} ${this.state.active ? this.props.classes.activeInput : ''}`}>
                <Paper className={this.props.classes.paper}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={10} sm={10} md={10} lg={10}>
                            <TextField
                                required
                                id={this.props.name}
                                value={this.state.inputText}
                                label={placeholder}
                                name={this.props.name}
                                inputRef={this.input}
                                onClick={this.handleClick}
                                fullWidth
                                margin="none"
                                InputProps={{
                                    disableUnderline: true,
                                    readOnly: true,
                                }}
                                InputLabelProps={{ required: false }}
                                inputProps={{
                                    'aria-label': `${this.props.t('read_only_expand_to_edit')} ${placeholder}`,  // Figure out how to make div accessibile
                                    'className': this.props.classes.input,
                                }}
                            />
                            <div aria-live="assertive" className='screen-reader-text'>
                                {this.state.inputText} {this.props.t('added')}
                            </div>
                        </Grid>
                        <Grid item>
                            <Button
                                className={this.props.classes.editDoneText}
                                onClick={this.handleClick}
                                aria-label={this.state.active ? 'Click to finish editing' : `Click to edit ${placeholder}`}
                            >
                                {this.state.active ? this.props.t('done') : this.props.t('edit')}
                            </Button>
                        
                        </Grid>
                    </Grid>
                </Paper>

                <div
                    className={this.state.active ? this.props.classes.familySection : this.props.classes.hideFamilySection}>
                    <InputAdults itemText={this.props.t('adults_19_plus')} name={"adultsCount"}
                                 handleAdultsChange={this.handleAdultsChange}/>
                    <InputChildCount itemText={this.props.t('children_up_to_18')} name={"childrenCount"} addChild={this.addChild}
                                     removeChild={this.removeChild}/>
                    {this.state.childrenArr.map((child, i) => (
                        <InputSelectAge formFieldId={`child-age-select-${i + 1}`}
                                        key={child.id} itemText={this.props.t('child') + " " + (i + 1).toString() + " " + this.props.t('age')}
                                        name={child.id.toString()} age={child.value}
                                        handleChildrenAgeChanges={this.handleChildrenAgeChanges}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default connect(state => state)(withStyles(styles)(withTranslation('input-family')(FamilyInput)));
