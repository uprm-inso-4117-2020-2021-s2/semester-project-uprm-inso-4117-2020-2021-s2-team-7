import './TutorBox.css'

function TutorBox() {

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
