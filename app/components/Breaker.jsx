import React from 'react';

export default class Breaker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render() {
        return (
            <div className="breaker snap clearfix">
                {this.props.children}
            </div>
        )
    }
}
