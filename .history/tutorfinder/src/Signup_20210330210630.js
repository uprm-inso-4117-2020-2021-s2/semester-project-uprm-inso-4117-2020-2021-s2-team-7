import React from "react";
import "./App.css";
import "./Welcome.css"
import { Input, FormGroup, Label, Form, Container, Button, Col } from 'reactstrap';

class Signup extends React.Component {

  render() {

    return (
      <div className="signup">
        
          <Container className="fullWidth">
          <h1 className="">Signup</h1>
            <Form className=""  >
            
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
                <FormGroup inline>
                  <div className="text-left">
                    <Label >Name</Label>
                  </div>
             
                  <Input
                    type="name"
                    name="name"

                    id="exampleName"
                    placeholder="name"
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
              <div className="text-right">
       

                <Button color="danger" type="submit" className="buttons submit"  >Submit</Button>
              </div>
            </Form>
          
          </Container>



    

      </div>

    );
  }
}

export default Signup;
