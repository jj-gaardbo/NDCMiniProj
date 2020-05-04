import React from 'react';
import $ from 'jquery';
import ModalElement from "./Modal.jsx";
import Breaker from "./Breaker.jsx";
import Panel from "./Panel.jsx";

import backgroundFaroe from './assets/images/presentation/faroe.png'
import backgroundSailing from './assets/images/presentation/travel.png'
import news from './assets/images/presentation/news.png'
import working from "./assets/images/presentation/working.png";
import workConvoBg from "./assets/images/presentation/workConversation_bg.png";
import workConvoFg from "./assets/images/presentation/workConversation_fg.png";
import butterfly3 from "./assets/images/orange2.gif";
import dust from './assets/images/presentation/dust2.png'
import smoke from './assets/images/presentation/smoke.png'
import maxPayne from './assets/images/presentation/maxPayne.png'
import musicConcert1 from './assets/images/music/concert.jpg'
import {getLS, setLS} from "./Common.jsx";

export default class Presentation extends React.Component {

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
            setLS('audioOn', this.state.audioOn);
        });
    }

    begin(setting){
        setLS('audioOn', false);
        this.setState({ready:true, classNames: "App clearfix container-fluid no-sound", audioOn:false});

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
                <div className="title snap clearfix">
                    <h1>"Webbased graphic novel portfolio"</h1>
                    <button style={{top:'60%', left:'40%'}} type={'button'} onClick={this.begin} className={'start-free'}>
                        <img src={butterfly3} alt="Yellow butterfly"/>
                        <p>Start this</p>
                    </button>
                </div>

                <Panel ref={this.getOrCreateRef('section-0')} index={0} id={"start"} audioOn={this.state.audioOn} handleDone={this.next} frames={[
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
                                html: '<p>The idea is to use web technologies to <br> present a portfolio in a different way <br> for future job search.</p>'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-1')}  index={1} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-7 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
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
                            html: "<p>The aesthetic inspiration came from<br> the cutscenes from the old <br>Max Payne games.</p>"
                        }]
                    },{
                        className: "col-lg-5 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: musicConcert1,
                        backgroundPos: {top:'-15%', left:'-22%'},
                        backgroundSize: {width: '30%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'-20%'},
                        foregroundSize: {width: '60%'},
                        text: [
                            {
                                index: 0,
                                pos: {top:'1%', left:'0%'},
                                html: "<p>By applying a heavy <br> cartoon-like filter on <br> real images, the frames are <br> not too difficult to create.</p>"
                            },
                            {
                                index: 1,
                                pos: {top:'45%', left:'9%'},
                                html: '<p>I was photoshopped</p>',
                                type: 'speech-top-right'
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
                                html: "<p>I created a framework for building this <br>type of web based graphic novel...</p>"
                            },
                            {
                                index: 1,
                                pos: {bottom: '7%', right: '20%'},
                                html: "<p>It is developed using ReactJS.</p>"
                            }
                        ],
                        children:(
                            <div className="interactive" style={{left: '7%', top: '67%'}}>
                                <ModalElement
                                    title={'Interactivity'}
                                    size={{}}
                                    pos={{top: '30%'}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width: '130px'}} src={require('./assets/images/yellow_2.gif')} alt="Butterfly"/>}>
                                    <p>- Modal windows <br/> <br/>- Links <br/> <br/>- Parallax mouse movement provides depth<br/><br/>- Scroll snap feature controls the users scrolling <br/><br/>- Routings for possible branching</p>
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
                        foregroundPos: {top: '-25%', left: '-5%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '30%', left: '30%'},
                                html: "<p>I am also considering<br> adding music, background noise and speech. <br>The functionality is there.</p>",
                                type: 'speech-bottom-left',
                            }
                        ]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-4')}  index={4} handleDone={this.next} audioOn={this.state.audioOn}  >
                    <h1>Chapter 2: Narrative</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-5')}  index={5} handleDone={this.next} audioOn={this.state.audioOn} frames={[
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
                                html: '<p>It will include standard portfolio elements.</p>'
                            },
                            {
                                index: 1,
                                pos: {bottom:'10%', left:'5%'},
                                html: '<p>... such as background, interests, working history etc.</p>'
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
                                html: '<p>But these elements will <br>be mixed in with a <br>semi-fictional narrative.</p>'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-6')}  index={6} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        videoURL: require('./assets/video/finalAnimation.mp4'),
                        text: [{
                            index: 0,
                            pos: {bottom:'7%', left:'7%'},
                            html: "<p>It will showcase various <br> projects, that I've been <br> involved in, within the <br>narrative.</p>"
                        },
                        {
                            index: 1,
                            pos: {bottom:'10%', right:'7%'},
                            html: "<p>There will be <br> links to all of these <br> other projects.</p>"
                        }],
                        children:(
                            <div className="interactive" style={{right: '2%',top: '5%'}}>
                                <ModalElement
                                    title={'Example of how the links could be displayed.'}
                                    size={{}}
                                    pos={{}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width:'200px'}} src={require('./assets/images/butter.gif')} alt="Butterfly"/>}>
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
