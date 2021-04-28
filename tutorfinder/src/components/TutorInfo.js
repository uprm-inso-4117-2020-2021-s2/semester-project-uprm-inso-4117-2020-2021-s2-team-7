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
            tutor: '',
            allSubjectsId: [],
            allSubjectsName: [],
            changes: false,
            mySubjects: []

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
        const subArr=[]
        this.state.tutor.offers.map(off => {
            subArr.push(off.subject_id);
        });
        this.getListSubjects(subArr);
    }

    async getListSubjects(subArr) {
        await axios.get(SERVER_URL + 'subjects').then(res => {
            console.log(res);
            res.data.map(sub => {
                this.state.allSubjectsId.push(sub.sid);
                this.state.allSubjectsName.push(sub.s_name);
            });
            
        });
        console.log(this.props.subjectArr);
        subArr.forEach(id => {
            console.log(id);
            const index = this.state.allSubjectsId?.indexOf(id);
            console.log(this.state.allSubjectsName[index]);
            this.state.mySubjects.push(this.state.allSubjectsName[index]);
        });
        this.setState({ changes: true });
    }


    render() {
        return (
            <div className="mainBg">
                <Container>
                    <Row>
                        <Col className='Profile' sm={3}>
                            <h3 className='Name'>
                                {this.state.tutor.fullName} </h3>
                            <h5> Nationality <TiLocation /> </h5>
                            <p> {this.state.tutor.t_nationality} </p>
                            <h5> Subjects <TiBook /> </h5>
                            {this.state.mySubjects?.map(sub => (
                                <p>{sub}</p>
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
                                <p style={{ display: "block", wordWrap: "break-word", whiteSpace: "normal" }}> {this.state.tutor.t_overview} </p>

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