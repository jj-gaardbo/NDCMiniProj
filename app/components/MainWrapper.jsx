import React from 'react';
import Title from "./Title.jsx";
import Frame from "./Frame.jsx";
import Hub from "./Hub.jsx";

import imageBg1 from '../images/background1.jpg'
import imageBg2 from '../images/background2.jpg'
import imageP1 from '../images/person1.png'
import imageP2 from '../images/person2.png'
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
                <Hub handleAudioOn={this.handleAudioOn} audioOn={this.state.audioOn}/>

                <Title />

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-6 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={0}
                                handleLock={this.handleLock}
                                backgroundSrc={imageBg1}
                                backgroundPos={{top:'0%', left:'-10%'}}
                                backgroundSize={{width: '100%'}}
                                middlegroundSrc={imageP1}
                                middlegroundPos={{top:'30%', left:'5%'}}
                                middlegroundSize={{width: '10%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '100%'}}
                            >
                                <div className="interactive" style={{left: '80%',top: '80%'}}>
                                    <ModalElement size={{width:'600px',height:'200px'}} pos={{top:'calc(50% - 100px)', left:'calc(50% - 300px)'}} className={"modal-element"} title={"HEADING"} buttonElement={<h1>TESTING</h1>}><p>This is a child</p></ModalElement>
                                </div>
                            </Frame>
                        </div>

                        <div className="col-lg-6 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={1}
                                handleLock={this.handleLock}
                                backgroundSrc={imageBg1}
                                backgroundPos={{top:'0%', left:'0%'}}
                                backgroundSize={{width: '110%'}}
                                middlegroundSrc={imageP2}
                                middlegroundPos={{top:'-15%', left:'5%'}}
                                middlegroundSize={{width: '30%'}}
                                foregroundSrc={smoke}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '100%'}}/>
                        </div>

                    </div>

                </div>

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-12 window skew-2-right">
                            <div className="overlay"></div>

                            <Frame
                                index={1}
                                handleLock={this.handleLock}
                                backgroundSrc={imageBg2}
                                backgroundPos={{top:'0%', left:'0%'}}
                                backgroundSize={{width: '110%'}}
                                middlegroundSrc={imageP2}
                                middlegroundPos={{top:'5%', left:'5%'}}
                                middlegroundSize={{width: '30%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '100%'}}/>
                        </div>

                    </div>

                </div>

                <div className="snap">

                    <div className="row lift">

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={0}
                                handleLock={this.handleLock}
                                backgroundSrc={imageBg2}
                                backgroundPos={{top:'0%', left:'-40%'}}
                                backgroundSize={{width: '100%'}}
                                middlegroundSrc={imageP2}
                                middlegroundPos={{top:'30%', left:'0%'}}
                                middlegroundSize={{width: '10%'}}
                                foregroundSrc={smoke}
                                foregroundPos={{top:'0%', left:'-20%'}}
                                foregroundSize={{width: '100%'}}
                            />
                        </div>

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={1}
                                handleLock={this.handleLock}
                                backgroundSrc={imageBg1}
                                backgroundPos={{top:'0%', left:'0%'}}
                                backgroundSize={{width: '110%'}}
                                middlegroundSrc={imageP1}
                                middlegroundPos={{top:'30%', left:'-15%'}}
                                middlegroundSize={{width: '30%'}}
                                foregroundSrc={smoke}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '100%'}}/>
                        </div>

                        <div className="col-lg-4 window skew-4-left">
                            <div className="overlay"></div>

                            <Frame
                                index={0}
                                handleLock={this.handleLock}
                                backgroundSrc={imageBg2}
                                backgroundPos={{top:'0%', left:'0%'}}
                                backgroundSize={{width: '100%'}}
                                middlegroundSrc={imageP2}
                                middlegroundPos={{top:'30%', left:'50%'}}
                                middlegroundSize={{width: '10%'}}
                                foregroundSrc={dust}
                                foregroundPos={{top:'0%', left:'0%'}}
                                foregroundSize={{width: '100%'}}
                            />
                        </div>

                    </div>

                </div>

            </main>

        )
    }
}
