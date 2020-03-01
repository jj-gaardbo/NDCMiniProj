import React from 'react';
import Title from "./Title.jsx";
import Frame from "./Frame.jsx";
import Hub from "./Hub.jsx";

import backgroundBirth from '../images/bg/first2.png'
import backgroundSwingBg from '../images/bg/swing_bg-comic2.png'
import backgroundSwingFg from '../images/bg/swing_fg2-comic.png'
import backgroundMicrophone from '../images/bg/microphone.png'

import imageBg1 from '../images/background1.jpg'
import imageBg2 from '../images/background2.jpg'
import imageP1 from '../images/person1.png'
import imageP2 from '../images/person2.png'
import video1 from './video/boat.mp4'
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
                {/*<Hub handleAudioOn={this.handleAudioOn} audioOn={this.state.audioOn}/>*/}

                <Title />

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-6 window skew-2-right">
                            <div className="overlay"></div>

                            <Frame
                                index={0}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundBirth}
                                backgroundPos={{top:'0%', left:'0%'}}
                                backgroundSize={{width: '110%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '100%'}}
                                text={[
                                    {
                                        index: 0,
                                        pos: {top:'5%', left:'5%'},
                                        html: '<p>1989</p>',
                                        color: 'yellow'
                                    },
                                    {
                                        index: 1,
                                        pos: {bottom:'15%', right:'5%'},
                                        html: '<p>A year after the storm a child was born</p>'
                                    }
                                ]}
                            >

                            </Frame>
                        </div>

                        <div className="col-lg-6 window skew-2-right">
                            <div className="overlay"></div>

                            <Frame
                                index={1}
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
                                        pos: {bottom:'15%', left:'5%'},
                                        html: '<p>His father filmed him in his crib.</p>'
                                    },
                                    {
                                        index: 1,
                                        pos: {top:'5%', right:'5%'},
                                        html: '<p>Our camera has just returned <br>from being repaired, so this is <br>the first ever footage of our son. <br> He is now 6 weeks old.</p>',
                                        type: 'speech-top-left'
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
                                index={2}
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
                                    html: '<p>He was a very happy child and he was growing fast.</p>'
                                },{
                                    index: 1,
                                    pos: {top:'80%', left:'20%'},
                                    html: '<p>His parents installed a swing he could jump around in.</p>'
                                }]}
                            />
                        </div>

                        <div className="col-lg-6 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={3}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundMicrophone}
                                backgroundPos={{top:'0%', left:'-10%'}}
                                backgroundSize={{width: '10%'}}
                                text={[{
                                        index: 0,
                                        pos: {top:'5%', left:'5%'},
                                        html: "<p>It wasn't long before he picked up the microphone.</p>"
                                    }
                                ]}/>
                        </div>

                    </div>

                </div>

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-12 window skew-2-right">
                            <div className="overlay"></div>

                            <Frame
                                index={4}
                                handleLock={this.handleLock}
                                videoURL={require('./video/flens.mp4')}
                                text={[{
                                    index: 0,
                                    pos: {bottom:'15%', left:'40%'},
                                    html: '<p>We had just recorded a music video which received good response</p>',
                                }]}>

                                <div className="interactive" style={{left: '80%',top: '10%'}}>
                                    <ModalElement
                                        size={{width:'700px',height:'auto'}}
                                        pos={{top:'calc(20% - 100px)', left:'calc(50% - 300px)'}}
                                        className={"modal-element clearfix"}
                                        buttonElement={<img style={{width:'100px'}} src={require('../images/butter.gif')} alt="Butterfly"/>}>
                                        <p>You pressed a butterfly button!</p>
                                        <p>Here is a link to <a href="http://google.com" target={"_blank"}>Google</a></p>
                                        <iframe width="420" height="315"
                                                src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0">
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
                                index={5}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundBirth}
                                backgroundPos={{top:'-10%', left:'-40%'}}
                                backgroundSize={{width: '80%'}}
                                text={[{
                                    index: 0,
                                    pos: {top:'15%', left:'40%'},
                                    html: '<p>His future was bright but <br>there was something strange happening</p>',
                                }]}/>
                        </div>

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>
                            <Frame
                                index={6}
                                handleLock={this.handleLock}
                                backgroundSrc={backgroundMicrophone}
                                backgroundPos={{top:'0%', left:'-20%'}}
                                backgroundSize={{width: '30%'}}
                                text={[{
                                    index: 0,
                                    pos: {bottom:'15%', left:'40%'},
                                    html: '<p>He pronounced his name Agu Gagu</p>',
                                }]}/>
                        </div>

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={7}
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
                                        pos: {top:'5%', right:'5%'},
                                        html: '<p>Op og stååååå!</p>',
                                    }
                                ]}/>
                        </div>

                    </div>

                </div>

            </main>

        )
    }
}
