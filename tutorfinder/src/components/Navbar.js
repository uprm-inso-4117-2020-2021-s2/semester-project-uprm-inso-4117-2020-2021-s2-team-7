import React, { Component } from 'react';
import "./Navbar.css";
import { FormControl, Form } from 'react-bootstrap';
import pficon from "../assets/pficon.png";
import { withRouter } from "react-router-dom";


class Navbar extends Component {

    constructor(props) {
        super(props);
    }
 
    goToHome() {
        this.props.history.push('/bulletin');
    }

    render() {
        return(
            <nav className="Nav">
                <h1 className="Logo" onClick={this.goToHome.bind(this)}>TutorFinder</h1>

                <Form className="Searchbar">
                      <FormControl type="text" placeholder="Search" className="mr-4 rounded-pill" />
                </Form>

                <a href="/Account"><img src={pficon} className='pficon' alt="pficon"/></a>
            </nav>
        )
    }
}

export default withRouter(Navbar);