import React, { Component } from 'react';
import "./TutorInfo.css";
import { Col, Row, Container, Button } from 'react-bootstrap';
import pfp from "../assets/pfp.png";
import { TiLocation, TiGlobe } from "react-icons/ti";

class TutorInfo extends Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col className='Profile' sm={3}>
                        <img src={pfp} className="pfp" alt="pfp"/>
                        <h3 className='Name'> Juan Del Pueblo </h3>
                        <h5> Location <TiLocation /> </h5>
                        <p> Mayaguez, PR </p>
                        <h5> Languages <TiGlobe /> </h5>
                        <p> English, Spanish </p>
                        <Button className='msgbutton' variant="primary"> Send Message </Button>{''}
                     </Col>

                     <Col className='Info' sm={{ span: 8, offset: 1 }}>
                        <div className='More'>
                            <h1> More About This User </h1>
                        </div>
                        <ul>
                            <h5>Biography</h5>
                            <p>I am currently pursuing a masters degree in the University of Puerto Rico in Mayaguez. </p>

                            <h5>Experience</h5>
                            <p> I have been tutoring for 2 years, working with students of all ages. </p>
                            <p> I aim to learn about my students strengths in order to cater my teaching to their needs. </p>

                            <h5>Subjects</h5>
                            <p> Math: Pre-calculus, Calculus, Calculus II</p>
                            <p> Science: Physics </p>

                            <h5>Rates</h5>
                            <p> Pre-calculus: $ </p>
                            <p> Calculus/Calculus II: $ </p>
                            <p> Physics: $ </p>

                            <h5>Availability</h5>
                            <p> Weekday daytime </p>
                            <p> Weekday evening </p>
                        </ul>
                     </Col>
                </Row>
            </Container>
        )
    }
}

export default TutorInfo;