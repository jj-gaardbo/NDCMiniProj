import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Episode_Creative from "./Episode_Creative.jsx";
import Episode_Programmer from "./Episode_Programmer.jsx";
import Episode_Medialogy from "./Episode_Medialogy.jsx";
import Home from "./Home.jsx";
import Episode_BG from "./Episode_BG.jsx";
import {setLS} from "./Common.jsx";
import Credits from "./Credits.jsx";

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bgVolume: 10
        };

        this.handleBGVolChange = this.handleBGVolChange.bind(this);
    }

    componentDidMount() {
        setLS('backgroundVolume', this.state.bgVolume);
    }

    handleBGVolChange(event){
        this.setState({bgVolume: event.target.value});
        setLS('backgroundVolume', event.target.value);
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
                            <li>
                                <Link to="/origin">Origin</Link>
                            </li>
                            <li>
                                <Link to="/creativity">Creativity</Link>
                            </li>
                            <li>
                                <Link to="/computers">Computers</Link>
                            </li>
                            <li>
                                <Link to="/medialogy">Medialogy</Link>
                            </li>
                            <li>
                                <Link to="/credits">Credits</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/origin">
                            <Episode_BG/>
                        </Route>
                        <Route path="/computers">
                            <Episode_Programmer/>
                        </Route>
                        <Route path={"/creativity"}>
                            <Episode_Creative/>
                        </Route>
                        <Route path={"/medialogy"}>
                            <Episode_Medialogy/>
                        </Route>
                        <Route path={"/credits"}>
                            <Credits/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
