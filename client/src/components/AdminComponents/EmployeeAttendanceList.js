import React, { Component } from "react";

class EmployeeAttendanceList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <tr>
                    <th scope="row">{this.props.obj.empID}</th>
                    <td>{this.props.obj.date}</td>
                    <td>{this.props.obj.enterTime}</td>
                    <td>{this.props.obj.exitTime}</td>
                    <td>{this.props.obj.timeDifference}</td>
                </tr>
            </>
        );
    }
}

export default EmployeeAttendanceList;