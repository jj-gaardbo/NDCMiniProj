import React from 'react';

export default class Hub extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="hub clearfix">
                <button onClick={this.props.handleAudioOn}>{this.props.audioOn ? 'Audio On' : 'Audio Off'}</button>
            </div>
        )
    }
}
