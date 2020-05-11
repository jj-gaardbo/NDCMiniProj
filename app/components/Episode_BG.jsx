import React from 'react';
import Title from "./Title.jsx";
import Sound from 'react-sound';
import $ from 'jquery';

import backgroundLocationToftir from './assets/images/bg/toftir1.png'
import backgroundLocationKlinkbySkole from './assets/images/bg/klinkby_skole.png'
import backgroundBirth from './assets/images/bg/first2.png'
import backgroundBirth2 from './assets/images/bg/birth2.png'
import backgroundSwingBg from './assets/images/bg/swing_bg-comic2.png'
import backgroundSwingFg from './assets/images/bg/swing_fg2-comic.png'
import backgroundMicrophone from './assets/images/bg/micNewbg.png'
import foregroundMicrophone from './assets/images/bg/micNewfg.png'
import backgroundFaroe from './assets/images/bg/faroe.png'
import backgroundSailing from './assets/images/bg/travel.png'
import backgroundReading from './assets/images/bg/reading.png'
import backgroundTeacher from './assets/images/bg/teacher.png'

import backgroundTerminal from './assets/images/bg/terminal_bg.png'
import foregroundTerminal from './assets/images/bg/terminal_fg2.png'

import matrix from './assets/images/bg/the_matrix.png'
import xraycat from './assets/images/bg/xraycat.png'

import pianoLessons from './assets/images/music/piano.png'
import drumLessons from './assets/images/music/drums.png'

import news from './assets/images/news/news.png'

import dust from './assets/images/dust2.png'
import smoke from './assets/images/smoke.png'
import ModalElement from "./Modal.jsx";
import Breaker from "./Breaker.jsx";
import Panel from "./Panel.jsx";
import BreakerBranch from "./BreakerBranch.jsx";
import {setLS, getLS} from "./Common.jsx";

const backgroundMusic = {
    bn: './assets/audio/building_nightmares.mp3',
    wj: './assets/audio/wonky_jazz.mp3',
    so: './assets/audio/soldier.mp3',
    mp: './assets/audio/maxpayne.mp3'
};


export default class Episode_BG extends React.Component {

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
                this.setState({ready:true, classNames: "App clearfix container-fluid no-scroll", audioOn:true, lockScroll:false});
                break;
            case 'no-sound':
                this.setState({ready:true, classNames: "App clearfix container-fluid no-sound", audioOn:false, lockScroll:false});
                break;
            case 'auto':
                this.setState({ready:true, classNames: "App clearfix container-fluid auto-scroll no-scroll", audioOn:true, lockScroll:true});
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

                <Title begin={this.begin} title={"Origin"} />

                {this.state.audioOn &&
                <Sound    url={backgroundMusic.bn}
                          playStatus={this.state.ready ? Sound.status.PLAYING : Sound.status.PAUSED}
                          playFromPosition={0}
                          volume={this.state.backgroundMusicVolume}
                          playbackRate={1}
                          loop={true}
                          muted="muted"
                />
                }


                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} id={"start"} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/news.mp3'} ambianceVolume={10} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: news,
                        backgroundPos: {top: '-25%', left: '-5%'},
                        backgroundSize: {width: '100%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top: '-10%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: '<p>January 13th 1989 <br> Faroe Islands</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {top: '17%', left: '5%'},
                                html: '<p>There was a nation wide panic.<br> This phenomenon was unlike anything ever seen before. <br>People were advised to stay indoors, to avoid<br> being electrocuted by the massive thunderstorm<br> that was currently hovering over the north Atlantic.</p>',
                                sound: './assets/audio/speak/background/frame_bg_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h1>A child is born</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/birds.mp3'} ambianceVolume={20} frames={[
                    {
                        className: "col-lg-12 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundLocationToftir,
                        backgroundPos: {top:'0%', left:'-0%'},
                        backgroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top:'5%', left:'5%'},
                                html: '<p>October 22th 1989 <br> Toftir, Faroe Islands<br>10 months after the storm.</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {bottom:'15%', right:'5%'},
                                html: '<p>There was a family living in a lovely<br> little blue house on the Faroe Islands.<br> The family had just increased by one.</p>',
                                sound: './assets/audio/speak/background/frame_bg_1.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/baby.mp3'} ambianceVolume={20} frames={[
                    {
                        className: "col-lg-6 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundBirth2,
                        backgroundPos: {top:'0%', left:'-12%'},
                        backgroundSize: {width: '50%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom:'15%', right:'5%'},
                                html: '<p>The new member of the family<br> was resting in his crib.</p>',
                                sound: './assets/audio/speak/background/frame_bg_2.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-6 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 2,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundBirth,
                        backgroundPos: {top:'-23%', left:'-30%'},
                        backgroundSize: {width: '70%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'-20%', left:'-30%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top:'5%', right:'5%'},
                                html: '<p>On this day his father video recorded <br>him for the first time, while narrating <br> the event.</p>',
                                sound: './assets/audio/speak/background/frame_bg_3.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'23%', right:'5%'},
                                html: '<p>Our camera has just returned <br>from service, so this is <br>the first ever footage of our son. <br> He is now 6 weeks old.</p>',
                                type: 'speech-bottom-right',
                                sound: './assets/audio/speak/background/frame_bg_4.mp3'
                            },
                            {
                                index: 2,
                                pos: {bottom:'8%', right:'5%'},
                                html: "<p>For some weird reason his father<br> was being portrayed with a bad impression of a<br> british accent in this context</p>",
                                sound: './assets/audio/speak/background/frame_bg_4m.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn}   frames={[
                    {
                        className: "col-lg-4 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 3,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundSwingBg,
                        backgroundPos: {top: '0%', left: '-20%'},
                        backgroundSize: {width: '10%'},
                        foregroundSrc: backgroundSwingFg,
                        foregroundPos: {top: '0%', left: '-20%'},
                        foregroundSize: {width: '10%'},
                        text: [{
                            index: 0,
                            pos: {top: '5%', left: '5%'},
                            html: '<p>He grew up with a mother, who ran her own daycare, and a father, <br>who was a teacher.</p>',
                            sound: './assets/audio/speak/background/frame_bg_5.mp3'
                        }, {
                            index: 1,
                            pos: {bottom: '10%', left: '2%'},
                            html: '<p>He also had a big brother,<br> who was 3 years older.</p>',
                            sound: './assets/audio/speak/background/frame_bg_6.mp3'
                        }]
                    },{
                        className: "col-lg-8 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 4,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundMicrophone,
                        backgroundPos: {top:'0%', left:'-10%'},
                        backgroundSize: {width: '100%'},
                        foregroundSrc: foregroundMicrophone,
                        foregroundPos: {top:'-10%', left:'-10%'},
                        foregroundSize: {width: '1%'},
                        text: [{
                            index: 0,
                            pos: {top:'5%', left:'5%'},
                            html: "<p>He was very young, when he first started <br> to pick up a microphone.</p>",
                            sound: './assets/audio/speak/background/frame_bg_7.mp3'
                        }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/seagulls.mp3'} ambianceVolume={100} id={'start'} frames={[
                    {
                        className: "col-lg-8 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index:0,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundFaroe,
                        backgroundPos: {top: '-33%', left: '-20%'},
                        backgroundSize: {width: '70%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'-20%', left:'-30%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top:'5%', left:'5%'},
                                html: '<p>He had a good childhood on the islands. <br> But due to his father being offered a job...</p>',
                                sound: './assets/audio/speak/background/frame_bg_8.mp3'
                            }
                        ]
                    },{
                        className: "col-lg-4 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundSailing,
                        backgroundPos: {top:'0%', left:'-42%'},
                        backgroundSize: {width: '50%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top:'5%', left:'5%'},
                                html: '<p>1995</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {bottom:'15%', left:'5%'},
                                html: '<p>...the whole family packed up their lives and moved to Denmark, when he was 5 years old.</p>',
                                sound: './assets/audio/speak/background/frame_bg_9.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundTerminal,
                        backgroundPos: {top:'0%', left:'0%'},
                        backgroundSize: {width: '97%'},
                        foregroundSrc: foregroundTerminal,
                        foregroundPos: {top:'-5%', left:'0%'},
                        foregroundSize: {width: '90%'},
                        text: [{
                            index: 0,
                            pos: {top:'8%', left:'2%'},
                            html: "<p>His father's new job on a bording school<br> gave him the opportunity to meet <br>a lot of exiting new people with different skills.</p>",
                            sound: './assets/audio/speak/background/frame_bg_10.mp3'
                        },{
                            index: 1,
                            pos: {top:'8%', right:'2%'},
                            html: "<p>He was especially fascinated by this one guy <br> who knew how to navigate a computer terminal,<br> and could make a computer do all kinds of crazy things.</p>",
                            sound: './assets/audio/speak/background/frame_bg_11.mp3'
                        }]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-6 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: xraycat,
                        backgroundPos: {top:'0%', left:'-11%'},
                        backgroundSize: {width: '90%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top:'0%', left:'0%'},
                        foregroundSize: {width: '100%'},
                        text: [{
                            index: 0,
                            pos: {top:'10%', left:'2%'},
                            html: "<p>Even though he was foreign<br> he picked up the danish language pretty quickly<br> and very soon he had made friends, who came<br>over to play and watch movies.</p>",
                            sound: './assets/audio/speak/background/frame_bg_12.mp3'
                        },{
                            index: 1,
                            pos: {bottom:'10%', left:'2%'},
                            html: "<p>He liked watching cartoons and loved to draw himself.</p>",
                            sound: './assets/audio/speak/background/frame_bg_13.mp3'
                        }]
                    },{
                        className: "col-lg-6 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: matrix,
                        backgroundPos: {top:'0%', left:'-16%'},
                        backgroundSize: {width: '90%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'-10%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom:'15%', left:'2%'},
                                html: "<p>One of his favorite movies of all times was The Matrix.</p>",
                                sound: './assets/audio/speak/background/frame_bg_14.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom:'7%', left:'2%'},
                                html: "<p>He remembered being blown away by the world of computers.</p>",
                                sound: './assets/audio/speak/background/frame_bg_15.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-6 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: pianoLessons,
                        backgroundPos: {top:'7%', left:'0%'},
                        backgroundSize: {width: '70%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'0%'},
                        foregroundSize: {width: '100%'},
                        text: [{
                            index: 0,
                            pos: {top:'10%', left:'2%'},
                            html: "<p>He started to get interested in music...</p>",
                            sound: './assets/audio/speak/background/frame_bg_16.mp3'
                        },{
                            index: 1,
                            pos: {bottom:'15%', left:'4%'},
                            html: "<p>...and he signed up for piano lessons...</p>",
                            sound: './assets/audio/speak/background/frame_bg_17.mp3'
                        }]
                    },{
                        className: "col-lg-6 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: drumLessons,
                        backgroundPos: {top:'5%', left:'0%'},
                        backgroundSize: {width: '69%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'-10%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom:'18%', left:'2%'},
                                html: "<p>...and later he started to <br>take drum lessons as well.</p>",
                                sound: './assets/audio/speak/background/frame_bg_18.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/birds.mp3'} ambianceVolume={40} frames={[
                    {
                        className: "col-lg-12 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundLocationKlinkbySkole,
                        backgroundPos: {top:'0%', left:'0%'},
                        backgroundSize: {width: '100%'},
                        text: [{
                            index: 0,
                            pos: {top:'10%', left:'4%'},
                            html: "<p>Klinkby elementary school</p>",
                            color: 'yellow'
                        },
                        {
                            index: 1,
                            pos: {top:'10%', right:'2%'},
                            html: "<p>He spent the first years of his Danish life <br>in a small local school.</p>",
                            sound: './assets/audio/speak/background/frame_bg_19.mp3'
                        }]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-7 window skew-4-left small-frame-center",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundReading,
                        backgroundPos: {bottom:'37%', left:'3%'},
                        backgroundSize: {width: '100%'},
                        text: [{
                            index: 0,
                            pos: {bottom:'10%', left:'2%'},
                            html: "<p>... and he was an average student<br> in most of the courses.</p>",
                            sound: './assets/audio/speak/background/frame_bg_20.mp3'
                        }]
                    },{
                        className: "col-lg-5 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundTeacher,
                        backgroundPos: {top:'-35%', left:'-2%'},
                        backgroundSize: {width: '50%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'-20%'},
                        foregroundSize: {width: '60%'},
                        text: [
                            {
                                index: 0,
                                pos: {top:'6%', right:'2%'},
                                html: '<p>Upon retiring, the teacher, who had been around<br> for several years, held a speech for the class mentioning him.</p>',
                                sound: './assets/audio/speak/background/frame_bg_21.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'60%', left:'40%'},
                                html: '<p>He will either become a very successful artist, who is creative and writes songs or draws...</p>',
                                type: 'speech-top-left',
                                sound: './assets/audio/speak/background/frame_bg_22.mp3'
                            },
                            {
                                index: 2,
                                pos: {top:'80%', left:'40%'},
                                html: '<p>...or a successful computer programmer.</p>',
                                type: 'speech-top-left',
                                sound: './assets/audio/speak/background/frame_bg_23.mp3'
                            }
                        ]
                    }
                ]}/>

                <BreakerBranch
                    ref={this.getOrCreateRef('section-'+index)}
                    index={index++}
                    header={"Choose a path..."}
                    routeoneTitle={'Creativity'}
                    routetwoTitle={'Computers'}
                    routeone={'/creativity'}
                    routetwo={'/computers'}/>

            </main>
        )
    }
}
