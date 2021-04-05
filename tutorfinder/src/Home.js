import React from "react";
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Nav from './Nav.js';
import SignupPage from "./SignupPage";
import Login from "./Login";


class Home extends React.Component {

    constructor (props) {
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
            isMainVisible:false
        });
    }

    onSignInClick() {
        this.setState({
            isJoinNowVisible: false,
            isSignInVisible: true,
            isMainVisible:false
        });
    }

    onLogoClick() {
        this.setState({
            isJoinNowVisible: false,
            isSignInVisible: false,
            isMainVisible:true
        });
    }

    render(){
    return (
        <div className="bod">
            <Nav
            onJoinNowClick={this.onJoinNowClick.bind(this)}
            onSignInClick={this.onSignInClick.bind(this)}
            onLogoClick={this.onLogoClick.bind(this)}>
            </Nav>
            {this.state.isMainVisible && <div style={{ width: "100%", paddingTop: "30%" }}>
                <div className="box">
                    <div className="boxTitle">
                        Find the Best Tutor for You</div>
                    <div className="boxText">
                        Select from an ample catalog of tutors so you too <br></br>
                        can improve your academic performance</div>
                </div>
                <div style={{ width: '40%', marginLeft:'30%', marginTop: '8px' }}>

                    <form action="">
                        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button id="button-addon2" type="submit" className="btn btn-link text-warning" style={{width:'40px'}}><i className="fa fa-search"></i></button>
                                </div>
                                <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon2" className="form-control border-0 bg-light" style={{marginRight:'10px'}} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>}
            {this.state.isJoinNowVisible && <SignupPage/>}
            {this.state.isSignInVisible && <Login/>}
        </div>
    );
    }
}

export default Home;