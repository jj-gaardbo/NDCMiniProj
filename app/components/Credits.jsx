import React from 'react';
import Title from "./Title.jsx";
import Sound from 'react-sound';
import $ from 'jquery';

import dust from './assets/images/dust2.png'
import smoke from './assets/images/smoke.png'
import ModalElement from "./Modal.jsx";
import Breaker from "./Breaker.jsx";
import Panel from "./Panel.jsx";
import {getLS, setLS} from "./Common.jsx";
import BreakerBranch from "./BreakerBranch.jsx";

import AAU from "./assets/images/medialogy/aau.png"

import classroom from "./assets/images/medialogy/meeting_bg.png"
import bridge from "./assets/images/medialogy/bridge.png"
import meeting from "./assets/images/medialogy/meeting_fg.png"
import shake_bg from "./assets/images/medialogy/shake_bg.png"
import shake_fg from "./assets/images/medialogy/shake_fg.png"
import merge_ext from "./assets/images/medialogy/merge_ext.png"
import merge_bg from "./assets/images/medialogy/merge_bg.png"
import merge_fg from "./assets/images/medialogy/merge_fg.png"

import backgroundBirth2 from './assets/images/bg/birth2.png'
import prepareBG from "./assets/images/bg/prepareBackground.png";
import prepareFG from "./assets/images/bg/prepareForeground.png";
import working from './assets/images/working/working2.png'

import noticingCops_fg from "./assets/images/medialogy/noticing_cops_fg.png"
import raid_bg from "./assets/images/medialogy/raid_bg.png"
import raid_fg from "./assets/images/medialogy/raid_fg.png"
import attack_bg from "./assets/images/medialogy/attack_bg.png"
import attack_mg from "./assets/images/medialogy/attack_mg.png"
import attack_fg from "./assets/images/medialogy/attack_fg.png"

const backgroundMusic = {
    bn: './assets/audio/building_nightmares.mp3',
    wj: './assets/audio/wonky_jazz.mp3',
    so: './assets/audio/soldier.mp3',
    mp: './assets/audio/maxpayne.mp3',
    nhd: './assets/audio/nhjhd.mp3',
    uoi: './assets/audio/uoi.mp3',
    fi: './assets/audio/fi.mp3',
    mel: './assets/audio/mel.mp3',
};


export default class Credits extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lockScroll: false,
            audioOn: getLS('audioOn'),
            frameIndex: -1,
            ready: false,
            classNames: "App clearfix container-fluid no-scroll",
            sectionReferences: {},
            backgroundMusicVolume: 10

        };

        this.handleLock = this.handleLock.bind(this);
        this.handleAudioOn = this.handleAudioOn.bind(this);
        this.lockScroll = this.lockScroll.bind(this);
        this.begin = this.begin.bind(this);
        this.next = this.next.bind(this);
        this.getOrCreateRef = this.getOrCreateRef.bind(this);
    }

    getOrCreateRef(id) {
        if (!this.state.sectionReferences.hasOwnProperty(id)) {
            this.state.sectionReferences[id] = React.createRef();
        }
        return this.state.sectionReferences[id];
    }

    lockScroll(lock){
        this.setState({lockScroll: lock});
    }

    handleLock(isVisible, frameIndex){
        if(!this.state.audioOn){return;}
    }

    handleAudioOn(){
        this.setState({audioOn: !this.state.audioOn}, function(){
            setLS('audioOn', this.state.audioOn);
        });
    }

    begin(setting){

        switch(setting){
            case 'sound':
                setLS('audioOn', true);
                this.setState({ready:true, classNames: "App clearfix container-fluid no-scroll", audioOn:true});
                break;
            case 'no-sound':
                setLS('audioOn', false);
                this.setState({ready:true, classNames: "App clearfix container-fluid no-sound", audioOn:false});
                break;
            case 'auto':
                setLS('audioOn', true);
                setLS('autoScroll', true);
                this.setState({ready:true, classNames: "App clearfix container-fluid auto-scroll no-scroll", audioOn:true,lockScroll:true});
                break;
        }

        $('.App').animate({
            scrollTop: $('#start').offset().top
        }, 1500);
    }

    next(index){
        if(getLS('autoScroll')){
            let next = index+1;
            let selector = '[data-panel-index="'+next+'"]';
            if(typeof $(selector).offset() !== "undefined"){
                $('.App').animate({
                    scrollTop: $(selector).offset().top + (window.innerHeight*next)
                }, 1500);
            }
        }
    }

    render() {

        let index = 0;

        return (
            <main className={this.state.classNames}>

                <Title begin={this.begin} title={"Credits"} />

                {this.state.audioOn &&
                <Sound    url={backgroundMusic.uoi}
                          playStatus={this.state.ready ? Sound.status.PLAYING : Sound.status.PAUSED}
                          playFromPosition={0}
                          volume={this.state.backgroundMusicVolume}
                          playbackRate={1}
                          loop={true}
                          muted="muted"
                />
                }

                <Breaker ref={this.getOrCreateRef('section-'+index)}  index={index++} id={"start"} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h2>Graphics:</h2>
                    <p>Jens Jákup Egholm Gaardbo</p>
                    <h2>Voice:</h2>
                    <p>Jens Jákup Egholm Gaardbo</p>
                    <h2>Music:</h2>
                    <p>Jens Jákup Egholm Gaardbo</p>
                    <h2>Sound effects:</h2>
                    <p>freesound.org</p>
                    <hr/>
                    <a href="https://www.linkedin.com/in/jjgaardbo/">LinkedIn</a>
                </Breaker>

        </main>
        )
    }
}
