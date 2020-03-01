'use strict';

import React from 'react';
import SpeakSound from "./SpeakSound.jsx";

export default class TextFrame extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        };
        this.show = this.show.bind(this);
        this.sound = React.createRef()
    }

    componentDidMount() {

    }

    show(){
        this.setState({isVisible:true});
        if(this.props.sound){
            this.sound.current.play();
        }
    }

    render() {
        const style = {
            left: this.props.pos.left,
            top: this.props.pos.top,
            right: this.props.pos.right,
            bottom: this.props.pos.bottom
        };
        if(this.props.pos.right){
            style.left = 'auto'
        }
        if(this.props.pos.bottom){
            style.top = 'auto'
        }
        return (
            <div
                ref={'text_ref_'+this.props.index}
                className={`text-frame clearfix${this.state.isVisible ? " visible" : " "} ${this.props.type ? this.props.type : "regular"} ${this.props.color ? this.props.color : ""}`}
                style={style}
                data-index={this.props.index}
            >
                {this.props.type &&
                    <div className={`point ${this.props.type ? this.props.type : ""}`} />
                }
                <span dangerouslySetInnerHTML={{__html: this.props.html}} />
                {this.props.sound &&
                    <SpeakSound ref={this.sound} index={this.props.index} url={this.props.sound} />
                }
            </div>
        )
    }
}
