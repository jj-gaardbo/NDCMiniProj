import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Creative from "./Creative.jsx";
import Programmer from "./Programmer.jsx";
import Presentation from "./Presentation.jsx";
import Home from "./Home.jsx";
import Episode_BG from "./Episode_BG.jsx";

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
                    <nav className={"main-nav"}>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/bg">
                            <Episode_BG/>
                        </Route>
                        <Route path="/programmer">
                            <Programmer/>
                        </Route>
                        <Route path={"/presentation"}>
                            <Presentation/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
