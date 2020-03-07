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
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
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

    handleMouseEnter(){
        console.log("Mouse enter: Start panel");
    }

    handleMouseLeave(){
        console.log("Mouse leave: Stop panel");
    }


    handleScroll(){
        console.log("Scrolling panel: Stop panel")
    }

    render() {

        return (

            <div onMouseLeave={this.handleMouseLeave} onMouseEnter={this.handleMouseEnter} className={"snap row lift"} id={this.props.id}>

                {this.props.frames.map((frameElement,i) => (
                    <Frame
                        ref={this.getOrCreateRef('frame-'+frameElement.index)}
                        key={frameElement.index}
                        className={frameElement.className}
                        audioOn={frameElement.audioOn}
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

                <div className="continue">
                    <img src={Continue} alt="Continue"/>
                </div>

            </div>
        )
    }
}
