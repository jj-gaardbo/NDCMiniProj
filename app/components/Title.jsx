import React from 'react';
import butterfly1 from '../images/prof_yellow_2.gif'
import butterfly2 from '../images/blue2.gif'


export default class Title extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render() {
        return (
            <div className="title snap clearfix">
                <img style={{width:'300px', position:'absolute', top:'5%', right:'5%'}} src={butterfly1} alt="Yellow butterfly"/>}
                <img style={{width:'200px', position:'absolute', top:'40%', left:'20%'}} src={butterfly2} alt="Blue butterfly"/>}
                <h1>"This is going to be the title"</h1>
            </div>
        )
    }
}
