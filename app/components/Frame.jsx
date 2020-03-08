import React from 'react';
import ReactDOM from "react-dom";
import MouseParallax from "./MouseParallax.jsx";
import VizSensor from 'react-visibility-sensor';
import $ from 'jquery';
import TextFrame from "./Text.jsx";
import VideoElement from "./video.jsx";

export default class Frame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active:true,
            index: props.index,
            wait: 800,
            timeout: 500,
            timerID:0,
            imgViz: false,
            hovered: false,
            playing: false,
            playingIndex: -1,
            played: [],
            text: [],
            textReferences: {},
            videoID:"",
            done: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.revealText = this.revealText.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.prepareNextSpeak = this.prepareNextSpeak.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let self = this;
        $('.App').off('scroll').on('scroll', function(){
            self.handleScroll();
        });
    }

    handleScroll(){
        if(!this.state.active){return;}
        const thisNode = ReactDOM.findDOMNode(this);
        let textFrames = $(thisNode).find('.text-frame');
        if(textFrames){
            for(let i = 0; i < textFrames.length; i++){
                let textFrame = $($($(textFrames[i])[0])[0]);
                textFrame.css({
                    opacity: "1"
                });
            }
            this.state.active = false;
        }
    }

    getOrCreateRef(id) {
        if (!this.state.textReferences.hasOwnProperty(id)) {
            this.state.textReferences[id] = React.createRef();
        }
        return this.state.textReferences[id];
    }

    onChange(isVisible){
        this.state.imgViz = isVisible;
        this.props.handleLock(isVisible,this.props.index);
        if(!isVisible){
            for (let i = 0; i < this.state.textReferences.length; i++){
                if(this.state.textReferences['text-'+i].current.hasSound){
                    this.state.textReferences['text-'+i].current.stop();
                }
            }
        }
    };

    revealText(revealIndex){
        if(!this.state.active){return;}

        let self = this;
        if($.inArray(revealIndex, self.state.played) !== -1){return;}

        const thisNode = ReactDOM.findDOMNode(this);
        let textFrames = $(thisNode).find('.text-frame');

        if(textFrames){
            for(let i = 0; i < textFrames.length; i++){
                let textFrame = $($($(textFrames[i])[0])[0]);
                if(textFrame.data('index') === revealIndex && !this.state.textReferences['text-'+revealIndex].current.state.isPlaying){
                    textFrame.animate({
                        opacity: "1"
                    }, 500, function(){
                        if(!self.state.textReferences['text-'+revealIndex].current.state.hasSound){
                            self.prepareNextSpeak(revealIndex);
                        }
                    });

                    if(textFrames.length === self.state.played.length){
                        $(thisNode).siblings('.overlay').addClass("played");
                    }
                    this.state.played.push(revealIndex);
                    self.state.textReferences['text-'+revealIndex].current.show();
                }
            }
        }
    }

    play(){
        if(window.$globalState.textAudioPlaying){return;}
        this.state.playing = true;
        if(this.props.text && this.props.text.length > 0){
            this.setState({text:this.props.text,playingIndex:0});
            this.state.timerID = setTimeout(() => this.revealText(this.state.playingIndex), this.state.timeout);
        }
    }

    stop(){
        this.state.playing = false;
        clearTimeout(this.state.timerID);
    }

    handleMouseEnter(){
        this.state.hovered = true;
    }

    handleMouseLeave(){
        this.state.hovered = false;
    }

    textCount(){
        let size = 0, key;
        for (key in this.state.textReferences) {
            if (this.state.textReferences.hasOwnProperty(key)) size++;
        }
        return size;
    }

    prepareNextSpeak(index){
        if(!this.state.active){return;}
        let self = this;
        let next = index+1;

        if(this.textCount() === next){
            this.setState({done:true});
            this.stop();
            const thisNode = ReactDOM.findDOMNode(this);
            $(thisNode).siblings('.overlay').addClass("played");
            this.props.onFinished();
            return;
        }

        setTimeout(function () {
            self.revealText(next);
            self.state.playingIndex = next;
        }, self.state.wait);
    }

    render() {
        const children = this.props.children;

        return (
            <div
                ref={'frame-'+this.props.index}
                className={this.props.className}
                data-index={this.props.index}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>

                <div className="overlay"/>

                <VizSensor
                    onChange={this.onChange}
                >
                    <div className={"clearfix viz"}>

                        {!this.props.videoURL ? (
                            <MouseParallax
                                backgroundSrc={this.props.backgroundSrc}
                                backgroundPos={this.props.backgroundPos}
                                backgroundSize={this.props.backgroundSize}
                                middlegroundSrc={this.props.middlegroundSrc}
                                middlegroundPos={this.props.middlegroundPos}
                                middlegroundSize={this.props.middlegroundSize}
                                foregroundSrc={this.props.foregroundSrc}
                                foregroundPos={this.props.foregroundPos}
                                foregroundSize={this.props.foregroundSize}
                            />
                        ) : (
                            <VideoElement
                                id={"video-"+this.props.index}
                                videoPlaying={false}
                                videoURL={this.props.videoURL}
                            />
                        )}

                        {children}

                    </div>
                </VizSensor>

                {this.props.text.map((textElement,i) =>
                    <TextFrame
                        audioOn={this.state.audioOn}
                        prepareNextSpeak={this.prepareNextSpeak}
                        id={'text-'+textElement.index}
                        color={textElement.color}
                        sound={textElement.sound}
                        html={textElement.html}
                        index={textElement.index}
                        pos={{left:textElement.pos.left,top:textElement.pos.top,right:textElement.pos.right,bottom:textElement.pos.bottom}}
                        ref={this.getOrCreateRef('text-'+textElement.index)}
                        key={textElement.index}
                        name={textElement.name}
                        type={textElement.type}
                    />
                )}


            </div>
        )
    }
}
