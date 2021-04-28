import React from 'react';
import './TutorBox.css';
import { withRouter } from "react-router-dom";

class TutorBox extends React.Component {

    constructor (props) {
        super(props);
    }

    clickOnContact() {
        this.props.history.push('/tutorInfo/'+this.props.tutorId);
    }

    render() {
        return (
            <div className="mainBox" key={'tutorbox' + this.props.tutorId}>
                <div className="tutorName">
                    {this.props.firstName}
                    <br/>{this.props.lastName}
                </div>
                <div className="tutorMain">
                    <div style={{paddingTop:"16px", textAlign:"center", fontSize: "20px"}}>
                        {this.props.nationality}
                    </div>
                    <div style={{paddingLeft:"112px", textAlign:"left", fontSize: "14px"}}>
                        {this.props.subject1}
                        <br/>{this.props.subject2}
                        <br/>{this.props.subject3}
                    </div>
                </div>
                <div className="tutorInfo">
                    <div className="tutorOverview">
                    {this.props.overview}
                    </div>
                    <div style={{textAlign:"center"}}>
                        <button className="contactButton" onClick={this.clickOnContact.bind(this)}>Contact Tutor</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TutorBox);
