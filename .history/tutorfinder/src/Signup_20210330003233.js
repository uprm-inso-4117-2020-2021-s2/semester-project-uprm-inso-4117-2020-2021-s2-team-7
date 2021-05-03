import React from "react";
import "./App.css";
import "./Welcome.css"
import { Input, FormGroup, Label, Form, Container, Button, Col} from 'reactstrap';

class Signup extends React.Component {
  
  render(){

  return (
    <div className="login">
        <h1 className="text-left">Signup</h1>
<div className="fullWidth">


<Container className="">

<Form className=""  >
  <br>
  </br>
          <Col className="">
            <FormGroup inline>
<div className="text-left">
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

          <Col className="">
            <FormGroup inline>
<div className="text-left">
              <Label >Name</Label>
              </div>
              <br></br>
              <Input
                type="name"
                name="name"
              
                id="exampleName"
                placeholder="name"
           className="size"
              />
            </FormGroup>
          </Col>

          <br></br>
          <Col className="">
            <FormGroup >
            <div className="text-left">
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
          <div className="text-right">
<br></br>
          
          <Button  color="danger" type="submit" className="buttons submit"  >Submit</Button>
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

export default Signup;
