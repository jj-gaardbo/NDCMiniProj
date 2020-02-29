import React from 'react';
import MouseParallax from "./MouseParallax.jsx";
import VizSensor from 'react-visibility-sensor';

export default class Frame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            timeout: 1000,
            timerID:0,
            imgViz: false,
            hovered: false,
            playing: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
    }

    onChange(isVisible){
        this.setState({imgViz: isVisible});
        this.props.handleLock(isVisible,this.props.index);
    };

    play(){
        this.setState({playing: true});
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
            <div onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <VizSensor
                    onChange={this.onChange}
                >
                    <div className={"clearfix viz"}>
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

                    {children}

                    </div>
                </VizSensor>
            </div>
        )
    }
}
