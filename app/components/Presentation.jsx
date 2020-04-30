import React from 'react';
import Title from "./Title.jsx";
import Sound from 'react-sound';
import $ from 'jquery';
import ModalElement from "./Modal.jsx";
import Breaker from "./Breaker.jsx";
import Panel from "./Panel.jsx";

import backgroundFaroe from '../images/presentation/faroe.png'
import backgroundSailing from '../images/presentation/travel.png'
import backgroundReading from '../images/presentation/reading.png'
import backgroundTeacher from '../images/presentation/teacher.png'
import news from '../images/presentation/news.png'
import working from "../images/presentation/working.png";
import workConvoBg from "../images/presentation/workConversation_bg.png";
import workConvoFg from "../images/presentation/workConversation_fg.png";
import butterfly3 from "../images/orange2.gif";
import dust from '../images/presentation/dust2.png'
import smoke from '../images/presentation/smoke.png'
import maxPayne from '../images/presentation/maxPayne.png'
import musicConcert1 from '../images/music/concert.jpg'

const backgroundMusic = {
    bn: './audio/building_nightmares.mp3',
    wj: './audio/wonky_jazz.mp3',
    so: './audio/soldier.mp3',
    mp: './audio/maxpayne.mp3'
};


export default class Presentation extends React.Component {

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

    componentDidMount() {
        $('body').addClass("presentation");
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
        window.$globalState.audioOn = false;
        this.setState({ready:true, classNames: "App clearfix container-fluid no-sound", audioOn:false});

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
                <div className="title snap clearfix">
                    <h1>"Webbased graphic novel portfolio"</h1>
                    <button style={{top:'60%', left:'40%'}} type={'button'} onClick={this.begin} className={'start-free'}>
                        <img src={butterfly3} alt="Yellow butterfly"/>
                        <p>Start</p>
                    </button>
                </div>

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
                                html: '<p>Narratives in digital culture mini project</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {top: '14%', left: '5%'},
                                html: '<p>The idea is to use web technologies to <br> present a portfolio in a creative way <br> for future job search.</p>',
                                sound: './audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-1')}  index={1} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-8 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 7,
                        handleLock: this.handleLock,
                        backgroundSrc: maxPayne,
                        backgroundPos: {top:'-12%', left:'-12%'},
                        backgroundSize: {width: '40%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'-20%'},
                        foregroundSize: {width: '100%'},
                        text: [{
                            index: 0,
                            pos: {bottom:'10%', left:'2%'},
                            html: "<p>The aesthetic inspiration came from<br> the cutscenes from the old <br>Max Payne games.</p>",
                            sound: './audio/frame_7_0.mp3'
                        }]
                    },{
                        className: "col-lg-4 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 8,
                        handleLock: this.handleLock,
                        backgroundSrc: musicConcert1,
                        backgroundPos: {top:'-15%', left:'-20%'},
                        backgroundSize: {width: '50%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'-20%'},
                        foregroundSize: {width: '60%'},
                        text: [
                            {
                                index: 0,
                                pos: {top:'1%', right:'2%'},
                                html: "<p>By applying a heavy <br> cartoon-like filter on <br> real images, the frames can <br> be quickly created.</p>",
                                sound: './audio/frame_8_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'60%', left:'12%'},
                                html: '<p>I was photoshopped</p>',
                                type: 'speech-top-right',
                                sound: './audio/frame_8_1.mp3'
                            }
                        ]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-2')}  index={2} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h1>Chapter 1: Development</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-3')} index={3} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-6 window skew-4-left small-frame-center",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: working,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: dust,
                        foregroundPos: {top: '0%', left: '-5%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '0%', left: '5%'},
                                html: "<p>I created a framework for <br> building this type of web based graphic novel...</p>"
                            },
                            {
                                index: 0,
                                pos: {bottom: '7%', right: '20%'},
                                html: "<p>It is developed using ReactJS.</p>"
                            }
                        ],
                        children:(
                            <div className="interactive" style={{left: '70%', top: '17%'}}>
                                <ModalElement
                                    title={'Interactivity'}
                                    size={{}}
                                    pos={{top: '30%'}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width: '130px'}} src={require('../images/yellow_2.gif')} alt="Butterfly"/>}>
                                    <p>
                                        Using web technologies there will also be traditional and known interactivity. Such as these modal windows and the parallax mouse movement effect.
                                    </p>
                                </ModalElement>
                            </div>
                        )
                    },
                    {
                        className: "col-lg-6 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: workConvoBg,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '100%'},
                        foregroundSrc: workConvoFg,
                        foregroundPos: {top: '-15%', left: '-5%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '30%', left: '30%'},
                                html: "<p>I am also considering<br> adding sound and speech. <br>But that is not the first priority.</p>",
                                type: 'speech-bottom-left',
                            }
                        ]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-4')}  index={4} handleDone={this.next} audioOn={this.state.audioOn}  >
                    <h1>Chapter 2: Narrative</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-5')}  index={5} handleDone={this.next} audioOn={this.state.audioOn} ambiance={'./audio/ambiance/seagulls.mp3'} ambianceVolume={100} id={'start'} frames={[
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
                                html: '<p>It will include standard portfolio elements.</p>',
                                sound: './audio/frame_5_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom:'10%', left:'5%'},
                                html: '<p>... such as background, interests, working history etc.</p>',
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
                                pos: {bottom:'15%', left:'5%'},
                                html: '<p>But these elements will <br>be mixed in with a fictional narrative.</p>',
                                sound: './audio/frame_6_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-6')}  index={6} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 11,
                        handleLock: this.handleLock,
                        videoURL: require('./video/finalAnimation.mp4'),
                        text: [{
                            index: 0,
                            pos: {bottom:'7%', left:'7%'},
                            html: "<p>It will showcase various <br> projects, that I've been <br> involved in, within the <br>narrative.</p>",
                            sound: './audio/frame_11_0.mp3'
                        },
                        {
                            index: 0,
                            pos: {bottom:'10%', right:'7%'},
                            html: "<p>There will be <br> links to all of these <br> other projects.</p>",
                            sound: './audio/frame_11_0.mp3'
                        }],
                        children:(
                            <div className="interactive" style={{right: '2%',top: '5%'}}>
                                <ModalElement
                                    title={'Example of how the links could be displayed.'}
                                    size={{}}
                                    pos={{}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width:'200px'}} src={require('../images/butter.gif')} alt="Butterfly"/>}>
                                    <p>
                                        <a href="https://soundcloud.com/flensop" target={"_blank"}>Flen$ O.P. soundcloud</a>
                                    </p>
                                    <p>
                                        <a href="https://soundcloud.com/gaardbo" target={"_blank"}>Personal soundcloud</a>
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

                <Breaker ref={this.getOrCreateRef('section-7')}  index={7} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h1>To be continued... Questions?</h1>
                </Breaker>

            </main>
        )
    }
}
