import React from 'react';
import Sound from 'react-sound';

export default class SpeakSound extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playStatus: Sound.status.PAUSED
        };

        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.pause = this.pause.bind(this);
        this.handleSongLoading = this.handleSongLoading.bind(this);
        this.handleSongPlaying = this.handleSongPlaying.bind(this);
        this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this);
    }

    play(){
        this.setState({playStatus:Sound.status.PLAYING});
    }

    stop(){
        this.setState({playStatus:Sound.status.STOPPED});
    }

    pause(){
        this.setState({playStatus:Sound.status.PAUSED});
    }

    handleSongLoading(){}

    handleSongPlaying(){}

    handleSongFinishedPlaying(){
        this.stop();
    }

    render() {
        return <Sound ref={"sound_"+this.props.index} url={this.props.url}
                      key={this.props.index}
                      playStatus={this.state.playStatus}
                      playFromPosition={0}
                      onLoading={this.handleSongLoading}
                      onPlaying={this.handleSongPlaying}
                      onFinishedPlaying={this.handleSongFinishedPlaying} />; // Check props in next section
    }
}
