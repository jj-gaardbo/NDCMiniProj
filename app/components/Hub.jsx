import React from 'react';

export default class Hub extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mute: false
        };

        this.mute = this.mute.bind(this);
    }

    mute(){
        this.setState({mute:!this.state.mute});
        this.props.handleAudioOn();
    }

    render() {
        return (
            <div className="hub clearfix">
                <button className={'audio-btn'} onClick={this.mute} data-mute={this.state.mute ? 'muted' : ''}>{this.props.audioOn ? 'Audio On' : 'Audio Off'}</button>
            </div>
        )
    }
}
