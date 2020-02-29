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
            index: props.index,
            wait: 1000,
            timeout: 1000,
            timerID:0,
            imgViz: false,
            hovered: false,
            playing: false,
            playingIndex: -1,
            played: [],
            text: [],
            textReferences: {},
            videoID:""
        };

        this.onChange = this.onChange.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.revealText = this.revealText.bind(this);
        this.revealSpeak = this.revealSpeak.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
    }

    getOrCreateRef(id) {
        if (!this.state.textReferences.hasOwnProperty(id)) {
            this.state.textReferences[id] = React.createRef();
        }
        return this.state.textReferences[id];
    }

    onChange(isVisible){
        this.setState({imgViz: isVisible});
        this.props.handleLock(isVisible,this.props.index);
    };

    revealText(revealIndex){
        let self = this;
        if($.inArray(revealIndex, self.state.played) !== -1){return;}

        const thisNode = ReactDOM.findDOMNode(this);
        let textFrames = $(thisNode).find('.text-frame');
        if(textFrames){
            for(let i = 0; i < textFrames.length; i++){
                let textFrame = $($($(textFrames[i])[0])[0]);
                if(textFrame.data('index') === revealIndex){
                    this.state.played.push(revealIndex);
                    textFrame.animate({
                        opacity: "1"
                    }, 300, function(){
                        if(textFrames.length > 1 && textFrames.length !== self.state.played.length){
                            setTimeout(function () {
                                self.setState({playingIndex: self.state.playingIndex+1});
                                self.revealText(self.state.playingIndex);
                            }, self.state.wait);
                        }
                        else if(textFrames.length === self.state.played.length){
                            self.setState({playingIndex: self.state.playingIndex+1});
                        }
                    });
                }
            }
        }
    }

    revealSpeak(revealIndex){
        let currentRef = 'text-'+this.state.playingIndex;
        if (this.state.textReferences.hasOwnProperty(currentRef)) {
            this.state.textReferences[currentRef].current.show();
        }

        //console.log(this.props.text[revealIndex].props.children);
    }

    play(){
        this.setState({playing: true});
        if(this.props.text && this.props.text.length > 0){
            this.setState({text:this.props.text,playingIndex:0});
            this.revealText(this.state.playingIndex);
        }
    }

    stop(){
        this.setState({playing: false});
    }

    handleMouseEnter(){
        this.setState({hovered: true});
        this.state.timerID = setTimeout(() => this.play(), this.state.timeout);
    }

    handleMouseLeave(){
        this.setState({hovered: false});
        this.stop();
        clearTimeout(this.state.timerID);
    }

    render() {
        const children = this.props.children;

        return (
            <div className={"frame-main"} data-index={this.props.index} onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
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

                {this.state.text.map((textElement,i) =>
                    <TextFrame
                        id={'text-'+textElement.index}
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

            })

            </div>
        )
    }
}
