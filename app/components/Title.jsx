import React from 'react';
import butterfly from '../images/green.gif'
import butterfly2 from '../images/blue2.gif'
import butterfly3 from '../images/orange2.gif'

export default class Title extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          started: false
        };

        this.handleSound = this.handleSound.bind(this);
        this.handleAutoScroll = this.handleAutoScroll.bind(this);
        this.handleNoSound = this.handleNoSound.bind(this);
    }

    handleSound(){
        this.setState({started:true});
        this.props.begin('sound');
    }

    handleNoSound(){
        this.setState({started:true});
        this.props.begin('no-sound');
    }

    handleAutoScroll(){
        this.setState({started:true});
        this.props.begin('auto');
    }

    render() {
        return (
            <div className="title snap clearfix">
                <h1>"This is going to be the title"</h1>
                <button style={{width:'250px', bottom:'40%', left:'50%', marginLeft:'-100px'}} type={'button'} onClick={this.handleSound} className={'start-sound'}>
                    <img src={butterfly2} alt="Blue butterfly"/>
                    <p>With sound</p>
                </button>

                <button style={{width:'250px', bottom:'20%', right:'20%'}} type={'button'} onClick={this.handleAutoScroll} className={'start-sound-autoscroll'}>
                    <img src={butterfly} alt="Green butterfly"/>
                    <p>Auto scroll</p>
                </button>

                <button style={{width:'250px', top:'10%', left:'20%'}} type={'button'} onClick={this.handleNoSound} className={'start-free'}>
                    <img src={butterfly3} alt="Yellow butterfly"/>
                    <p>Free roam</p>
                </button>
            </div>
        )
    }
}
