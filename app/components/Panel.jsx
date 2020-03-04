import React from 'react';
import Continue from "../images/continue.png";

export default class Panel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }

    render() {
        let className = "snap clearfix window ";
        className += this.props.skew;
        return (

            <div className={className} id={this.props.id}>

                <div className="row lift">

                    {this.props.frames.map((content,i) =>
                        content
                    )}

                </div>

                <div className="continue">
                    <img src={Continue} alt="Continue"/>
                </div>

            </div>
        )
    }
}
