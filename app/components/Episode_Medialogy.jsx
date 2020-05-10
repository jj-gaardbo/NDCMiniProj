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
import meeting from "./assets/images/medialogy/meeting_fg.png"

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


export default class Episode_Medialogy extends React.Component {

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

                <Title begin={this.begin} title={"Medialogy"} />

                {this.state.audioOn &&
                <Sound    url={backgroundMusic.mel}
                          playStatus={this.state.ready ? Sound.status.PLAYING : Sound.status.PAUSED}
                          playFromPosition={0}
                          volume={this.state.backgroundMusicVolume}
                          playbackRate={1}
                          loop={true}
                          muted="muted"
                />
                }

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} id={"start"} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/birds.mp3'} ambianceVolume={40} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: AAU,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '96%'},
                        foregroundSrc: dust,
                        foregroundPos: {top: '-10%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: '<p>September 1st 2016 <br> Aalborg University Copenhagen, <br>Copenhagen S</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {bottom: '7%', right: '5%'},
                                html: '<p>It was the first day of my new life <br> as a Medialogy student.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} id={"start"} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/classroom.mp3'} ambianceVolume={5} handleDone={this.next} frames={[
                    {
                        className: "col-lg-3 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: classroom,
                        backgroundPos: {top: '0%', left: '-31%'},
                        backgroundSize: {width: '90%'},
                        foregroundSrc: dust,
                        foregroundPos: {top: '-10%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom: '7%', right: '5%'},
                                html: '<p>I was curious about the people that I would be spending next couple of years with.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_1.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-9 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: classroom,
                        backgroundPos: {top: '3%', left: '0%'},
                        backgroundSize: {width: '100%'},
                        middlegroundSrc: meeting,
                        middlegroundPos: {top: '-4%', left: '-3%'},
                        middlegroundSize: {width: '89%'},
                        foregroundSrc: dust,
                        foregroundPos: {top: '-10%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '7%', right: '5%'},
                                html: '<p>I recognized one of the other students. <br>It was the guy I had met on the street<br> on my way home from the concert<br> over a year ago.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_2.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'48%', left:'28%'},
                                html: '<p>Hi. My name is Jens.</p>',
                                type: 'speech-top-left',
                                sound: './assets/audio/speak/medialogy/frame_med_3.mp3'
                            },
                            {
                                index: 2,
                                pos: {top:'60%', right:'30%'},
                                html: "<p>I'm Jákup</p>",
                                type: 'speech-top-right',
                                sound: './assets/audio/speak/medialogy/frame_med_4.mp3'
                            }
                        ]
                    }
                ]}/>


        </main>
        )
    }
}
