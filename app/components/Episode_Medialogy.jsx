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

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/classroom.mp3'} ambianceVolume={10} handleDone={this.next} frames={[
                    {
                        className: "col-lg-3 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: bridge,
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

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/classroom.mp3'} ambianceVolume={10} handleDone={this.next} frames={[
                    {
                        className: "col-lg-6 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: shake_bg,
                        backgroundPos: {top: '0%', left: '-1%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: shake_fg,
                        foregroundPos: {top: '10%', left: '0%'},
                        foregroundSize: {width: '70%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '7%', left: '5%'},
                                html: '<p>The moment we shook hands everything went bright.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_5.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-6 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: merge_ext,
                        backgroundPos: {top: '3%', left: '-20%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top: '-10%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '7%', right: '5%'},
                                html: '<p>There was a massive electromagnetic explosion.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_6.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'50%', left:'30%'},
                                html: "<p>BOOOOM!</p>",
                                sound: './assets/audio/speak/medialogy/frame_med_7.mp3',
                                type: 'speech-bottom-right',
                                color: 'yellow'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-4 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundBirth2,
                        backgroundPos: {top: '0%', left: '-18%'},
                        backgroundSize: {width: '71%'},
                        foregroundSrc: dust,
                        foregroundPos: {top: '0%', left: '-10%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom: '7%', left: '5%'},
                                html: '<p>Rapid memory flashes appeared before my eyes.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_8.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-4 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: prepareBG,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '96%'},
                        foregroundSrc: prepareFG,
                        foregroundPos: {top: '15%', left: '-6%'},
                        foregroundSize: {width: '79%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '7%', right: '5%'},
                                html: "<p>Some of them were unrecognizable.<br> But still they felt like my own.</p>",
                                sound: './assets/audio/speak/medialogy/frame_med_9.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-4 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 2,
                        handleLock: this.handleLock,
                        backgroundSrc: working,
                        backgroundPos: {top: '-10%', left: '-4%'},
                        backgroundSize: {width: '88%'},
                        foregroundSrc: dust,
                        foregroundPos: {top: '0%', left: '-10%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '7%', right: '5%'},
                                html: "<p>It was an extreme rush!<br>And it felt as if everything fell into place.</p>",
                                sound: './assets/audio/speak/medialogy/frame_med_10.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: merge_bg,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '96%'},
                        foregroundSrc: merge_fg,
                        foregroundPos: {top: '0%', left: '-10%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '7%', left: '5%'},
                                html: '<p>When I regained consciousness it felt like I had been living two lives.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_11.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '6%', left: '5%'},
                                html: "<p>Suddenly, I felt complete and I discovered abilities, that I hadn't experienced before.</p>",
                                sound: './assets/audio/speak/medialogy/frame_med_12.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/police.mp3'} ambianceVolume={20} handleDone={this.next} frames={[
                    {
                        className: "col-lg-3 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: classroom,
                        backgroundPos: {top: '0%', left: '-1%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: noticingCops_fg,
                        foregroundPos: {top: '15%', left: '-10%'},
                        foregroundSize: {width: '70%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '7%', left: '5%'},
                                html: '<p>In the distance I started to hear sirens.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_13.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-9 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: raid_bg,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '90%'},
                        foregroundSrc: raid_fg,
                        foregroundPos: {top: '-1%', left: '0%'},
                        foregroundSize: {width: '87%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '30%', left: '5%'},
                                html: '<p>You there inside! You are under arrest<br> and you need to come with us immediately!</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_14.mp3',
                                type: 'speech-bottom-right',
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/electricity.mp3'} ambianceVolume={5} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: attack_bg,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '100%'},
                        middlegroundSrc: attack_mg,
                        middlegroundPos: {top: '0%', left: '0%'},
                        middlegroundSize: {width: '100%'},
                        foregroundSrc: attack_fg,
                        foregroundPos: {top: '6%', left: '18%'},
                        foregroundSize: {width: '75%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '7%', left: '5%'},
                                html: '<p>Right now I felt more powerful than ever...</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_15.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '7%', right: '5%'},
                                html: '<p>...and they could all just bring it the fuck on.</p>',
                                sound: './assets/audio/speak/medialogy/frame_med_16.mp3'
                            }
                        ]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h1>The end</h1>
                </Breaker>

        </main>
        )
    }
}
