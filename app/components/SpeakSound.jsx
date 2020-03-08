import React from 'react';
import Sound from 'react-sound';
import $ from 'jquery';

export default class SpeakSound extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playStatus: Sound.status.PAUSED,
            position: 0,
            volume: 30,
            playbackRate: 1,
            loop: false,
            isPlaying: false
        };

        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.pause = this.pause.bind(this);
        this.handleSongLoading = this.handleSongLoading.bind(this);
        this.handleSongPlaying = this.handleSongPlaying.bind(this);
        this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let self = this;
        $('.App').off('scroll').on('scroll', function(){
            self.handleScroll();
        });
        $('.audio-btn').off('click').on('click', function(){
            self.handleMute();
        });
    }

    handleMute(){
        if(!window.$globalState.audioOn){
            let self = this;
            self.setState({volume:0});
            self.stop();
        }
    }

    handleScroll(){
        this.stop();
        window.$globalState.textAudioPlaying = false;
    }

    play(){
        if(window.$globalState.textAudioPlaying){return;}

        if(this.state.playStatus === Sound.status.PLAYING){return;}

        this.setState({playStatus:Sound.status.PLAYING});
    }

    stop(){
        this.setState({playStatus:Sound.status.STOPPED});
    }

    pause(){
        this.setState({playStatus:Sound.status.PAUSED});
    }

    handleSongLoading(){}

    handleSongPlaying(){
        this.state.isPlaying = true;
    }

    handleSongFinishedPlaying(){
        this.stop();
        this.props.handleSpeakFinished(this.props.index);
    }

    render() {
        if(!window.$globalState.audioOn){
            this.state.volume = 0;
        }

        return (
            <Sound    url={this.props.url}
                      key={this.props.index}
                      playStatus={this.state.playStatus}
                      playFromPosition={this.state.position}
                      onLoading={this.handleSongLoading}
                      onLoad={() => console.log('Loaded')}
                      onPlaying={this.handleSongPlaying}
                      onFinishedPlaying={this.handleSongFinishedPlaying}
                      onPause={() => console.log('Paused')}
                      onResume={() => console.log('Resumed')}
                      onStop={() => console.log('Stopped')}
                      volume={this.state.volume}
                      playbackRate={this.state.playbackRate}
                      loop={this.state.loop}
                      muted="muted"
            />

        )
    }
}
