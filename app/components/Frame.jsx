import React from 'react';
import MouseParallax from "./MouseParallax.jsx";
import VizSensor from 'react-visibility-sensor';

export default class Frame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgViz: false
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(isVisible){
        this.setState({imgViz: isVisible});
        this.props.handleLock(isVisible,this.props.index);
    };

    render() {
        return (
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
                </div>
            </VizSensor>
        )
    }
}
