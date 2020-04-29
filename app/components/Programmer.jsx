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

import prepareBG from '../images/bg/prepareBackground.png'
import prepareFG from '../images/bg/prepareForeground.png'
import prepareShirtFG from '../images/bg/prepareShirtForeground.png'
import prepare2BG from '../images/bg/prepare2Background.png'
import prepare2FG from '../images/bg/prepare2Foreground.png'
import prepare3FG from '../images/bg/prepare3Foreground.png'

import readyWorkFG from '../images/bg/readyWorkForeground.png';
import readyWorkBG from '../images/bg/readyWorkBackground.png';

import working from '../images/working/working.png'
import workConvoBg from '../images/working/workConversation_bg.png'
import workConvoMg from '../images/working/workConversation_mg.png'
import workConvoFg from '../images/working/workConversation_fg.png'

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

                <Panel ref={this.getOrCreateRef('section-0')} index={0} id={"start"} audioOn={this.state.audioOn} handleDone={this.next} frames={[
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
                                pos: {top: '5%', left: '5%'},
                                html: '<p>May 2015</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {top: '14%', left: '5%'},
                                html: '<p>Tonight was the night. I was getting ready <br>to go out to do a concert, that we’d been preparing for<br> for a couple of weeks. <br> It was the first time warming up for a big artist.</p>',
                            },
                            {
                                index: 2,
                                pos: {bottom: '12%', left: '5%'},
                                html: '<p>And the first time we got a taste of being professional <br>musicians even though we were still only getting payed with a free bar for the night.</p>'
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
                                html: '<p>It was a lot of fun doing this, but I’d recently been considering getting a proper education</p>'
                            },
                            {
                                index: 1,
                                pos: {bottom: '15%', right: '5%'},
                                html: '<p>Maybe I wouldn’t have to struggle to pay the bills, if I had an actual job.</p>'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-1')} index={1} audioOn={this.state.audioOn} handleDone={this.next} frames={[
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
                                html: '<p>It was almost time to hit the road</p>'
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
                                html: '<p>My nerves were starting to fuck with my head. <br>My hands were shaking which made it difficult to tie my shoes.</p>'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-2')}  index={2} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 11,
                        handleLock: this.handleLock,
                        videoURL: require('./video/flensCartoon.mp4'),
                        text: [{
                            index: 0,
                            pos: {bottom:'15%', right:'5%'},
                            html: '<p>I was exited about how the crowd would receive our newest release.</p>'
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

                <Panel ref={this.getOrCreateRef('section-3')} index={3} audioOn={this.state.audioOn} ambiance={'./audio/ambiance/thunder.mp3'} ambianceVolume={40} handleDone={this.next} frames={[
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

                <Panel ref={this.getOrCreateRef('section-4')} index={4} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: readyWorkBG,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '60%'},
                        foregroundSrc: readyWorkFG,
                        foregroundPos: {top: '-14%', right: '-15%'},
                        foregroundSize: {width: '87%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: '<p>Earlier that day</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {top: '14%', left: '5%'},
                                html: '<p>Another day of work was beginning.</p>',
                            },
                            {
                                index: 2,
                                pos: {bottom: '12%', left: '5%'},
                                html: '<p>I had just received a bonus for doing a good job. It was nice to be acknowledged once in a while.</p>'
                            },
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-5')} index={5} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-4 window skew-4-left small-frame-center",
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
                                pos: {bottom: '15%', right: '10%'},
                                html: "<p>The deadline was approaching so I needed to work pretty hard.</p>"
                            }
                        ]
                    },
                    {
                        className: "col-lg-8 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: workConvoBg,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '100%'},
                        middlegroundSrc: workConvoMg,
                        middlegroundPos: {top: '0%'},
                        middlegroundSize: {width: '100%'},
                        foregroundSrc: workConvoFg,
                        foregroundPos: {top: '0%', left: '-5%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom: '40%', left: '15%'},
                                html: "<p>Hey! We're all going to<br> this rap concert tonight.<br> It's supposed to be great. <br>These two guys are pretty capable... <br> ...and funny.</p>",
                                type: 'speech-bottom-left',
                            },
                            {
                                index: 1,
                                pos: {top: '30%', right: '5%'},
                                html: "<p>That sounds good.<br>I'm not doing anything tonight.<br>Count me in!</p>",
                                type: 'speech-top-left',
                            }
                        ]
                    }
                ]}/>
        </main>
        )
    }
}
