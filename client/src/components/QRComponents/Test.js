import { Component } from "react";


class Test extends Component {
    render() {
        return(
            <>
                    {this.props.obj.empID}<br />
                    {this.props.obj.date}<br />
                    {this.props.obj.enterTime}<br />
                
            </>
        );
    }
}

export default Test;