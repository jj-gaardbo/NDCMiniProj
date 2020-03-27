import React from 'react';
import Title from "./Title.jsx";
import Sound from 'react-sound';
import $ from 'jquery';
import backgroundBirth from '../images/bg/first2.png'
import backgroundBirth2 from '../images/bg/birth2.png'
import backgroundSwingBg from '../images/bg/swing_bg-comic2.png'
import backgroundSwingFg from '../images/bg/swing_fg2-comic.png'
import backgroundMicrophone from '../images/bg/micNewbg.png'
import foregroundMicrophone from '../images/bg/micNewfg.png'
import backgroundFaroe from '../images/bg/faroe.png'
import backgroundSailing from '../images/bg/travel.png'
import backgroundReading from '../images/bg/reading.png'
import backgroundTeacher from '../images/bg/teacher.png'
import musicConcert1 from '../images/music/concert.jpg'
import musicConcert2 from '../images/music/concert2.jpg'
import patternHTC from '../images/patterns/halftoneCenter.png'
import patternHTTR from '../images/patterns/halftoneTopRight.png'

import news from '../images/news/news.png'

import dust from '../images/dust2.png'
import smoke from '../images/smoke.png'
import ModalElement from "./Modal.jsx";
import Breaker from "./Breaker.jsx";
import Panel from "./Panel.jsx";

const backgroundMusic = {
    bn: './audio/building_nightmares.mp3',
    wj: './audio/wonky_jazz.mp3',
    so: './audio/soldier.mp3',
    mp: './audio/maxpayne.mp3'
};


export default class Programmer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lockScroll: false,
            audioOn: window.$globalState.audioOn,
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
            window.$globalState.audioOn = this.state.audioOn;
        });
    }

    begin(setting){

        switch(setting){
            case 'sound':
                window.$globalState.audioOn = true;
                this.setState({ready:true, classNames: "App clearfix container-fluid no-scroll", audioOn:true});
                break;
            case 'no-sound':
                window.$globalState.audioOn = false;
                this.setState({ready:true, classNames: "App clearfix container-fluid no-sound", audioOn:false});
                break;
            case 'auto':
                window.$globalState.audioOn = true;
                window.$globalState.autoScroll = true;
                this.setState({ready:true, classNames: "App clearfix container-fluid auto-scroll no-scroll", audioOn:true,lockScroll:true});
                break;
        }

        $('.App').animate({
            scrollTop: $('#start').offset().top
        }, 1500);
    }

    next(index){
        if(window.$globalState.autoScroll){
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

                <Title begin={this.begin} />

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

                <Panel ref={this.getOrCreateRef('section-0')} index={0} id={"start"} audioOn={this.state.audioOn} ambiance={'./audio/ambiance/thunder.mp3'} ambianceVolume={40} handleDone={this.next} frames={[
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
                                sound: './audio/frame_0_0.mp3'
                            }
                        ],
                        children:(
                            <div className="interactive" style={{left: '80%', top: '7%'}}>
                                <ModalElement
                                    title={'Faroe Islands.'}
                                    size={{}}
                                    pos={{top: '30%'}}
                                    className={"modal-dialog-centered modal-md clearfix"}
                                    buttonElement={<img style={{width: '300px'}} src={require('../images/yellow_2.gif')} alt="Butterfly"/>}>
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

                <Panel ref={this.getOrCreateRef('section-2')}  index={2} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./audio/ambiance/lullaby.mp3'} ambianceVolume={10} frames={[
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
                                sound: './audio/frame_1_0.mp3'
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
                            sound: './audio/frame_2_0.mp3'
                        },
                        {
                            index: 1,
                            pos: {top:'23%', right:'5%'},
                            html: '<p>Our camera has just returned <br>from service, so this is <br>the first ever footage of our son. <br> He is now 6 weeks old.</p>',
                            type: 'speech-bottom-right',
                            sound: './audio/frame_2_1.mp3'
                        }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-3')}  index={3} handleDone={this.next} audioOn={this.state.audioOn}   frames={[
                    {
                        className: "col-lg-4 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 3,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundSwingBg,
                        backgroundPos: {top: '0%', left: '-20%'},
                        backgroundSize: {width: '10%'},
                        middlegroundSrc: patternHTC,
                        middlegroundPos: {top: '0%', left: '0%'},
                        middlegroundSize: {width: '10%'},
                        foregroundSrc: backgroundSwingFg,
                        foregroundPos: {top: '0%', left: '-20%'},
                        foregroundSize: {width: '10%'},
                        text: [{
                            index: 0,
                            pos: {top: '5%', left: '5%'},
                            html: '<p>His mother ran her own daycare,<br> and his father was a teacher.</p>',
                            sound: './audio/frame_3_0.mp3'
                        }, {
                            index: 1,
                            pos: {bottom: '10%', left: '2%'},
                            html: '<p>His big brother spent a lot <br> of time playing with him.</p>',
                            sound: './audio/frame_3_1.mp3'
                        }]
                    },{
                        className: "col-lg-8 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 4,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundMicrophone,
                        backgroundPos: {top:'0%', left:'-10%'},
                        backgroundSize: {width: '100%'},
                        middlegroundSrc: patternHTTR,
                        middlegroundPos: {top: '-50%', left: '0%'},
                        middlegroundSize: {width: '70%'},
                        foregroundSrc: foregroundMicrophone,
                        foregroundPos: {top:'-10%', left:'-10%'},
                        foregroundSize: {width: '1%'},
                        text: [{
                            index: 0,
                            pos: {top:'5%', left:'5%'},
                            html: "<p>He was very proud, when he started to be able to <br> pronounce his name almost correctly.</p>",
                            sound: './audio/frame_4_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-4')}  index={4} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./audio/ambiance/seagulls.mp3'} ambianceVolume={100} id={'start'} frames={[
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
                                sound: './audio/frame_5_0.mp3'
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
                                sound: './audio/frame_6_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-5')}  index={5} handleDone={this.next} audioOn={this.state.audioOn}  >
                    <h1>Chapter 2: Second childhood</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-6')}  index={6} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-8 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 7,
                        handleLock: this.handleLock,
                        backgroundSrc: backgroundReading,
                        backgroundPos: {top:'-55%', left:'-5%'},
                        backgroundSize: {width: '40%'},
                        text: [{
                            index: 0,
                            pos: {bottom:'10%', left:'2%'},
                            html: "<p>He wasn't the best student in primary in school.</p>",
                            sound: './audio/frame_7_0.mp3'
                        }]
                    },{
                        className: "col-lg-4 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 8,
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
                                pos: {top:'1%', right:'2%'},
                                html: '<p>Upon retiring his teacher held a speech for his class.</p>',
                                sound: './audio/frame_8_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'60%', left:'40%'},
                                html: '<p>He has now become <br> a famous song writer.</p>',
                                type: 'speech-top-left',
                                sound: './audio/frame_8_1.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-7')} id={'start'} index={7} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./audio/ambiance/concert.mp3'} ambianceVolume={5} frames={[
                    {
                        className: "col-lg-6 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 9,
                        handleLock: this.handleLock,
                        backgroundSrc: musicConcert1,
                        backgroundPos: {top:'-10%', left:'-20%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top:'0%', left:'-20%'},
                        foregroundSize: {width: '100%'},
                        text:[{
                            index: 0,
                            pos: {top:'2%', left:'4%'},
                            html: '<p>It was an amazing gig.</p>',
                            sound: './audio/frame_9_0.mp3'
                        }]
                    },{
                        className: "col-lg-6 window skew-4-left",
                        index: 10,
                        handleLock: this.handleLock,
                        backgroundSrc: musicConcert2,
                        backgroundPos: {top:'-10%', left:'-30%'},
                        backgroundSize: {width: '100%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top:'0%', left:'-20%'},
                        foregroundSize: {width: '100%'},
                        text:[
                            {
                                index: 0,
                                pos: {top:'1%', right:'2%'},
                                html: '<p>It was the first time warming up for <br> a bigger artist.</p>',
                                sound: './audio/frame_10_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'60%', left:'15%'},
                                html: '<p>Fuck you all!</p>',
                                type: 'speech-top-right',
                                sound: './audio/frame_10_1.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-8')}  index={8} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 11,
                        handleLock: this.handleLock,
                        videoURL: require('./video/flensCartoon.mp4'),
                        text: [{
                            index: 0,
                            pos: {bottom:'15%', right:'5%'},
                            html: '<p>We had just recorded a music video <br> which received good response</p>',
                            sound: './audio/frame_11_0.mp3'
                        }],
                        children:(
                            <div className="interactive" style={{left: '80%',top: '10%'}}>
                                <ModalElement
                                    title={'He has been making music for a long time now.'}
                                    size={{}}
                                    pos={{}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width:'100px'}} src={require('../images/butter.gif')} alt="Butterfly"/>}>
                                    <p>
                                        <a href="https://soundcloud.com/flensop" target={"_blank"}>Flen$ O.P. projects</a>
                                    </p>
                                    <p>
                                        <a href="https://soundcloud.com/gaardbo" target={"_blank"}>Solo projects</a>
                                    </p>
                                    <p>
                                        <a href="https://open.spotify.com/album/3nUhGWseFNMxiLcr7i5ha6?si=ujpPbneZTXmc6PUrqEaBnQ" target={"_blank"}>Spotify single</a>
                                    </p>
                                    <iframe width="420" height="315"
                                            src="https://www.youtube.com/embed/0Ef1Ro7Dzsk?controls=0"
                                            allowFullScreen="allowfullscreen">
                                    </iframe>
                                </ModalElement>
                            </div>
                        )
                    }
                ]}/>

        </main>
        )
    }
}
