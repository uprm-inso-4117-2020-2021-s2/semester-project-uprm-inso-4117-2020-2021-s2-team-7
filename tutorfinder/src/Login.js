import React from "react";
import "./App.css";
import "./Welcome.css"
import { Input, FormGroup, Label, Form, Container, Button, Col } from 'reactstrap';
import { withRouter } from "react-router-dom";
import axios from "axios";

const SERVER_URL = 'https://tutor-finder-server.herokuapp.com/tutorFinder/';
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      email: "",
      password: ""
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const login = {
      email: this.state.email,
      password: this.state.password
    }

    let success = false;
    await axios.post(SERVER_URL + 'login', login).then(res => {
      console.log(res);
      localStorage.setItem('auth_token', res.data.token.token)
      success = true;
    });
    if(success) {
      this.props.history.push('/bulletin');
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  render() {

    return (
      <div className="login">
        <Container className="fullWidth">
          <h1 className="">Login</h1>
          <Form onSubmit={this.handleSubmit.bind(this)}>
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
            <div className="text-right">
              <Button color="danger" type="submit" className="buttons submit"  >Submit</Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
