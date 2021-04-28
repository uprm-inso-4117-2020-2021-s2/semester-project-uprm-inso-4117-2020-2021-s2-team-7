import React from 'react';
import './BulletinBoard.css';
import TutorBox from './TutorBox';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import axios from "axios";

const SERVER_URL = 'https://tutor-finder-server.herokuapp.com/tutorFinder/';
class BulletinBoard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            tutors: []
        }
    }

    componentDidMount() {
        this.getTutors();
    }

    async getTutors() {
        await axios.get(SERVER_URL + 'tutors').then(res => {
            console.log(res);
            this.setState({
                tutors: res.data
            })
        })
    }

    firstRowTutors() {
        return(
            this.state.tutors.map((tutor,i) => (
               (i < 3) &&
                    <TutorBox 
                    tutorId={tutor?.tid}
                    firstName={tutor?.t_first_name}
                    lastName={tutor?.t_last_name}
                    nationality={tutor?.t_nationality}
                    subject1={tutor?.subjects[0]?.s_name}
                    subject2={tutor?.subjects[1]?.s_name}
                    subject3={tutor?.subjects[2]?.s_name}
                    overview={tutor?.t_overview}
                />
            ))
        );
    }

    secRowTutors() {
        return(
            this.state.tutors.map((tutor,i) => (
               (i >= 3) && (i < 6) &&
                    <TutorBox
                    tutorId={tutor?.tid}
                    firstName={tutor?.t_first_name}
                    lastName={tutor?.t_last_name}
                    nationality={tutor?.t_nationality}
                    subject1={tutor?.subjects[0]?.s_name}
                    subject2={tutor?.subjects[1]?.s_name}
                    subject3={tutor?.subjects[2]?.s_name}
                    overview={tutor?.t_overview}
                />
            ))
        );
    }

    render() {
        return (
            <div className="mainBg">
                <div className="optionsBg">
                    <Select className="dropdownStyle" options={[]} placeholder="Subjects" isMulti />
                    <Select className="dropdownStyle" options={[]} placeholder="Locations" isMulti />
                    <button className="pageButton">Previous</button>
                    <button className="pageButton">Next</button>
                </div>
                <div className="boardBg">        
                    <div style={{display:"flex", flexDirection:"row"}}>
                        {this.firstRowTutors()}
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        {this.secRowTutors()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BulletinBoard);
