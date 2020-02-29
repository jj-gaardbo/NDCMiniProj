'use strict';

import React, {Component} from 'react';
import $ from 'jquery';

class VideoElement extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: props.videoURL
        }

        this.play = this.play.bind(this);
    }

    play(){
        $("#"+this.props.id).play();
    }

    render () {
        return (
            <video id={this.props.id} muted className="background-video" loop autoPlay>
                <source src={this.props.videoURL.default} type="video/mp4" />
                <source src={this.props.videoURL.default} type="video/ogg" />
                Your browser does not support the video tag.
            </video>
        )
    }
};

export default VideoElement;
