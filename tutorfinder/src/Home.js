import React from "react";
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Nav from './Nav.js';
import SignupPage from "./SignupPage";
import Login from "./Login";
import { withRouter } from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isJoinNowVisible: false,
            isSignInVisible: false,
            isMainVisible: true
        }
    }

    onJoinNowClick() {
        this.setState({
            isJoinNowVisible: true,
            isSignInVisible: false,
            isMainVisible: false
        });
    }

    onSignInClick() {
        this.setState({
            isJoinNowVisible: false,
            isSignInVisible: true,
            isMainVisible: false
        });
    }

    onLogoClick() {
        this.setState({
            isJoinNowVisible: false,
            isSignInVisible: false,
            isMainVisible: true
        });
    }

    render() {
        return (
            <div className="bod">
                <Nav
                    onJoinNowClick={this.onJoinNowClick.bind(this)}
                    onSignInClick={this.onSignInClick.bind(this)}
                    onLogoClick={this.onLogoClick.bind(this)}>
                </Nav>
                {this.state.isMainVisible && <div style={{ width: "100%", paddingTop: "10%" }}>
                    <div className="box">
                        <div className="boxTitle">
                            Find the Best Tutor for You
                        </div>
                        <div className="boxText">
                            Select from an ample catalog of tutors so you 
                            too can improve your academic performance
                        </div>
                    </div>
                    <div style={{ textAlign:"center", marginTop: "16px" }}>
                        <button className="tutorButton" onClick={() => { this.props.history.push('/bulletin') }}>Find Tutor</button>
                    </div>
                </div>}
                {this.state.isJoinNowVisible && <SignupPage />}
                {this.state.isSignInVisible && <Login />}
            </div>
        );
    }
}

export default withRouter(Home);