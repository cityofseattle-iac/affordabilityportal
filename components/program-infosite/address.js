import React from 'react';
import {Card, CardContent, CardHeader, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({});

class AddressInfoSection extends React.Component {

    render() {

        const {classes, program} = this.props;

        return (
            <React.Fragment>
                <Typography variant={"h6"}>{program.address.address_section_title}</Typography>
                <Typography variant={"body1"}>{program.address.address_section_addr_line_1}</Typography>
                <Typography variant={"body1"}>{program.address.address_section_addr_line_2}</Typography>
                <br/>
                <Typography variant={"body1"}>{program.address.address_section_phone}</Typography>
                <Typography variant={"body1"}>{program.address.address_section_fax}</Typography>
            </React.Fragment>
        );

    }

}

export default withStyles(styles)(AddressInfoSection);
