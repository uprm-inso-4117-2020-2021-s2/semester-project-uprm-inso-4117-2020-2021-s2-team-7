import React from 'react';
import './TutorBox.css';
import { withRouter } from "react-router-dom";
import axios from "axios";

const SERVER_URL = 'https://tutor-finder-server.herokuapp.com/tutorFinder/';

class TutorBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allSubjectsId: [],
            allSubjectsName: [],
            changes: false,
            mySubjects: []
        }
    }

    clickOnContact() {
        this.props.history.push('/tutorInfo/' + this.props.tutorId);
    }

    componentDidMount() {
        this.getListSubjects();
    }

    async getListSubjects() {
        await axios.get(SERVER_URL + 'subjects').then(res => {
            console.log(res);
            res.data.map(sub => {
                this.state.allSubjectsId.push(sub.sid);
                this.state.allSubjectsName.push(sub.s_name);
            });
            
        });
        console.log(this.props.subjectArr);
        this.props.subjectArr?.forEach(id => {
            console.log(id);
            const index = this.state.allSubjectsId?.indexOf(id);
            console.log(this.state.allSubjectsName[index]);
            this.state.mySubjects.push(this.state.allSubjectsName[index]);
        });
        this.setState({ changes: true });
    }

    render() {
        return (
            <div className="mainBox" key={'tutorbox' + this.props.tutorId}>
                <div className="tutorName">
                    {this.props.firstName}
                    <br />{this.props.lastName}
                </div>
                <div className="tutorMain">
                    <div style={{ paddingTop: "16px", textAlign: "center", fontSize: "20px" }}>
                        {this.props.nationality}
                    </div>
                    {this.state.mySubjects.map((sub, i) => (
                        (i<3) && <div style={{ paddingLeft: "112px", textAlign: "left", fontSize: "14px", lineHeight:'14px' }}>
                            <br />{sub}
                        </div>
                    )
                    )}
                    
                </div>
                <div className="tutorInfo">
                <br/>
                    <div className="tutorOverview">
                        {this.props.overview}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button className="contactButton" onClick={this.clickOnContact.bind(this)}>Contact Tutor</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TutorBox);
