import React from 'react';
import Continue from "../images/continue.png";
import $ from "jquery";
import Frame from "./Frame.jsx";

export default class Panel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            frames: [],
            frameReferences: {},
            playing: false,
            playingIndex: 0,
            active: false,
            wait: 800,
            done:false,
            played: 0,
            lastFrame: false,
            hasFinished: false
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.prepareNextFrame = this.prepareNextFrame.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.frameCount = this.frameCount.bind(this);
        this.showContinueButton = this.showContinueButton.bind(this);
        this.goToNextSection =  this.goToNextSection.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let self = this;
        $('.App').off('scroll').on('scroll', function(){
            self.handleScroll();
        });
    }

    getOrCreateRef(id) {
        if (!this.state.frameReferences.hasOwnProperty(id)) {
            this.state.frameReferences[id] = React.createRef();
        }
        return this.state.frameReferences[id];
    }

    frameCount(){
        let size = 0, key;
        for (key in this.state.frameReferences) {
            if (this.state.frameReferences.hasOwnProperty(key)) size++;
        }
        return size;
    }

    play(){
        if(this.state.lastFrame){
            this.setState({done:true});
            this.props.handleDone(this.props.index);
            return;
        }
        this.state.playing = true;
        if(this.props.frames && this.props.frames.length > 0){
            let currentFrame = this.state.frameReferences[Object.keys(this.state.frameReferences)[this.state.playingIndex]];
            currentFrame.current.play();
            this.state.played++;
        }

        if(this.state.played === this.props.frames.length){
            this.state.lastFrame = true;
        }
    }

    handleMouseEnter(){
        if(this.state.playing){return;}

        this.play();
        this.state.active = true;
    }

    handleMouseLeave(){
        this.state.active = false;
    }


    handleScroll(){

    }


    prepareNextFrame(){
        if(!this.state.active){return;}
        let self = this;
        this.state.playing = true;
        setTimeout(function () {
            self.state.playingIndex++;
            self.play();
        }, self.state.wait);
    }

    showContinueButton(){
        this.setState({hasFinished: true});
    }

    handleFinish(){
        this.prepareNextFrame();
        if(this.state.lastFrame){
            this.showContinueButton();
        }
    }

    goToNextSection(){
        let next = this.props.index+1;
        let selector = '[data-panel-index="'+next+'"]';
        $('.App').animate({
            scrollTop: $(selector).offset().top + (window.innerHeight*next)
        }, 1500);
    }

    render() {

        return (

            <div data-panel-index={this.props.index} onMouseLeave={this.handleMouseLeave} onMouseEnter={this.handleMouseEnter} className={"snap row lift section"} id={this.props.id}>

                {this.props.frames.map((frameElement,i) => (
                    <Frame
                        audioOn={this.props.audioOn}
                        onFinished={this.handleFinish}
                        ref={this.getOrCreateRef('frame-'+frameElement.index)}
                        key={frameElement.index}
                        className={frameElement.className}
                        index={frameElement.index}
                        handleLock={() => frameElement.handleLock}
                        backgroundSrc={frameElement.backgroundSrc}
                        backgroundPos={frameElement.backgroundPos}
                        backgroundSize={frameElement.backgroundSize}
                        middlegroundSrc={frameElement.middlegroundSrc}
                        middlegroundPos={frameElement.middlegroundPos}
                        middlegroundSize={frameElement.middlegroundSize}
                        foregroundSrc={frameElement.foregroundSrc}
                        foregroundPos={frameElement.foregroundPos}
                        foregroundSize={frameElement.foregroundSize}
                        videoURL={frameElement.videoURL}
                        text={frameElement.text}
                    >
                        {frameElement.children}
                    </Frame>
                ))}

                <div className={`continue ${this.state.hasFinished ? " display" : ""}`} onClick={this.goToNextSection}>
                    <img src={Continue} alt="Continue"/>
                </div>

            </div>
        )
    }
}
