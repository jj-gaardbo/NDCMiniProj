import React from 'react';
import $ from "jquery";
import butterfly1 from "./assets/images/purple2.gif";
import butterfly2 from "./assets/images/orange2.gif";
import { Redirect } from "react-router-dom";
import {setLS} from "./Common.jsx";

export default class BreakerBranch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            isCreativityPlayed: 0,
            isProgrammerPlayed: 0
        };

        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        if(this.props.routeoneTitle === 'Computers' && !this.props.routetwoTitle){
            this.setState({isCreativityPlayed:1});
            setLS('isCreativityPlayed', 'yes');
        } else if(this.props.routeoneTitle === 'Creativity' && !this.props.routetwoTitle){
            this.setState({isProgrammerPlayed:1});
            setLS('isProgrammerPlayed', 'yes');
        } else if(this.props.bothPlayed){
            setLS('isProgrammerPlayed', 'yes');
            setLS('isCreativityPlayed', 'yes');
        }
    }

    redirect(redirect){
        this.setState({ redirect: redirect });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div data-panel-index={this.props.index} className="breaker snap clearfix section breaker-branch">

                <h2>{this.props.header}</h2>

                <button className={'branch-redirect'} style={{bottom:'40%', left:'20%'}} type={'button'} onClick={() => this.redirect(this.props.routeone)}>
                    <img src={butterfly1} alt="Purple butterfly"/>
                    <p>{this.props.routeoneTitle}</p>
                </button>

                {this.props.routetwoTitle && this.props.routetwo &&
                    <button className={'branch-redirect'} style={{bottom:'40%', right:'20%'}} type={'button'} onClick={() => this.redirect(this.props.routetwo)}>
                        <img src={butterfly2} alt="Orange butterfly"/>
                        <p>{this.props.routetwoTitle}</p>
                    </button>
                }

            </div>
        )
    }
}
