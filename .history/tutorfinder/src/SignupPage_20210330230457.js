import React from "react";
import "./App.css";
import "./SignupPage.css"
import { Input, FormGroup, Label, Form, Container, Button, Col, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

class SignupPage extends React.Component {

  render() {

    return (
      <div className="container  ">
        
          <div className=" body center">
<br></br>
          <h1 className="">Signup</h1>
          <hr></hr>
          <div className="content center">
            <Form className=""  >

            <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >First Name</Label>
                  </div>
             
                  <Input
                    type="firstName"
                    name="firstName"

                    id="examplefirstName"
                    placeholder="firstName"
                    className="size"
                  />
                </FormGroup>
              </Col>

              <Col className="">
                <FormGroup inline>
                  <div className="text-left">
                    <Label >Last Name</Label>
                  </div>
             
                  <Input
                    type="lastName"
                    name="lastName"

                    id="examplelastName"
                    placeholder="lastName"
                    className="size"
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
                    placeholder="email"
                    className="size"
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
                    placeholder="contraseña"
                    className="size"
                  />
                </FormGroup>
              </Col>

              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Location</Label>
                  </div>
            
                  <Input
                    type="location"
                    name="location"

                    id="examplelocation"
                    placeholder="location"
                    className="size"
                  />
                </FormGroup>
              </Col>

              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Languages</Label>
                  </div>
            
                  <Input
                    type="language"
                    name="language"

                    id="examplelanguage"
                    placeholder="language"
                    className="size"
                  />
                </FormGroup>
              </Col>

              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Biograpy</Label>
                  </div>
            
                  <Input
                    type="biography"
                    name="biography"

                    id="examplebiography"
                    placeholder="Write a short introduction"
                    className="size"
                  />
                </FormGroup>
              </Col>

              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Experience</Label>
                  </div>
            
                  <Input
                    type="experience"
                    name="experience"

                    id="examplebexperience"
                    placeholder="experience"
                    className="size"
                  />
                </FormGroup>
              </Col>

              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Subjects</Label>
                  </div>
            
                  <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
          <option>Math</option>
          <option>English</option>
          <option>Spanish</option>
          <option>Science</option>
          <option>Social Studies</option>
        </Input>
                </FormGroup>
              </Col>

              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Rates</Label>
                  </div>
                  <Input placeholder="Dolla dolla billz yo!" />
                  <InputGroupAddon addonType="append">
          <InputGroupText>$</InputGroupText>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
                </FormGroup>
              </Col>

              <Col className="">
                <FormGroup >
                  <div className="text-left">
                    <Label for="">Availability</Label>
                  </div>
            
                  <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
          <option>Sunday</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </Input>
                </FormGroup>
              </Col>
              
              <div className="text-right">
       

                <Button color="danger" type="submit" className="buttons submit"  >Submit</Button>
              </div>
            </Form>
            </div>
          
          </div>

      </div>

    );
  }
}

export default SignupPage;
