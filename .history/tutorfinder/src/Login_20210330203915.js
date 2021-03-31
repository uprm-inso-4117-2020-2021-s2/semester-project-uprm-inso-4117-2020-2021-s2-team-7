import React from "react";
import "./App.css";
import "./Welcome.css"
import { Input, FormGroup, Label, Form, Container, Button, Col } from 'reactstrap';

class Login extends React.Component {

  render() {

    return (
      <div className="login">
        <h1 className="">Login</h1>
        <div className="">
          <Container>
            <Form>
              <br>
              </br>
              <Col className="">
                <FormGroup inline>
                  <div className="">
                    <Label >Email</Label>
                  </div>
                  <br></br>
                  <Input
                    type="email"
                    name="email"

                    id="exampleEmail"
                    placeholder="email"
                    className="size"
                  />
                </FormGroup>
              </Col>
              <br></br>
              <Col className="">
                <FormGroup >
                  <div className="">
                    <Label for="">Password</Label>
                  </div>
                  <br></br>
                  <Input
                    type="password"
                    name="password"

                    id="examplePassword"
                    placeholder="contraseña"
                    className="size"
                  />
                </FormGroup>
              </Col>
              <div className="">
                <br></br>

                <Button color="danger" type="submit" className="buttons submit"  >Submit</Button>
              </div>
            </Form>
            <br>
            </br>
          </Container>
        </div>
      </div>
    );
  }
}

export default Login;
