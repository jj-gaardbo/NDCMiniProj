import React from 'react';
import Title from "./Title.jsx";
import Frame from "./Frame.jsx";

import backgroundBirth from '../images/bg/first2.png'
import backgroundBirth2 from '../images/bg/birth2.png'
import backgroundSwingBg from '../images/bg/swing_bg-comic2.png'
import backgroundSwingFg from '../images/bg/swing_fg2-comic.png'
import backgroundMicrophone from '../images/bg/microphone.png'
import backgroundFaroe from '../images/bg/faroe.png'
import backgroundSailing from '../images/bg/travel.png'

import news from '../images/news/news.png'

import dust from '../images/dust2.png'
import smoke from '../images/smoke.png'
import ModalElement from "./Modal.jsx";

export default class MainWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lockScroll: false,
            frameIndex: -1,
            audioOn: false
        };

        this.handleLock = this.handleLock.bind(this);
        this.handleAudioOn = this.handleAudioOn.bind(this);
        this.lockScroll = this.lockScroll.bind(this);
    }

    lockScroll(lock){
        this.setState({lockScroll: lock});
    }

    handleLock(isVisible, frameIndex){
        if(!this.state.audioOn){return;}

        if(isVisible){
            this.setState({frameIndex: frameIndex});
            this.lockScroll(true);
        }
    }

    handleAudioOn(){
        this.setState({audioOn: !this.state.audioOn}, function(){
            if(this.state.audioOn === false){
                this.lockScroll(false);
            }
        });
    }

    render() {
        return (

            <main className={
                this.state.lockScroll ? 'App clearfix no-scroll container-fluid' : 'App clearfix container-fluid'
            }>

                <Title />

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-12 window skew-2-right">
                            <div className="overlay"></div>

                            <Frame
                                index={0}
                                handleLock={this.handleLock}
                                backgroundSrc={news}
                                backgroundPos={{top:'-25%', left:'-5%'}}
                                backgroundSize={{width: '100%'}}
                                middlegroundSrc={smoke}
                                middlegroundPos={{top:'0%', left:'0%'}}
                                middlegroundSize={{width: '100%'}}
                                text={[
                                    {
                                        index: 0,
                                        pos: {top:'5%', left:'5%'},
                                        html: '<p>September 9th 1988</p>',
                                        color: 'yellow'
                                    },
                                    {
                                        index: 1,
                                        pos: {top:'45%', left:'5%'},
                                        html: '<p>It was a storm like no other. <br>Doomsday theories were running wild.</p>'
                                    }
                                ]}
                            >

                                <div className="interactive" style={{left: '80%',top: '7%'}}>
                                    <ModalElement
                                        title={'Faroe Islands.'}
                                        size={{}}
                                        pos={{top:'30%'}}
                                        className={"modal-dialog-centered modal-md clearfix"}
                                        buttonElement={<img style={{width:'200px'}} src={require('../images/yellow_2.gif')} alt="Butterfly"/>}>
                                        <p>
                                            The first couple of years of my life I was living on the Faroe Islands.
                                        </p>
                                    </ModalElement>
                                </div>

                            </Frame>
                        </div>

                    </div>

                </div>

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-6 window skew-2-right">
                            <div className="overlay"></div>

                            <Frame
                                index={1}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundBirth2}
                                backgroundPos={{top:'0%', left:'-12%'}}
                                backgroundSize={{width: '50%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '100%'}}
                                text={[
                                    {
                                        index: 0,
                                        pos: {top:'5%', left:'5%'},
                                        html: '<p>October 22th 1989</p>',
                                        color: 'yellow'
                                    },
                                    {
                                        index: 1,
                                        pos: {bottom:'15%', right:'5%'},
                                        html: '<p>A new member of society is resting in <br>his home on the Faroe Islands</p>'
                                    }
                                ]}
                            >

                            </Frame>
                        </div>

                        <div className="col-lg-6 window skew-2-right">
                            <div className="overlay"></div>

                            <Frame
                                index={2}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundBirth}
                                backgroundPos={{top:'-23%', left:'-30%'}}
                                backgroundSize={{width: '70%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'-20%', left:'-30%'}}
                                foregroundSize={{width: '100%'}}
                                text={[
                                    {
                                        index: 0,
                                        pos: {top:'5%', right:'5%'},
                                        html: '<p>On this day his father video recorded <br>him for the first time, while narrating <br> the event.</p>'
                                    },
                                    {
                                        index: 1,
                                        pos: {top:'23%', right:'5%'},
                                        html: '<p>Our camera has just returned <br>from service, so this is <br>the first ever footage of our son. <br> He is now 6 weeks old.</p>',
                                        type: 'speech-bottom-right'
                                    }
                                ]}
                            >

                            </Frame>
                        </div>

                    </div>

                </div>

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-6 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={3}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundSwingBg}
                                backgroundPos={{top:'0%', left:'-10%'}}
                                backgroundSize={{width: '10%'}}
                                middlegroundSrc={backgroundSwingFg}
                                middlegroundPos={{top:'0%', left:'-10%'}}
                                middlegroundSize={{width: '10%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '50%'}}
                                text={[{
                                    index: 0,
                                    pos: {top:'5%', left:'5%'},
                                    html: '<p>Shortly after he became old enough to cause trouble,<br> so his parents constrained him by installing <br>a swing, so he could entertain himself.</p>'
                                },{
                                    index: 1,
                                    pos: {top:'80%', left:'4%'},
                                    html: '<p>This was before the iPad.</p>'
                                }]}
                            />
                        </div>

                        <div className="col-lg-6 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={4}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundMicrophone}
                                backgroundPos={{top:'0%', left:'-10%'}}
                                backgroundSize={{width: '10%'}}
                                text={[{
                                        index: 0,
                                        pos: {top:'5%', left:'5%'},
                                        html: "<p>He was very proud, when he started to be able to <br> pronounce his name almost correctly.</p>"
                                    }
                                ]}/>
                        </div>

                    </div>

                </div>

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-8 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={5}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundFaroe}
                                backgroundPos={{top:'-33%', left:'-20%'}}
                                backgroundSize={{width: '70%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'-20%', left:'-30%'}}
                                foregroundSize={{width: '100%'}}
                                text={[
                                    {
                                        index: 0,
                                        pos: {top:'5%', left:'5%'},
                                        html: '<p>His childhood was good on the islands. <br> But due to his father being offered a job...</p>'
                                    }
                                ]}
                            >

                            </Frame>
                        </div>

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={6}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundSailing}
                                backgroundPos={{top:'0%', left:'-42%'}}
                                backgroundSize={{width: '50%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '100%'}}
                                text={[
                                    {
                                        index: 0,
                                        pos: {top:'5%', left:'5%'},
                                        html: '<p>1995</p>',
                                        color: 'yellow'
                                    },
                                    {
                                        index: 1,
                                        pos: {bottom:'15%', left:'5%'},
                                        html: '<p>...they packed up their lives and moved to Denmark.</p>'
                                    }
                                ]}
                            >

                            </Frame>
                        </div>

                    </div>

                </div>

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-12 window skew-2-right">
                            <div className="overlay"></div>

                            <Frame
                                index={7}
                                handleLock={this.handleLock}
                                videoURL={require('./video/flens.mp4')}
                                text={[{
                                    index: 0,
                                    pos: {bottom:'15%', right:'5%'},
                                    html: '<p>We had just recorded a music video <br> which received good response</p>',
                                }]}>

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
                                        <iframe width="420" height="315"
                                                src="https://www.youtube.com/embed/0Ef1Ro7Dzsk?controls=0"
                                                allowFullScreen="allowfullscreen">
                                        </iframe>
                                    </ModalElement>
                                </div>
                            </Frame>
                        </div>

                    </div>

                </div>

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={8}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundBirth}
                                backgroundPos={{top:'-10%', left:'-40%'}}
                                backgroundSize={{width: '80%'}}
                                text={[{
                                    index: 0,
                                    pos: {top:'2%', left:'4%'},
                                    html: '<p>He was not an ordinary baby.</p>',
                                }]}/>
                        </div>

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>
                            <Frame
                                index={9}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundSwingBg}
                                backgroundPos={{top:'-10%', left:'-30%'}}
                                backgroundSize={{width: '100%'}}
                                middlegroundSrc={backgroundSwingFg}
                                middlegroundPos={{top:'-10%', left:'-30%'}}
                                middlegroundSize={{width: '10%'}}
                                foregroundSrc={smoke}
                                foregroundPos={{top:'0%', left:'-20%'}}
                                foregroundSize={{width: '100%'}}
                                text={[
                                    {
                                        index: 0,
                                        pos: {top:'1%', right:'2%'},
                                        html: '<p>Where was this guy going?</p>',
                                    },
                                    {
                                        index: 1,
                                        pos: {top:'60%', left:'15%'},
                                        html: '<p>AAaaahhhahaha! Gagaa</p>',
                                        type: 'speech-top-left'
                                    }
                                ]}/>
                        </div>

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={10}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundMicrophone}
                                backgroundPos={{top:'0%', left:'-20%'}}
                                backgroundSize={{width: '30%'}}
                                text={[{
                                    index: 0,
                                    pos: {bottom:'15%', right:'7%'},
                                    html: '<p>Did he have a musical career in his future?</p>',
                                }]}/>
                        </div>

                    </div>

                </div>

            </main>

        )
    }
}
