import './TutorBox.css'
const axios = require('axios');
const API_URL = 'https://tutor-finder-server.herokuapp.com/tutorFinder/';

function TutorBox() {

{ /* state = {
    tutors: []
  }

  componentDidMount() {
    const url = '${API_URL}/tutors/0';
    axios.get(url).then(response => response.data)
    .then((data) => {
        this.setState({ users: data })
        console.log(this.state.users)
    });
  }
*/
}

    return (
        <div className="mainBox">
            <div className="tutorImg"></div>
            <div className="tutorMain" style={{textAlign:"end", padding:"12px", fontSize:"20px"}}>
                <br/>Estefanía
                <br/>$00/hr
            </div>
            <div className="tutorInfo" style={{textAlign:"justify", paddingRight:"16px", paddingLeft:"16px", fontSize:"12px"}}>
                Hi, I'm an Imperial College graduate now currently a 
                Masters student tutoring in Maths and Sciences.
                <button className="contactButton">Contact Tutor</button>
            </div>
        </div>
    );
}

export default TutorBox;
