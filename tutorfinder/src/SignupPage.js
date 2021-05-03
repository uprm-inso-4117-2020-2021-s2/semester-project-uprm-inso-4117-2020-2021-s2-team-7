import React from "react";
import "./App.css";
import "./SignupPage.css";
import { Input, FormGroup, Label, Form, Button, Col } from 'reactstrap';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Select from 'react-select';

const SERVER_URL = 'https://tutor-finder-server.herokuapp.com/tutorFinder/';

const modalityOptions =  [{value: 'online', label:'online'}, {value: 'in person', label: 'in person'}];
class SignupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
      phoneNumber: '',
      nationality: '',
      summary: '',
      overview: '',
      subjects: [],
      checkedSubjects: [],
      change: false,
      weekdays_day: false,
      weekdays_eve: false,
      weekends: false,
      modality: 'online',
      educOptions: [],
      educId: '',
      rate: 0
    }
  }

  componentDidMount() {
    this.getSubjects();
    this.getEducOptions();
  }

  async getSubjects() {
    await axios.get(SERVER_URL + 'subjects').then(res => {
      console.log(res);
      res.data.forEach(inf => {
        this.state.subjects.push(inf)
      })
    })
    this.setState({change: true});
  }

  async getEducOptions() {
    await axios.get(SERVER_URL +'levelOfEducations').then(res => {
        console.log(res);
        res.data.map(educ => {
            const new_educ = {
                value: educ.leid,
                label: educ.le_name
            }
            this.state.educOptions.push(new_educ);
        });
        this.setState({
            change: true
        })
    })
}

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value })
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleConfirmPassChange(e) {
    this.setState({ confirm_password: e.target.value })
  }

  handlePhoneChange(e) {
    this.setState({ phoneNumber: e.target.value })
  }

  handleNationalityChange(e) {
    this.setState({ nationality: e.target.value })
  }

  handleSummaryChange(e) {
    this.setState({ summary: e.target.value })
  }

  handleOverviewChange(e) {
    this.setState({ overview: e.target.value })
  }
  handleRateChange(e) {
    this.setState({ rate: e.target.value })
  }

  handleSubjectsCheck(e) {
    console.log(e.target.id);
    const checked = e.target.checked
    if (checked && !this.state.checkedSubjects.includes(e.target.id)) {
      this.state.checkedSubjects.push(e.target.id);
    }
    if(!checked){
      const index = this.state.checkedSubjects.indexOf(e.target.id);
      if(index > -1){
        this.state.checkedSubjects.splice(index, 1);
      }
    }
    console.log(this.state.checkedSubjects);
  }

  handleModalityChange(e) {
    console.log(e);
    this.setState({modality: e.value});

  }

  handleEducChange(e) {
    console.log(e);
    this.setState({educId: e.value});
  }

  handleWeekdaysDayCheck(e) {
    const checked = e.target.checked
    this.setState({ weekdays_day: checked })
  }

  handleWeekdaysEveCheck(e) {
    const checked = e.target.checked
    this.setState({ weekdays_eve: checked })
  }

  handleWeekendsCheck(e) {
    const checked = e.target.checked
    this.setState({ weekends: checked })
  }

  async handleSubmit(e) {
    e.preventDefault();

    let login = {
      email: this.state.email,
      password: this.state.password
    }
    let tutor = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.confirm_password,
      tfirst_name: this.state.firstName,
      tlast_name: this.state.lastName,
      tphone: this.state.phoneNumber,
      tnationality: this.state.nationality,
      tage: 0,
      tsummary: this.state.summary,
      toverview: this.state.overview,
      t_weekdays_day: this.state.weekdays_day,
      t_weekdays_eve: this.state.weekdays_eve,
      t_weekends: this.state.weekends,
    }
    let tutorId;
    let success =false;
    await axios.post(SERVER_URL + 'register', tutor).then(res => {
      console.log(res);
      tutorId = res.data.tutor.tid;
    });
    await axios.post(SERVER_URL + 'login', login).then(res => {
      console.log(res);
      localStorage.setItem('auth_token', res.data.token.token);
      success = true;
    });
    this.state.checkedSubjects.forEach(subjectId => {
      let new_obj = {
        subject_id: subjectId,
        tutor_id: tutorId,
        modality: this.state.modality,
        level_of_education_id: this.state.educId,
        hourly_rate: this.state.rate
      }
      axios.post(SERVER_URL + 'offers', new_obj, { headers: {"Authorization" : `Bearer ${localStorage.getItem('auth_token')}`}}).then(res => console.log(res));
    });
    if(success) {
      this.props.history.push('/bulletin');
    }
  }

  render() {
    return (
      <div className="container">
        <div className=" body center">
          <br />
          <div className="head">
            <h1 className="">Signup</h1>
            <hr />
          </div>
          <div className="content center scroll ">
            <Form className="" onSubmit={this.handleSubmit.bind(this)}>
              <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >First Name</Label>
                  </div>
                  <Input
                    type="text"
                    name="t_first_name"
                    id="t_first_name"
                    placeholder="First Name"
                    className="size"
                    onChange={this.handleFirstNameChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >Last Name</Label>
                  </div>
                  <Input
                    type="text"
                    name="t_last_name"
                    id="t_last_name"
                    placeholder="Last Name"
                    className="size"
                    onChange={this.handleLastNameChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >Email</Label>
                  </div>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email"
                    className="size"
                    onChange={this.handleEmailChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Password</Label>
                  </div>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Password"
                    className="size"
                    onChange={this.handlePasswordChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Confirm password</Label>
                  </div>
                  <Input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="Confirm password"
                    className="size"
                    onChange={this.handleConfirmPassChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >Phone Number</Label>
                  </div>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    className="size"
                    onChange={this.handlePhoneChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Location</Label>
                  </div>
                  <Input
                    type="text"
                    name="t_nationality"
                    id="t_nationality"
                    placeholder="Location"
                    className="size"
                    onChange={this.handleNationalityChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Short Description</Label>
                  </div>
                  <Input
                    type="text"
                    name="t_summary"
                    id="t_summary"
                    placeholder="Write a short introduction"
                    className="size"
                    onChange={this.handleSummaryChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Overview</Label>
                  </div>
                  <Input
                    type="text"
                    name="t_overview"
                    id="t_overview"
                    placeholder="Overview of what you can offer as a tutor"
                    className="size"
                    onChange={this.handleOverviewChange.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Subjects</Label>
                  </div>
                  <div style={{ height: '200px', scrollbarColor: 'blue', overflowY: 'scroll', backgroundColor:'white', borderRadius:'5px' }}>
                    {this.state.subjects.map(subject =>
                      (
                        <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                          <input type="checkbox" name={subject.s_name} id={subject.sid} key={subject.sid} onChange={this.handleSubjectsCheck.bind(this)} />
                          <label>&nbsp;{subject.s_name}</label>
                        </div>
                      )
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >Level of Education</Label>
                    <Select
                    className="dropdw"
                    placeholder="Modality"
                    options={this.state.educOptions}
                    isMulti={false}
                    onChange={this.handleEducChange.bind(this)}
                  />
                  </div>
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >Modality</Label>
                    <Select
                    className="dropdw"
                    placeholder="Modality"
                    options={modalityOptions}
                    isMulti={false}
                    onChange={this.handleModalityChange.bind(this)}
                  />
                  </div>
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >Hourly Rate</Label>
                    <Input
                    type="number"
                    name="rate"
                    id="rate"
                    placeholder="Indicate hourly rate"
                    className="size"
                    onChange={this.handleRateChange.bind(this)}
                  />
                  </div>
                </FormGroup>
              </Col>
              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Availability</Label>
                  </div>
                  <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                    <Input type="checkbox" name="weekdays_day" id="weekdays_day" onChange={this.handleWeekdaysDayCheck.bind(this)}/>
                    <label>Weekdays during the day</label>
                  </div>
                  <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                    <Input type="checkbox" name="weekdays_eve" id="weekdays_eve" onChange={this.handleWeekdaysEveCheck.bind(this)}/>
                    <label>Weekdays during the evening</label>
                  </div>
                  <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                    <Input type="checkbox" name="weekends" id="weekends" onChange={this.handleWeekendsCheck.bind(this)}/>
                    <label>Weekends</label>
                  </div>
                </FormGroup>
              </Col>
              <div className="text-right">
                <Button color="danger" type="submit" className="text-right">Done</Button>
              </div>
            </Form>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupPage);
