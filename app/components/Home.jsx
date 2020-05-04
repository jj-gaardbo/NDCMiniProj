import React from 'react';
import { Redirect } from "react-router-dom";
import $ from 'jquery';
import butterfly2 from "./assets/images/blue2.gif";
import butterfly from "./assets/images/green.gif";
import butterfly3 from "./assets/images/orange2.gif";
import {setLS} from "./Common.jsx";

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        };
        this.redirectToStart = this.redirectToStart.bind(this);
        this.handleSound = this.handleSound.bind(this);
        this.handleAutoScroll = this.handleAutoScroll.bind(this);
        this.handleNoSound = this.handleNoSound.bind(this);
        this.clearLS = this.clearLS.bind(this);
    }

    redirectToStart(){
        this.setState({ redirect: "/background" });
    }

    clearLS(){
        setLS('audioOn', false);
        setLS('autoScroll', false);
        setLS('textAudioPlaying', false);
        setLS('ambiencePlaying', false);
    }

    handleSound(){
        this.clearLS();
        setLS('audioOn', true);
        this.redirectToStart();
    }

    handleNoSound(){
        this.clearLS();
        this.redirectToStart();
    }

    handleAutoScroll(){
        this.clearLS();
        setLS('audioOn', true);
        setLS('autoScroll', true);
        this.redirectToStart();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <main className={'home-wrapper'}>
                <div className="title snap clearfix">
                    <h1>"This is going to be the title"</h1>
                    <button style={{bottom:'40%', left:'50%', marginLeft:'-100px'}} type={'button'} onClick={this.handleSound} className={'start-sound'}>
                        <img src={butterfly2} alt="Blue butterfly"/>
                        <p>Sound</p>
                    </button>

                    <button style={{bottom:'30%', right:'20%'}} type={'button'} onClick={this.handleAutoScroll} className={'start-sound-autoscroll'}>
                        <img src={butterfly} alt="Green butterfly"/>
                        <p>Sound + Auto scroll</p>
                    </button>

                    <button style={{top:'10%', left:'20%'}} type={'button'} onClick={this.handleNoSound} className={'start-free'}>
                        <img src={butterfly3} alt="Yellow butterfly"/>
                        <p>No sound</p>
                    </button>
                </div>
            </main>
        )
    }
}
