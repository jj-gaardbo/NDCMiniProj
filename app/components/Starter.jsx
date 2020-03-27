import React from 'react';
import butterfly from '../images/green.gif'
import butterfly2 from '../images/blue2.gif'
import butterfly3 from '../images/orange2.gif'
import {Link} from "react-router-dom";

export default class Title extends React.Component {

    constructor(props) {
        super(props);

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
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/creative">Creative</Link>
                        </li>
                        <li>
                            <Link to="/programmer">Programmer</Link>
                        </li>
                    </ul>
                </nav>



                <h1>"This is going to be the title"</h1>
                {/*<button style={{bottom:'40%', left:'50%', marginLeft:'-100px'}} type={'button'} onClick={this.handleSound} className={'start-sound'}>
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
                </button>*/}
            </div>
        )
    }
}
