import { Component } from "react";


class AttendanceList extends Component {
    render() {
        return(
            <>
                <tr>
                    <th scope="row">{this.props.obj.empID}</th>
                    <td>{this.props.obj.date}</td>
                    <td>{this.props.obj.enterTime}</td>
                    <td>{this.props.obj.exitTime}</td>
                </tr>
            </>
        );
    }
}

export default AttendanceList;