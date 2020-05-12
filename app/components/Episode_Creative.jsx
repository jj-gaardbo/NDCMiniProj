import React from 'react';
import Title from "./Title.jsx";
import Sound from 'react-sound';
import $ from 'jquery';

import agentBG from './assets/images/music/agentStakeout_bg.png'
import agentFG from './assets/images/music/agentStakeout_fg.png'
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
import locationRebaek2 from "./assets/images/music/rebaek2.png"
import comingHome from "./assets/images/music/comingHome.png"
import sleeping from "./assets/images/music/goingToSleep.png"
import firstMeetingBG from "./assets/images/music/firstMeeting_bg.png"
import firstMeetingMG from "./assets/images/music/firstMeeting_mg.png"
import firstMeetingFG from "./assets/images/music/firstMeeting_fg.png"
import UEOfficeBG from "./assets/images/music/ue_office_bg.png"
import UEOfficeMG from "./assets/images/music/ue_office_mg.png"
import UEOfficeFG from "./assets/images/music/ue_office_fg.png"
import {getLS, setLS} from "./Common.jsx";
import BreakerBranch from "./BreakerBranch.jsx";

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

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} id={"start"} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/birds2.mp3'} ambianceVolume={40} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: locationRebaek,
                        backgroundPos: {top: '-20%', left: '0%'},
                        backgroundSize: {width: '86%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: '<p>May 30th 2015 <br> Hvidovre</p>',
                                color: 'yellow'
                            },
                            {
                                index: 1,
                                pos: {top: '17%', left: '5%'},
                                html: '<p>Tonight was the night. I was getting ready to go out to do a concert,<br> that we’d been preparing for for a couple of weeks.</p>',
                                sound: './assets/audio/speak/creative/frame_cr_0.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
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
                                pos: {bottom: '12%', left: '5%'},
                                html: '<p>Tonight we really were getting a taste<br> of being professional musicians,<br> even though we were still only<br> getting paid with a free bar for the night.</p>',
                                sound: './assets/audio/speak/creative/frame_cr_1.mp3'
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
                                html: '<p>It was definitely not a job that paid<br> the bills, and I’d recently been considering<br> getting a proper education.</p>',
                                sound: './assets/audio/speak/creative/frame_cr_2.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '15%', right: '5%'},
                                html: '<p>Maybe I wouldn’t have to struggle so much, if I had an actual job.</p>',
                                sound: './assets/audio/speak/creative/frame_cr_3.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} handleDone={this.next} frames={[
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
                                html: '<p>The thoughts were rushing through my head.</p>',
                                sound: './assets/audio/speak/creative/frame_cr_4.mp3'
                            },
                            {
                                index: 1,
                                pos: {top: '18%', left: '5%'},
                                html: "<p>We'd put a band together, of very good<br> musicians, to play along to the beats that I produced.</p>",
                                sound: './assets/audio/speak/creative/frame_cr_5.mp3'
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
                                html: '<p>My nerves were starting to fuck with my head, and my hands were shaking, which made it difficult to tie my shoes.</p>',
                                sound: './assets/audio/speak/creative/frame_cr_6.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 11,
                        handleLock: this.handleLock,
                        videoURL: require('./assets/video/flensCartoon.mp4'),
                        text: [{
                            index: 0,
                            pos: {bottom:'30%', left:'5%'},
                            html: "<p>I was exited about how the crowd<br> would receive our latest release. <br> We'd spent the last couple of weeks<br> creating a music video for it.</p>",
                            sound: './assets/audio/speak/creative/frame_cr_7.mp3'
                        },{
                            index: 1,
                            pos: {bottom:'12%', right:'5%'},
                            html: "<p>It was a mixture of live action video, 2D and 3D animation,<br> and our goal was to make it look and feel like<br> it was a comic book.</p>",
                            sound: './assets/audio/speak/creative/frame_cr_8.mp3'
                        }],
                        children:(
                            <div className="interactive" style={{left: '80%',top: '10%'}}>
                                <ModalElement
                                    title={'Various music projects.'}
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

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} handleDone={this.next} ambiance={'./assets/audio/ambiance/streetwalking.mp3'} ambianceVolume={40} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: agentBG,
                        backgroundPos: {top:'-15%', left:'0%'},
                        backgroundSize: {width: '90%'},
                        foregroundSrc: agentFG,
                        foregroundPos: {top:'20%', left:'20%'},
                        foregroundSize: {width: '80%'},
                        text:[{
                            index: 0,
                            pos: {bottom:'8%', right:'4%'},
                            html: '<p>On my way to the concert I noticed a parked<br> car that was clearly some sort of agent on a stakeout.<br> I wondered what he was looking for.</p>',
                            sound: './assets/audio/speak/creative/frame_cr_agent.mp3'
                        }]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} handleDone={this.next} audioOn={this.state.audioOn}  ambiance={'./assets/audio/ambiance/concert.mp3'} ambianceVolume={20} frames={[
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
                            html: '<p>It was an amazing gig. And I spotted some old<br> friends in the crowd from way back, when I<br> studied music at Lemvig Gymnasium and DRH.</p>',
                            sound: './assets/audio/speak/creative/frame_cr_9.mp3'
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
                                sound: './assets/audio/speak/creative/frame_cr_10.mp3'
                            },
                            {
                                index: 1,
                                pos: {top:'60%', left:'10%'},
                                html: '<p>How are you all doing tonight?!</p>',
                                type: 'speech-top-right',
                                sound: './assets/audio/speak/creative/frame_cr_11.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} handleDone={this.next} ambiance={'./assets/audio/ambiance/streetwalking.mp3'} ambianceVolume={40} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: firstMeetingBG,
                        backgroundPos: {top:'0%', left:'0%'},
                        backgroundSize: {width: '100%'},
                        middlegroundSrc: firstMeetingMG,
                        middlegroundPos: {top:'0%', left:'0%'},
                        middlegroundSize: {width: '100%'},
                        foregroundSrc: firstMeetingFG,
                        foregroundPos: {top:'0%', left:'4%'},
                        foregroundSize: {width: '84%'},
                        text:[{
                            index: 0,
                            pos: {top: '9%', left: '3%'},
                            html: '<p>On my way home I thought I saw something strange.</p>',
                            sound: './assets/audio/speak/creative/frame_cr_12.mp3'
                        },
                        {
                            index: 1,
                            pos: {bottom:'10%', left:'4%'},
                            html: '<p>There was something oddly familiar<br> about this guy I crossed on the street.</p>',
                            sound: './assets/audio/speak/creative/frame_cr_13.mp3'
                        },
                        {
                            index: 2,
                            pos: {bottom:'10%', right:'4%'},
                            html: "<p>I didn't think too much of it at the time<br> and I got on the train home.</p>",
                            sound: './assets/audio/speak/creative/frame_cr_14.mp3'
                        }]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} handleDone={this.next} audioOn={this.state.audioOn} frames={[
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
                            sound: './assets/audio/speak/creative/frame_cr_15.mp3'
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
                                html: '<p>I fell asleep with all my clothes on and started to have weird dreams<br> about random objects in my apartment coming to life</p>',
                                sound: './assets/audio/speak/creative/frame_cr_16.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} frames={[
                    {
                        className: "col-lg-12 window skew-2-right",
                        audioOn: this.state.audioOn,
                        index: 11,
                        handleLock: this.handleLock,
                        videoURL: require('./assets/video/jumpingMusicalNote.mp4'),
                        text: [{
                            index: 0,
                            pos: {top:'5%', right:'8%'},
                            html: "<p>I had experienced a lot of these weird dreams lately.<br> I'm guessing that it's one of the side effects<br> from the stress of being unemployed.</p>",
                            sound: './assets/audio/speak/creative/frame_cr_18.mp3'
                        }]
                    }
                ]}/>

                <Breaker ref={this.getOrCreateRef('section-'+index)}  index={index++} handleDone={this.next} audioOn={this.state.audioOn} >
                    <h1>The next day</h1>
                </Breaker>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/birds.mp3'} ambianceVolume={40} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-4-left",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: locationRebaek2,
                        backgroundPos: {top: '-20%', left: '0%'},
                        backgroundSize: {width: '86%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', left: '5%'},
                                html: '<p>I woke up with a massive hangover,<br> but I knew I needed to go to the unemployment office today</p>',
                                sound: './assets/audio/speak/creative/frame_cr_19.mp3'
                            }
                        ]
                    }
                ]}/>

                <Panel ref={this.getOrCreateRef('section-'+index)} index={index++} audioOn={this.state.audioOn} ambiance={'./assets/audio/ambiance/office.mp3'} ambianceVolume={60} handleDone={this.next} frames={[
                    {
                        className: "col-lg-12 window skew-2-right custom",
                        audioOn: this.state.audioOn,
                        index: 0,
                        handleLock: this.handleLock,
                        backgroundSrc: UEOfficeBG,
                        backgroundPos: {top: '-10%', left: '0%'},
                        backgroundSize: {width: '100%'},
                        middlegroundSrc: UEOfficeMG,
                        middlegroundPos: {top: '5%', left: '10%'},
                        middlegroundSize: {width: '88%'},
                        foregroundSrc: UEOfficeFG,
                        foregroundPos: {top: '-18%', left: '-3%'},
                        foregroundSize: {width: '100%'},
                        text: [
                            {
                                index: 0,
                                pos: {top: '5%', right: '5%'},
                                html: '<p>The counselor lady suggested an education for me, <br>based on the personal interests that I had presented,<br> and it was actually something, that I could see myself doing.</p>',
                                sound: './assets/audio/speak/creative/frame_cr_20.mp3'
                            },
                            {
                                index: 1,
                                pos: {bottom: '8%', right: '5%'},
                                html: '<p>It was something called Medialogy.</p>',
                                sound: './assets/audio/speak/creative/frame_cr_21.mp3'
                            }
                        ],
                        children:(
                            <div className="interactive" style={{left: '5%',top: '10%'}}>
                                <ModalElement
                                    title={'In reality...'}
                                    size={{}}
                                    pos={{}}
                                    className={"modal-dialog-centered modal-lg clearfix"}
                                    buttonElement={<img style={{width:'200px'}} src={require('./assets/images/orange.gif')} alt="Butterfly"/>}>
                                    <p>
                                        This was actually how I was introduced to, and began studying, Multimedia Design in back 2012.
                                    </p>
                                </ModalElement>
                            </div>
                        )
                    }
                ]}/>


                {getLS('isProgrammerPlayed') === 'no' ? (
                    <BreakerBranch
                        ref={this.getOrCreateRef('section-'+index)}
                        index={index++}
                        header={"Turn back time..."}
                        routeoneTitle={'Computers'}
                        routeone={'/computers'}/>
                ) : (
                    <BreakerBranch
                        ref={this.getOrCreateRef('section-'+index)}
                        index={index++}
                        header={"Choose a path..."}
                        routetwoTitle={'Medialogy'}
                        routeoneTitle={'Computers'}
                        routetwo={'/medialogy'}
                        routeone={'/computers'}
                        bothPlayed={true}/>
                )
                }

        </main>
        )
    }
}
