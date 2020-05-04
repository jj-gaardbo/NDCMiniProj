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

import musicConcert1 from './assets/images/music/concert.jpg'
import musicConcert2 from './assets/images/music/concert2.jpg'
import patternHTC from './assets/images/patterns/halftoneCenter.png'
import patternHTTR from './assets/images/patterns/halftoneTopRight.png'

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
            backgroundMusicVolume: 20
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

        let index = -1;

        return (
            <main className={this.state.classNames}>

                <Title begin={this.begin} title={"Once upon a time..."} />

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


                <Panel ref={this.getOrCreateRef('section-0')} index={0} id={"start"} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/news.mp3'} ambianceVolume={5} handleDone={this.next} frames={[
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
                                html: '<p>January 13th 1989</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {top: '14%', left: '5%'},
                                html: '<p>There was a nation wide panic.<br> This phenomenon was unlike anything ever seen before. <br>People were advised to stay indoors, to avoid<br> being electrocuted by mother nature.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 2,
                                pos: {bottom: '14%', right: '5%'},
                                html: '<p>There was a nation wide panic.<br> This phenomenon was unlike anything ever seen before. <br>People were advised to stay indoors, to avoid<br> being electrocuted by mother nature.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ],
                        children:(
                            <div className="interactive" style={{left: '80%', top: '7%'}}>
                                <ModalElement
                                    title={'Faroe Islands.'}
                                    size={{}}
                                    pos={{top: '30%'}}
                                    className={"modal-dialog-centered modal-md clearfix"}
                                    buttonElement={<img style={{width: '300px'}} src={require('./assets/images/yellow_2.gif')} alt="Butterfly"/>}>
                                    <p>
                                        The first couple of years of my life I was living on the Faroe Islands.
                                    </p>
                                </ModalElement>
                            </div>
                        )
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-1')}  index={1} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h1>Chapter 1: Childhood</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-2')}  index={2} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/birds.mp3'} ambianceVolume={10} frames={[
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
                                html: '<p>October 22th 1989 <br> Toftir, Faroe Islands</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {bottom:'15%', right:'5%'},
                                html: '<p>His first home was a lovely little blue house.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-3')}  index={3} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/baby.mp3'} ambianceVolume={10} frames={[
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
                                pos: {top:'5%', left:'5%'},
                                html: '<p>October 22th 1989</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {bottom:'15%', right:'5%'},
                                html: '<p>A new member of global society is resting in <br>his home.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
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
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'23%', right:'5%'},
                                html: '<p>Our camera has just returned <br>from service, so this is <br>the first ever footage of our son. <br> He is now 6 weeks old.</p>',
                                type: 'speech-bottom-right',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-4')}  index={4} handleDone={this.next} audioOn={this.state.audioOn}   frames={[
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
                            html: '<p>His mother ran her own daycare,<br> and his father was a teacher.</p>',
                            sound: './assets/audio/frame_0_0.mp3'
                        }, {
                            index: 1,
                            pos: {bottom: '10%', left: '2%'},
                            html: '<p>He also had a big brother <br> who was 3 years older.</p>',
                            sound: './assets/audio/frame_0_0.mp3'
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
                            html: "<p>He was very young, when he started <br> to pick up the microphone.</p>",
                            sound: './assets/audio/frame_0_0.mp3'
                        }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-5')}  index={5} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/seagulls.mp3'} ambianceVolume={100} id={'start'} frames={[
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
                                html: '<p>His childhood was good on the islands. <br> But due to his father being offered a job...</p>',
                                sound: './assets/audio/frame_0_0.mp3'
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
                                html: '<p>...they packed up their lives and moved to Denmark. He was 5 years old.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-6')}  index={6} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundTerminal,
                        backgroundPos: {top:'0%', left:'0%'},
                        backgroundSize: {width: '97%'},
                        foregroundSrc: foregroundTerminal,
                        foregroundPos: {top:'-10%', left:'0%'},
                        foregroundSize: {width: '90%'},
                        text: [{
                            index: 0,
                            pos: {top:'8%', left:'2%'},
                            html: "<p>His father's new job on bording school <br> gave him the opportunity to meet <br>a lot of different people with different skills.</p>",
                            sound: './assets/audio/frame_0_0.mp3'
                        },{
                            index: 1,
                            pos: {top:'8%', right:'2%'},
                            html: "<p>He was fascinated by one guy <br> who knew how to navigate a computer terminal.</p>",
                            sound: './assets/audio/frame_0_0.mp3'
                        }]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-7')}  index={7} handleDone={this.next} audioOn={this.state.audioOn} frames={[
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
                            html: "<p>Even though he was foreign <br> he picked up the danish language very quickly <br> and very soon he had made friends who came over to watch movies.</p>",
                            sound: './assets/audio/frame_0_0.mp3'
                        },{
                            index: 1,
                            pos: {bottom:'10%', left:'2%'},
                            html: "<p>He liked watching cartoons and loved to draw himself.</p>",
                            sound: './assets/audio/frame_0_0.mp3'
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
                                pos: {bottom:'10%', left:'2%'},
                                html: "<p>One of his favorite movies was The Matrix.</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-8')}  index={8} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/birds.mp3'} ambianceVolume={40} frames={[
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
                            pos: {top:'10%', left:'2%'},
                            html: "<p>Klinkby primary school</p>",
                            color: 'yellow'
                        },
                        {
                            index: 1,
                            pos: {top:'10%', right:'2%'},
                            html: "<p>He spent the first years of his life in <br>Denmark in a small local school.</p>",
                            sound: './assets/audio/frame_0_0.mp3'
                        }]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-9')}  index={9} handleDone={this.next} audioOn={this.state.audioOn} frames={[
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
                            html: "<p>He was a good student.</p>",
                            sound: './assets/audio/frame_0_0.mp3'
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
                                html: '<p>Upon retiring his teacher held a speech for his class.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'60%', left:'40%'},
                                html: '<p>He will either become a very creative person who writes songs and draws...</p>',
                                type: 'speech-top-left',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 2,
                                pos: {top:'80%', left:'40%'},
                                html: '<p>...or a successful computer programmer.</p>',
                                type: 'speech-top-left',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <BreakerBranch
                    ref={this.getOrCreateRef('section-10')}
                    index={10}
                    header={"Choose a path"}
                    routeoneTitle={'Creativity'}
                    routetwoTitle={'Programming'}
                    routeone={'/creative'}
                    routetwo={'/programmer'}/>

            </main>
        )
    }
}
