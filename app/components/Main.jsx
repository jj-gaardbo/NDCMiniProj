import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Creative from "./Creative.jsx";
import Programmer from "./Programmer.jsx";

window.$globalState = {
    audioOn: true,
    textAudioPlaying: false,
    ambiencePlaying:false,
    autoScroll: false,
    panelIndex: -1
};

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        let index = -1;

        return (
            <Router>
                <div>
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

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/creative">
                            <Creative/>
                        </Route>
                        <Route path="/programmer">
                            <Programmer/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
