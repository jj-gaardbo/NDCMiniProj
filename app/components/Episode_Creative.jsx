import React from 'react';
import Title from "./Title.jsx";
import Sound from 'react-sound';
import $ from 'jquery';

import musicConcert1 from './assets/images/music/concert.jpg'
import musicConcert2 from './assets/images/music/concert2.jpg'

import dust from './assets/images/dust2.png'
import smoke from './assets/images/smoke.png'
import ModalElement from "./Modal.jsx";
import Breaker from "./Breaker.jsx";
import Panel from "./Panel.jsx";
import prepareBG from "./assets/images/bg/prepareBackground.png";
import prepareShirtFG from "./assets/images/bg/prepareShirtForeground.png";
import prepareFG from "./assets/images/bg/prepareForeground.png";
import prepare2BG from "./assets/images/bg/prepare2Background.png";
import prepare2FG from "./assets/images/bg/prepare2Foreground.png";
import prepare3FG from "./assets/images/bg/prepare3Foreground.png";
import locationRebaek from "./assets/images/music/rebaek1.png"

import comingHome from "./assets/images/music/comingHome.png"
import sleeping from "./assets/images/music/goingToSleep.png"


import {getLS, setLS} from "./Common.jsx";

const backgroundMusic = {
    bn: './assets/audio/building_nightmares.mp3',
    wj: './assets/audio/wonky_jazz.mp3',
    so: './assets/audio/soldier.mp3',
    mp: './assets/audio/maxpayne.mp3'
};


export default class Episode_Creative extends React.Component {

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

        let index = -1;

        return (
            <main className={this.state.classNames}>

                <Title begin={this.begin} title={"Creativity"} />

                {this.state.audioOn &&
                <Sound    url={backgroundMusic.wj}
                          playStatus={this.state.ready ? Sound.status.PLAYING : Sound.status.PAUSED}
                          playFromPosition={0}
                          volume={this.state.backgroundMusicVolume}
                          playbackRate={1}
                          loop={true}
                          muted="muted"
                />
                }

                <Panel ref={this.getOrCreateRef('section-0')} index={0} id={"start"} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: locationRebaek,
                        backgroundPos: {top: '-40%', left: '0%'},
                        backgroundSize: {width: '86%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: '<p>May 2015</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {top: '14%', left: '5%'},
                                html: '<p>Tonight was the night. I was getting ready <br>to go out to do a concert, that we’d been preparing for<br> for a couple of weeks. <br> It was the first time warming up for a big artist.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-1')} index={1} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-8 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: prepareBG,
                        backgroundPos: {top: '5%', left: '0%'},
                        backgroundSize: {width: '100%'},
                        foregroundSrc: prepareShirtFG,
                        foregroundPos: {top: '0%', left: '0%'},
                        foregroundSize: {width: '80%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '14%', left: '5%'},
                                html: "<p>I wasn't sure if anybody would show up to see us.</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '12%', left: '5%'},
                                html: '<p>It was the first time we got a taste<br> of being professional musicians<br> even though we were still only<br> getting paid with a free bar for the night.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                        ]
                    },
                    {
                        className: "col-lg-4 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: prepareBG,
                        backgroundPos: {top: '5%', left: '-10%'},
                        backgroundSize: {width: '100%'},
                        foregroundSrc: prepareFG,
                        foregroundPos: {top: '10%', left: '-20%'},
                        foregroundSize: {width: '40%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', right: '5%'},
                                html: '<p>It was definitely not a job that paid the bills,<br> and I’d recently been considering getting a proper education.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '15%', right: '5%'},
                                html: '<p>Maybe I wouldn’t have to struggle so much, if I had an actual job.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-2')} index={2} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-6 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: prepare2BG,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '100%'},
                        foregroundSrc: prepare2FG,
                        foregroundPos: {top: '-10%', left: '-20%'},
                        foregroundSize: {width: '80%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: '<p>It was almost time to hit the road.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-6 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        foregroundSrc: prepare3FG,
                        foregroundPos: {top: '0%', left: '-5%'},
                        foregroundSize: {width: '50%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom: '15%', left: '5%'},
                                html: '<p>My nerves were starting to fuck with my head. <br>My hands were shaking, and it made it difficult to tie my shoes.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-3')}  index={3} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 11,
                        handleLock: this.handleLock,
                        videoURL: require('./assets/video/flensCartoon.mp4'),
                        text: [{
                            index: 0,
                            pos: {bottom:'15%', right:'5%'},
                            html: '<p>I was exited about how the crowd would receive our newest release.</p>',
                            sound: './assets/audio/frame_0_0.mp3'
                        }],
                        children:(
                            <div className="interactive" style={{left: '80%',top: '10%'}}>
                                <ModalElement
                                    title={'He has been making music for a long time now.'}
                                    size={{}}
                                    pos={{}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width:'100px'}} src={require('./assets/images/butter.gif')} alt="Butterfly"/>}>
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

                <Panel ref={this.getOrCreateRef('section-4')} index={4} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-6 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: musicConcert1,
                        backgroundPos: {top:'-10%', left:'-20%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top:'0%', left:'-20%'},
                        foregroundSize: {width: '100%'},
                        text:[{
                            index: 0,
                            pos: {top:'5%', left:'4%'},
                            html: '<p>It was an amazing gig and people were actually<br> requesting some of our other songs during the concert.</p>',
                            sound: './assets/audio/frame_0_0.mp3'
                        }]
                    },{
                        className: "col-lg-6 window skew-4-left",
                        index: 1,
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
                                pos: {top:'5%', right:'2%'},
                                html: '<p>I knew that we would be celebrating late into the night after this.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'60%', left:'10%'},
                                html: '<p>How are you all doing tonight?!</p>',
                                type: 'speech-top-right',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-5')} index={5} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-4 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: comingHome,
                        backgroundPos: {top:'-20%', left:'-16%'},
                        backgroundSize: {width: '40%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'0%'},
                        foregroundSize: {width: '80%'},
                        text:[{
                            index: 0,
                            pos: {top: '9%', left: '3%'},
                            html: '<p>Later that night</p>',
                            color: 'yellow'
                            },
                            {
                            index: 1,
                            pos: {bottom:'10%', left:'4%'},
                            html: '<p>When I came home I was completely beat.</p>',
                            sound: './assets/audio/frame_0_0.mp3'
                        }]
                    },{
                        className: "col-lg-8 window skew-2-right",
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: sleeping,
                        backgroundPos: {top:'-10%', left:'0%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: dust,
                        foregroundPos: {top:'0%', left:'0%'},
                        foregroundSize: {width: '100%'},
                        text:[
                            {
                                index: 0,
                                pos: {top:'5%', right:'2%'},
                                html: '<p>I fell asleep with all my clothes on and started to have weird dreams...</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom:'10%', left:'15%'},
                                html: '<p>...about random object in my apartment coming to life...</p>',
                                sound: './assets/audio/frame_0_0.mp3'
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
                        videoURL: require('./assets/video/jumpingMusicalNote.mp4'),
                        text: [{
                            index: 0,
                            pos: {top:'5%', right:'8%'},
                            html: '<p>These dreams were probably a<br>sign of the stress I was experiencing.</p>',
                            sound: './assets/audio/frame_0_0.mp3'
                        }]
                    }
                ]}/>

        </main>
        )
    }
}
