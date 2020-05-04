import React from 'react';
import Sound from 'react-sound';
import $ from 'jquery';
import {getLS, setLS} from "./Common.jsx";

export default class AmbienceSound extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playStatus: Sound.status.PAUSED,
            position: 0,
            volume: 0,
            playbackRate: 1,
            loop: true,
            isPlaying: false,
            fadeInterval: null,
            fade: false,
            loaded: false
        };

        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.pause = this.pause.bind(this);
        this.handleSongLoading = this.handleSongLoading.bind(this);
        this.handleSongLoaded = this.handleSongLoaded.bind(this);
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
        if(!getLS('audioOn')){
            let self = this;
            self.setState({volume:0});
            self.stop();
        }
    }

    handleScroll(){
        this.stop();
        setLS('textAudioPlaying', false);
    }

    play(){
        if(this.state.isPlaying){return;}
        this.setState({playStatus:Sound.status.PLAYING, volume:this.props.volume});
        setLS('ambiencePlaying', true);
    }

    stop(){
        let self = this;
        if(self.state.fade){
            let fadeInterval = setInterval(function(){
                self.state.volume = self.state.volume-1;
                if(parseInt(self.state.volume) <= 0){
                    self.setState({playStatus:Sound.status.STOPPED});
                    setLS('ambiencePlaying', false);
                    clearInterval(fadeInterval);
                }
            }, 150);
        } else {
            self.setState({playStatus:Sound.status.STOPPED});
            setLS('ambiencePlaying', false);
        }
    }

    pause(){
        this.setState({playStatus:Sound.status.PAUSED});
        setLS('ambiencePlaying', false);
    }

    handleSongLoading(){

    }

    handleSongLoaded(){
        this.state.loaded = true;
    }

    handleSongPlaying(){
        this.state.isPlaying = true;
    }

    handleSongFinishedPlaying(){
        this.pause();
    }

    render() {
        if(!getLS('audioOn')){
            this.state.volume = 0;
        }

        return (
            <Sound    url={this.props.url}
                      key={this.props.index}
                      playStatus={this.state.playStatus}
                      playFromPosition={this.state.position}
                      onLoading={this.handleSongLoading}
                      onLoad={this.handleSongLoaded}
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
