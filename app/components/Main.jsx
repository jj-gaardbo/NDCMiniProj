import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Episode_Creative from "./Episode_Creative.jsx";
import Episode_Programmer from "./Episode_Programmer.jsx";
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
                        <Route path="/background">
                            <Episode_BG/>
                        </Route>
                        <Route path="/programmer">
                            <Episode_Programmer/>
                        </Route>
                        <Route path={"/creative"}>
                            <Episode_Creative/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
