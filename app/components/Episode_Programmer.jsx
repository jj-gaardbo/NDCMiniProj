import React from 'react';
import Title from "./Title.jsx";
import Sound from 'react-sound';
import $ from 'jquery';

import locationHTML24 from './assets/images/working/html24.png'
import home from './assets/images/working/australiensvej2.png'

import readyWorkFG from './assets/images/bg/readyWorkForeground.png';
import readyWorkBG from './assets/images/bg/readyWorkBackground2.png';

import working from './assets/images/working/working2.png'
import workConvoBg from './assets/images/working/workConversation_bg.png'
import workConvoMg from './assets/images/working/workConversation_mg.png'
import workConvoFg from './assets/images/working/workConversation_fg.png'

import strangeEmail from "./assets/images/programmer/strangeEmail.png"

import concertCrowd1 from "./assets/images/programmer/concertCrowd1.png"
import concertCrowd2 from "./assets/images/programmer/concertCrowd2.png"
import concertCrowd3 from "./assets/images/programmer/concertCrowd3.png"

import firstMeetingBG from "./assets/images/programmer/firstMeeting_bg_rev.png"
import firstMeetingMG from "./assets/images/programmer/firstMeeting_mg_rev.png"
import firstMeetingFG from "./assets/images/programmer/firstMeeting_fg_rev.png"

import gDigital1 from "./assets/images/programmer/gDigital1.png"
import gDigital2 from "./assets/images/programmer/gDigital2.png"
import actoEtpFG from "./assets/images/programmer/actoEtp_fg.png"
import actoEtpBG from "./assets/images/programmer/actoEtp_bg.png"
import acto from "./assets/images/programmer/acto.png"

import dust from './assets/images/dust2.png'
import smoke from './assets/images/smoke.png'
import ModalElement from "./Modal.jsx";
import Panel from "./Panel.jsx";
import {getLS, setLS} from "./Common.jsx";
import Breaker from "./Breaker.jsx";
import BreakerBranch from "./BreakerBranch.jsx";

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
            backgroundMusicVolume: 8

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

        let index = 0;

        return (
            <main className={this.state.classNames}>

                <Title begin={this.begin} title={"Computing"} />

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

                <Panel ref={this.getOrCreateRef('section-'+index)} id={'start'} ambiance={'./assets/audio/ambiance/birds.mp3'} ambianceVolume={40} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
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

               <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: readyWorkBG,
                        backgroundPos: {top: '-10%', left: '0%'},
                        backgroundSize: {width: '60%'},
                        foregroundSrc: readyWorkFG,
                        foregroundPos: {top: '-14%', right: '15%'},
                        foregroundSize: {width: '87%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '14%', left: '5%'},
                                html: '<p>It was an ordinary day and I was getting ready to go to work.</p>',
                                sound: './assets/audio/speak/programmer/frame_pr_0.mp3'
                            },
                            {
                                index: 1,
                                pos: {top: '22%', left: '5%'},
                                html: "<p>I was rethinking the tie. Usually I didn't wear a tie...<br>and since I didn't have any client meetings today<br> I decided to skip it.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_1.mp3'
                            },
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
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
                                sound: './assets/audio/speak/programmer/frame_pr_2.mp3'
                            }
                        ],
                        children:(
                            <div className="interactive" style={{left: '50%',bottom: '20%'}}>
                                <ModalElement
                                    title={'HTML24'}
                                    size={{}}
                                    pos={{}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width:'300px'}} src={require('./assets/images/purple2.gif')} alt="Butterfly"/>}>
                                    <p>
                                        <a href="http://html24.dk" target={'_blank'}>HTML24 website link</a>
                                    </p>
                                </ModalElement>
                            </div>
                        )
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/office.mp3'} ambianceVolume={60} handleDone={this.next} frames={[
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
                                sound: './assets/audio/speak/programmer/frame_pr_3.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '15%', right: '10%'},
                                html: "<p>...and I very much enjoyed the<br>social interactions with the colleagues.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_4.mp3'
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
                                sound: './assets/audio/speak/programmer/frame_pr_5.mp3'
                            },
                            {
                                index: 1,
                                pos: {top: '40%', right: '5%'},
                                html: "<p>Sounds good!<br>I'm not doing anything tonight.<br>Count me in!</p>",
                                type: 'speech-top-left',
                                sound: './assets/audio/speak/programmer/frame_pr_6.mp3'
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
                        backgroundSrc: strangeEmail,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '83%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: "<p>Just before the end of my workday,<br> I received a strange email from <br>something called National Military Operations.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_7.mp3'
                            },
                            {
                                index: 1,
                                pos: {top: '10%', right: '5%'},
                                html: "<p>They apparently wanted to meet<br> me to discuss a serious matter.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_8.mp3'
                            },
                            {
                                index: 2,
                                pos: {bottom: '8%', left: '5%'},
                                html: "<p>I couldn't believe what I was reading,<br> so I marked it as spam, and got on with my day.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_9.mp3'
                            }
                        ]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h1>Later that night</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/concert.mp3'} ambianceVolume={20} handleDone={this.next} frames={[
                    {
                        className: "col-lg-4 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: concertCrowd1,
                        backgroundPos: {top: '0%', left: '-25%'},
                        backgroundSize: {width: '60%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top: '0%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: "<p>I was a fun night out with my co-workers...</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_10.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-4 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: concertCrowd2,
                        backgroundPos: {top: '0%', left: '-10%'},
                        backgroundSize: {width: '39%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top: '0%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom: '15%', right: '10%'},
                                html: "<p>..And the concert was very good.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_11.mp3'
                            },
                        ]
                    },{
                        className: "col-lg-4 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 2,
                        handleLock: this.handleLock,
                        backgroundSrc: concertCrowd3,
                        backgroundPos: {top: '0%', left: '-18%'},
                        backgroundSize: {width: '40%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top: '0%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '10%', left: '5%'},
                                html: "<p>We all got a little tipsy and had a good time.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_12.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/streetwalking.mp3'} ambianceVolume={40} handleDone={this.next} frames={[
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
                                sound: './assets/audio/speak/programmer/frame_pr_13.mp3'
                            },
                            {
                                index: 1,
                                pos: {top: '14%', left: '5%'},
                                html: "<p>I tried to greet him as I passed him, but he didn't respond. <br> He just had this look on his face<br> like he just saw a ghost.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_14.mp3'
                            },
                            {
                                index: 2,
                                pos: {bottom: '15%', right: '10%'},
                                html: "<p>There was something oddly familiar about his appearance.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_15.mp3'
                            },
                        ]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h1>... months later</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-4 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: gDigital1,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: dust,
                        foregroundPos: {top: '0%', left: '0%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: "<p>I had decided to leave my job, as I<br>wanted to explore the world<br> being a freelance web developer.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_16.mp3'

                            },
                            {
                                index: 1,
                                pos: {top: '18%', left: '5%'},
                                html: "<p>I started my own one-man company called<br> Gaardbo Digital.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_17.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-8 window skew-4-left custom",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: actoEtpBG,
                        backgroundPos: {top: '0%', left: '0%'},
                        backgroundSize: {width: '90%'},
                        foregroundSrc: actoEtpFG,
                        foregroundPos: {top: '0%', left: '-10%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom: '13%', left: '10%'},
                                html: "<p>I managed to get a couple of clients. One was <br>a software company called Acto, and<br> the other one was an electrical<br>engineering company called ETP consult.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_18.mp3'
                            }
                        ],
                        children:(
                            <div className="interactive" style={{top: '23%',left: '3%'}}>
                                <ModalElement
                                    title={'Acto and ETP Consult'}
                                    size={{}}
                                    pos={{}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width:'200px'}} src={require('./assets/images/turquise.gif')} alt="Butterfly"/>}>
                                    <p>
                                        <a target="_blank" href="http://www.acto.dk">Acto Website link</a>
                                    </p>
                                    <p>
                                        <a target="_blank" href="http://www.etp-consult.dk">ETP Consult Website link</a>
                                    </p>
                                </ModalElement>
                            </div>
                        )

                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
                    {
                        className: "col-lg-6 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: acto,
                        backgroundPos: {top: '0%', left: '-5%'},
                        backgroundSize: {width: '75%'},
                        text: [
                            {
                                index: 0,
                                pos: {bottom: '5%', left: '5%'},
                                html: "<p>As time went by I almost became a part time<br> employee at Acto. And I worked on projects<br> for them for almost 2 years.<br> I primarily worked on their own website.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_19.mp3'
                            }
                        ]
                    },
                    {
                        className: "col-lg-6 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 1,
                        handleLock: this.handleLock,
                        backgroundSrc: gDigital2,
                        backgroundPos: {top: '0%', left: '-15%'},
                        backgroundSize: {width: '80%'},
                        foregroundSrc: smoke,
                        foregroundPos: {top: '0%', left: '-10%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '6%', left: '6%'},
                                html: "<p>When the projects stopped coming in, I needed to figure out what else I could do.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_20.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '6%', right: '6%'},
                                html: "<p>At that point I decided to go to university and study Medialogy.</p>",
                                sound: './assets/audio/speak/programmer/frame_pr_21.mp3'
                            }
                        ]
                    }
                ]}/>

                {getLS('isCreativityPlayed') === 'no' ? (
                    <BreakerBranch
                        ref={this.getOrCreateRef('section-'+index)}
                        index={index++}
                        header={"Turn back time..."}
                        routeoneTitle={'Creativity'}
                        routeone={'/creativity'}/>
                ) : (
                    <BreakerBranch
                        ref={this.getOrCreateRef('section-'+index)}
                        index={index++}
                        header={"Choose a path..."}
                        routetwoTitle={'Medialogy'}
                        routeoneTitle={'Creativity'}
                        routetwo={'/medialogy'}
                        routeone={'/creativity'}
                        bothPlayed={true}/>
                    )
                }
        </main>
        )
    }
}
