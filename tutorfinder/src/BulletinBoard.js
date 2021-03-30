import React from 'react';
import './BulletinBoard.css';
import TutorBox from './TutorBox';
import Select from 'react-select';

const Subjects = [
    {label: 'Calculus I', value: 'Calculus I'},
    {label: 'Physics', value: 'Physics'},
    {label: 'Geology', value: 'Geology'},
    {label: 'Biology', value: 'Biology'},
    {label: 'Chemistry', value: 'Chemistry'},
    {label: 'English', value: 'English'},
    {label: 'Spanish', value: 'Spanish'}
]

const Locations = [
    {label: 'San Juan', value: 'San Juan'},
    {label: 'Mayaguez', value: 'Mayaguez'},
    {label: 'Yauco', value: 'Yauco'},
    {label: 'San Germán', value: 'San Germán'},
    {label: 'Gurabo', value: 'Gurabo'},
    {label: 'Bayamón', value: 'Bayamón'}
]

function BulletinBoard() {
    return (
        <div className="mainBg">
            <div className="optionsBg">
                <Select className="dropdownStyle" options={Subjects} placeholder="Subjects" isMulti />
                <Select className="dropdownStyle" options={Locations} placeholder="Locations" isMulti />
            </div>
            <div className="boardBg">
                <div style={{paddingBottom:"10vh"}} />
                <div className="topRow" style={{display:"flex", flexDirection:"row"}}>
                    <TutorBox></TutorBox>
                    <TutorBox></TutorBox>
                    <TutorBox></TutorBox>
                </div>
                <div className="bottomRow" style={{display:"flex", flexDirection:"row"}}>
                    <TutorBox></TutorBox>
                    <TutorBox></TutorBox>
                    <TutorBox></TutorBox>
                </div>
            </div>
        </div>
    );
}

export default BulletinBoard;
