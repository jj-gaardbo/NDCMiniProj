import React from 'react';
import Title from "./Title.jsx";
import Frame from "./Frame.jsx";
import Hub from "./Hub.jsx";

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
                console.log("Unlock");
                this.lockScroll(false);
            }
        });
    }

    render() {
        return (

            <main className={
                this.state.lockScroll ? 'App clearfix no-scroll' : 'App clearfix'
            }>
                <Hub handleAudioOn={this.handleAudioOn} audioOn={this.state.audioOn}/>

                <Title />

                <div className="snap">

                    <Frame
                        index={0}
                        handleLock={this.handleLock}
                        backgroundSrc={require('../images/background2.jpg')}
                        backgroundPos={{top:'0%', left:'0%'}}
                        backgroundSize={{width: '100%'}}
                        middlegroundSrc={require('../images/person1.png')}
                        middlegroundPos={{top:'30%', left:'50%'}}
                        middlegroundSize={{width: '10%'}}
                        foregroundSrc={require('../images/dust.png')}
                        foregroundPos={{top:'0%', left:'0%'}}
                        foregroundSize={{width: '100%'}}
                    />

                </div>

                <div className="snap">

                    <Frame
                        index={1}
                        handleLock={this.handleLock}
                        backgroundSrc={require('../images/background1.jpg')}
                        backgroundPos={{top:'0%', left:'0%'}}
                        backgroundSize={{width: '110%'}}
                        middlegroundSrc={require('../images/person2.png')}
                        middlegroundPos={{top:'5%', left:'5%'}}
                        middlegroundSize={{width: '30%'}}
                        foregroundSrc={require('../images/smoke.png')}
                        foregroundPos={{top:'0%', left:'0%'}}
                        foregroundSize={{width: '100%'}}/>

                </div>

            </main>

        )
    }
}
