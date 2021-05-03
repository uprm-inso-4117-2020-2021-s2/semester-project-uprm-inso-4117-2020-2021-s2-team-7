import React, { Component } from 'react';
import "./TutorInfo.css";
import { Col, Row, Container } from 'react-bootstrap';
import { TiWorld, TiBook, TiMail, TiPhone, TiCog, TiStarburstOutline,
        TiCalendar, TiDocumentText, TiNews } from "react-icons/ti";
import axios from 'axios';
import { withRouter } from "react-router-dom";

const SERVER_URL = 'https://tutor-finder-server.herokuapp.com/tutorFinder/';
class TutorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutor: '',
            modality: '',
            myHourlyRate: 0,
            allSubjectsIds: [],
            allSubjectsNames: [],
            subChanges: false,
            allEducationsIds: [],
            allEducationsNames: [],
            eduChanges: false,
            mySubjects: [],
            myEducations:[],
            myLanguages: []
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

        this.state.tutor.languages.map(lang => {
            console.log(lang);
            this.state.myLanguages.push(lang.type);
        });

        const subArr=[]
        const eduArr=[]
        this.state.tutor.offers.map(off => {
            console.log(off);
            subArr.push(off.subject_id);
            eduArr.push(off.level_of_education_id);
            this.setState({
                modality: off.modality,
                myHourlyRate: off.hourly_rate
            })
        });
        this.getListSubjects(subArr);
        this.getListEducations(eduArr);
    }

    async getListSubjects(subArr) {
        await axios.get(SERVER_URL + 'subjects').then(res => {
            console.log(res);
            res.data.map(sub => {
                this.state.allSubjectsIds.push(sub.sid);
                this.state.allSubjectsNames.push(sub.s_name);
            });
        });
        console.log(this.props.subjectArr);
        subArr.forEach(id => {
            console.log(id);
            const index = this.state.allSubjectsIds?.indexOf(id);
            console.log(this.state.allSubjectsNames[index]);
            this.state.mySubjects.push(this.state.allSubjectsNames[index]);
        });
        this.setState({ subChanges: true });
    }

    async getListEducations(eduArr) {
        await axios.get(SERVER_URL + 'levelOfEducations').then(res => {
            console.log(res);
            res.data.map(edu => {
                this.state.allEducationsIds.push(edu.leid);
                this.state.allEducationsNames.push(edu.le_name);
            });
        });
        eduArr.forEach(id => {
            console.log(id);
            const index = this.state.allEducationsIds?.indexOf(id);
            console.log(this.state.allEducationsNames[index]);
            this.state.myEducations.push(this.state.allEducationsNames[index]);
        });
        this.setState({ eduChanges: true });
    }


    render() {
        return (
            <div className="equationsBg">
                <Container>
                    <Row>
                        <Col className="Profile" sm={3}>
                            <h3 className="Name">
                                {this.state.tutor.fullName}
                            </h3>
                            <h5> Modality <TiCog/> </h5>
                            <p> {this.state.modality} </p>
                            <h5> Subjects <TiBook/> </h5>
                            {this.state.mySubjects?.map(sub => (
                                    <p>{sub}</p>
                                ))}
                            <h5> Languages <TiWorld/> </h5>
                            {this.state.myLanguages?.map(lang => (
                                <p>{lang}</p>
                            ))}
                        </Col>
                        <Col className="Info" sm={{ span: 8, offset: 1 }}>
                            <div className="More">
                                <h1> More About This User </h1>
                            </div><br/>
                            <Row>
                                <Col>
                                    <h5>Summary <TiDocumentText/> </h5>
                                    <p>{this.state.tutor.t_summary} </p>

                                    <h5>Overview <TiNews/> </h5>
                                    <p style={{ display: "block", wordWrap: "break-word", whiteSpace: "normal" }}> {this.state.tutor.t_overview} </p>

                                    <h5>Availability <TiCalendar/> </h5>
                                    {this.state.tutor.t_weekdays_day && <p>Weekdays during the Day</p>}
                                    {this.state.tutor.t_weekdays_eve && <p>Weekdays during the Evening</p>}
                                    {this.state.tutor.t_weekends && <p>Weekends</p>}
                                    {!this.state.tutor.t_weekdays_day &&
                                        !this.state.tutor.t_weekdays_eve &&
                                        !this.state.tutor.t_weekends &&
                                        <p>Contact Tutor for Availability</p>}

                                    <h5>Email <TiMail/> </h5>
                                    <p>{this.state.tutor.email} </p>

                                    <h5>Phone <TiPhone/> </h5>
                                    <p>{this.state.tutor.t_phone} </p>
                                </Col>
                                <Col>
                                    <h5>Offers <TiStarburstOutline/> </h5>
                                    <div className="offers">
                                        {this.state.mySubjects?.map(sub => (
                                            <p>
                                                <div style={{textAlign:"left", float:"left"}}>{sub}</div>
                                                <div style={{textAlign:"right", marginRight:"16px"}}>${this.state.myHourlyRate}/hr</div> 
                                                <div style={{textAlign:"left"}}>{this.state.myEducations.pop()}</div>
                                            </p>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(TutorInfo);