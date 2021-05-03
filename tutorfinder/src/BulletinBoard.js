import React from 'react';
import './BulletinBoard.css';
import TutorBox from './TutorBox';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import axios from "axios";

const SERVER_URL = 'https://tutor-finder-server.herokuapp.com/tutorFinder/';
class BulletinBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tutors: [],
            subjectOptions: [],
            educOptions: [],
            changes: false,
            filteredTutors: []
        }
    }

    componentDidMount() {
        this.getTutors();
        this.getSubjectOptions();
        this.getEducOptions();
    }

    async getTutors() {
        await axios.get(SERVER_URL + 'tutors').then(res => {
            console.log(res);
            this.setState({
                tutors: res.data,
            })
        })
    }

    async getSubjectOptions() {
        await axios.get(SERVER_URL + 'subjects').then(res => {
            console.log(res);
            res.data.map(sub => {
                const new_obj = {
                    value: sub.sid,
                    label: sub.s_name
                }
                this.state.subjectOptions.push(new_obj);
            });
            this.setState({ changes: true });
        });
    }

    async getEducOptions() {
        await axios.get(SERVER_URL + 'levelOfEducations').then(res => {
            console.log(res);
            res.data.map(educ => {
                const new_educ = {
                    value: educ.leid,
                    label: educ.le_name
                }
                this.state.educOptions.push(new_educ);
            });
            this.setState({
                changes: true
            })
        })
    }

    getSubjectArrByTutor(tutor) {
        const subArr = []
        tutor.offers.map(off => {
            subArr.push(off.subject_id);
        })
        console.log(subArr);
        return subArr
    }

    firstRowTutors() {
        console.log(this.state.filteredTutors)
        if (this.state.filteredTutors.length > 0) {
            return (
                this.state.filteredTutors.map((tutor, i) => (
                    (i < 3) &&
                    <TutorBox
                        tutorId={tutor?.tid}
                        firstName={tutor?.t_first_name}
                        lastName={tutor?.t_last_name}
                        nationality={tutor?.t_nationality}
                        overview={tutor?.t_overview}
                        subjectArr={this.getSubjectArrByTutor(tutor)}
                    />
                ))
            );
        } else {
            return (
                this.state.tutors.map((tutor, i) => (
                    (i < 3) &&
                    <TutorBox
                        tutorId={tutor?.tid}
                        firstName={tutor?.t_first_name}
                        lastName={tutor?.t_last_name}
                        nationality={tutor?.t_nationality}
                        overview={tutor?.t_overview}
                        subjectArr={this.getSubjectArrByTutor(tutor)}
                    />
                ))
            );
        }
    }

    secRowTutors() {

        if (this.state.filteredTutors.length > 0) {
            return (
                this.state.filteredTutors.map((tutor, i) => (
                    (i >= 3) && (i < 6) &&
                    <TutorBox
                        tutorId={tutor?.tid}
                        firstName={tutor?.t_first_name}
                        lastName={tutor?.t_last_name}
                        nationality={tutor?.t_nationality}
                        overview={tutor?.t_overview}
                        subjectArr={this.getSubjectArrByTutor(tutor)}
                    />
                ))
            );
        } else {
            return (
                this.state.tutors.map((tutor, i) => (
                    (i >= 3) && (i < 6) &&
                    <TutorBox
                        tutorId={tutor?.tid}
                        firstName={tutor?.t_first_name}
                        lastName={tutor?.t_last_name}
                        nationality={tutor?.t_nationality}
                        overview={tutor?.t_overview}
                        subjectArr={this.getSubjectArrByTutor(tutor)}
                    />
                ))
            );
        }
    }

    handleSubjectOptionChange(e) {
        // e.preventDefault();
        let temp = [];
        console.log(e);
        this.state.tutors.map(tut => {
            let hasSubject = false;
            tut.offers.map(off => {
                if (e.value == off.subject_id) {
                    hasSubject = true;
                }
            });
            if (hasSubject) {
                temp.push(tut);
            }
        });
        if (e.value) {
            this.setState({
                filteredTutors: temp
            })
        } else {
            this.setState({
                filteredTutors: []
            })
        }
        console.log(this.state.filteredTutors);
    }

    render() {
        return (
            <div className="mainBg">
                <div className="optionsBg">
                    <Select className="dropdownStyle" options={this.state.subjectOptions} placeholder="Subjects" onChange={this.handleSubjectOptionChange.bind(this)} />
                    <Select className="dropdownStyle" options={this.state.educOptions} placeholder="Level of Education" isMulti />
                    {/* <button className="pageButton">Previous</button>
                    <button className="pageButton">Next</button> */}
                </div>
                <div className="boardBg">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {this.firstRowTutors()}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {this.secRowTutors()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BulletinBoard);
