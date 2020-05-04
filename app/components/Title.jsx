import React from 'react';
import {getLS} from "./Common.jsx";

export default class Title extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          started: false,
            timeout: 3000,
            timer: null
        };

        this.handleSound = this.handleSound.bind(this);
        this.handleAutoScroll = this.handleAutoScroll.bind(this);
        this.handleNoSound = this.handleNoSound.bind(this);
        this.start = this.start.bind(this);
    }

    handleSound(){
        let self = this;
        self.timer = setTimeout(function(){
            self.props.begin('sound');
            self.setState({started:true});
        }, self.state.timeout, function(){
            clearTimeout(self.state.timer);
        })
    }

    handleNoSound(){
        let self = this;
        self.timer = setTimeout(function(){
            self.props.begin('no-sound');
            self.setState({started:true});
        }, self.state.timeout, function(){
            clearTimeout(self.state.timer);
        })
    }

    handleAutoScroll(){
        let self = this;
        self.timer = setTimeout(function(){
            self.props.begin('auto');
            self.setState({started:true});
        }, self.state.timeout, function(){
            clearTimeout(self.state.timer);
        })
    }

    start(){
        if (getLS('audioOn') && getLS('autoScroll')) {
            this.handleAutoScroll();
        }

        else if(getLS('audioOn')){
            this.handleSound();
        }

        else {
            this.handleNoSound();
        }
    }

    componentDidMount() {
        this.start();
    }

    render() {
        return (
            <div className="title snap clearfix">
                <h1>{this.props.title}</h1>

                {/*<button className={"start-button"} onClick={() => this.start()}>Start</button>*/}
            </div>
        )
    }
}
