import React from 'react';
import Continue from "./assets/images/continue.png";
import $ from "jquery";

export default class Breaker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            wait: 1600,
            hasFinished: false
        };

        this.hold = this.hold.bind(this);
        this.goToNextSection =  this.goToNextSection.bind(this);
        this.showContinueButton = this.showContinueButton.bind(this);
    }

    showContinueButton(){
        this.setState({hasFinished: true});
    }

    hold(){
        let self = this;
        setTimeout(function(){
            if(!window.$globalState.autoScroll && window.$globalState.audioOn){
                self.showContinueButton();
            } else {
                self.props.handleDone(self.props.index);
            }
        }, self.state.wait);
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
            <div data-panel-index={this.props.index} onMouseEnter={this.hold} className="breaker snap clearfix section">
                {this.props.children}

                <div className={`continue ${this.state.hasFinished ? " display" : ""}`} onClick={this.goToNextSection}>
                    <img src={Continue} alt="Continue"/>
                </div>
            </div>
        )
    }
}
