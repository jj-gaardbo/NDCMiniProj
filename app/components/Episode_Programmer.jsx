import React from 'react';
import Title from "./Title.jsx";
import Sound from 'react-sound';
import $ from 'jquery';

import locationHTML24 from './assets/images/working/html24.png'
import home from './assets/images/working/australiensvej2.png'

import readyWorkFG from './assets/images/bg/readyWorkForeground.png';
import readyWorkBG from './assets/images/bg/readyWorkBackground.png';

import working from './assets/images/working/working.png'
import workConvoBg from './assets/images/working/workConversation_bg.png'
import workConvoMg from './assets/images/working/workConversation_mg.png'
import workConvoFg from './assets/images/working/workConversation_fg.png'

import firstMeetingBG from "./assets/images/programmer/firstMeeting_bg_rev.png"
import firstMeetingMG from "./assets/images/programmer/firstMeeting_mg_rev.png"
import firstMeetingFG from "./assets/images/programmer/firstMeeting_fg_rev.png"

import dust from './assets/images/dust2.png'
import smoke from './assets/images/smoke.png'
import ModalElement from "./Modal.jsx";
import Panel from "./Panel.jsx";
import {getLS, setLS} from "./Common.jsx";

const backgroundMusic = {
    bn: './assets/audio/building_nightmares.mp3',
    wj: './assets/audio/wonky_jazz.mp3',
    so: './assets/audio/soldier.mp3',
    mp: './assets/audio/maxpayne.mp3'
};


export default class Episode_Programmer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lockScroll: false,
            audioOn: getLS('audioOn'),
            frameIndex: -1,
            ready: false,
            classNames: "App clearfix container-fluid no-scroll",
            sectionReferences: {},
            backgroundMusicVolume: 30

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
            setLS('audioOn', true);
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

                <Title begin={this.begin} title={"Software Development"} />

                {this.state.audioOn &&
                <Sound    url={backgroundMusic.so}
                          playStatus={this.state.ready ? Sound.status.PLAYING : Sound.status.PAUSED}
                          playFromPosition={0}
                          volume={this.state.backgroundMusicVolume}
                          playbackRate={1}
                          loop={true}
                          muted="muted"
                />
                }

                <Panel ref={this.getOrCreateRef('section-0')} id={'start'} index={0} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: home,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '85%'},
                        foregroundSrc: dust,
                        foregroundPos: {top: '-4%', right: '-5%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: '<p>May 30th 2015 <br> Østerbro, Copenhagen</p>',
                                color: 'yellow'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-1')} index={1} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: readyWorkBG,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '60%'},
                        foregroundSrc: readyWorkFG,
                        foregroundPos: {top: '-14%', right: '15%'},
                        foregroundSize: {width: '87%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '14%', left: '5%'},
                                html: '<p>I was getting ready to go to work on an ordinary day.</p>',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '12%', left: '5%'},
                                html: "<p>I was rethinking the tie. Usually I did not wear a tie...<br>and since I didn't have any client meetings today<br> I decided to skip it.</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-2')} index={2} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: locationHTML24,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: "<p>I'd been working at a small web agency<br> called HTML24 for about a year now.</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-3')} index={3} audioOn={this.state.audioOn} handleDone={this.next} frames={[
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
                                pos: {top: '5%', left: '5%'},
                                html: "<p>Despite the constant deadlines and <br>ignorant clients, it was a great place to work...</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '15%', right: '10%'},
                                html: "<p>...and I very much enjoyed the<br>social interactions with the colleagues.</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            },
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
                                html: "<p>Hey! We're all going to<br> this rap concert tonight.<br> It's supposed to be great. <br>These two guys are pretty dope... <br> ...and funny too.</p>",
                                type: 'speech-bottom-left',
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top: '40%', right: '5%'},
                                html: "<p>Sounds good!<br>I'm not doing anything tonight.<br>Count me in!</p>",
                                type: 'speech-top-left',
                                sound: './assets/audio/frame_0_0.mp3'
                            }
                        ]
                    }
                ]}/>


                <Panel ref={this.getOrCreateRef('section-4')} index={4} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: firstMeetingBG,
                        backgroundPos: {top: '-20%', left: '0%'},
                        backgroundSize: {width: '90%'},
                        middlegroundSrc: firstMeetingMG,
                        middlegroundPos: {top: '-10%', left: '0%'},
                        middlegroundSize: {width: '100%'},
                        foregroundSrc: firstMeetingFG,
                        foregroundPos: {top: '-10%', left: '20%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: "<p>As I was walking home from the concert,<br>I saw one of the guys who had performed.</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top: '14%', left: '5%'},
                                html: "<p>I tried to greet him as I passed him, but he didn't respond.</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                            {
                                index: 2,
                                pos: {bottom: '15%', right: '10%'},
                                html: "<p>There was something oddly familiar about his appearance.</p>",
                                sound: './assets/audio/frame_0_0.mp3'
                            },
                        ]
                    }
                ]}/>
        </main>
        )
    }
}
