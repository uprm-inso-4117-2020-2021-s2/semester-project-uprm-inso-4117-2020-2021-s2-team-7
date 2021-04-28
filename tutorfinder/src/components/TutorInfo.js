import React, { Component } from 'react';
import "./TutorInfo.css";
import { Col, Row, Container, Button } from 'react-bootstrap';
import { TiLocation, TiBook } from "react-icons/ti";
import axios from 'axios';
import { withRouter } from "react-router-dom";

const SERVER_URL = 'https://tutor-finder-server.herokuapp.com/tutorFinder/';
class TutorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutor: ''
        }
    }

    componentDidMount() {
        const tutorId = this.props.match?.params.tid;
        this.getTutorById(tutorId);
    }

    async getTutorById(tid) {
        await axios.get(SERVER_URL + 'tutors/' + tid).then(res => {
            console.log(res);
            this.setState({
                tutor: res.data
            })
        })
    }


    render() {
        return(
            <div className="mainBg">
                <Container>
                    <Row>
                        <Col className='Profile' sm={3}>
                            <h3 className='Name'> 
                            {this.state.tutor.fullName} </h3>
                            <h5> Nationality <TiLocation /> </h5>
                            <p> {this.state.tutor.t_nationality} </p>
                            <h5> Subjects <TiBook /> </h5>
                            {this.state.tutor.subjects?.map(sub => (
                                <p>{sub.s_name}</p>
                            ))}
                        </Col>

                        <Col className='Info' sm={{ span: 8, offset: 1 }}>
                            <div className='More'>
                                <h1> More About This User </h1>
                            </div>
                            <ul>
                                <h5>Summary</h5>
                                <p>{this.state.tutor.t_summary} </p>

                                <h5>Overview</h5>
                                <p style={{display:"block", wordWrap:"break-word", whiteSpace:"normal"}}> {this.state.tutor.t_overview} </p>

                                <h5>Availability</h5>
                                {this.state.tutor.t_weekdays_day && <p>Weekdays during the Day</p>}
                                {this.state.tutor.t_weekdays_eve && <p>Weekdays during the Evening</p>}
                                {this.state.tutor.t_weekends && <p>Weekends</p>}
                                {!this.state.tutor.t_weekdays_day && 
                                !this.state.tutor.t_weekdays_eve && 
                                !this.state.tutor.t_weekends && 
                                <p>Contact Tutor for Availability</p>}

                                <h5>Phone</h5>
                                <p>{this.state.tutor.t_phone} </p>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(TutorInfo);