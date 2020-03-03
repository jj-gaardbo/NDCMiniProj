import React from 'react';
import butterfly2 from '../images/blue2.gif'


export default class Title extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          started: false
        };

        this.handleStart = this.handleStart.bind(this);
    }

    handleStart(){
        this.setState({started:true});
        this.props.begin();
    }

    render() {
        return (
            <div className="title snap clearfix">
                <h1>"This is going to be the title"</h1>
                <button type={'button'} onClick={this.handleStart}>
                    <img style={{width:'200px', position:'absolute', bottom:'40%', left:'50%', marginLeft:'-100px'}} src={butterfly2} alt="Blue butterfly"/>
                </button>
            </div>
        )
    }
}
