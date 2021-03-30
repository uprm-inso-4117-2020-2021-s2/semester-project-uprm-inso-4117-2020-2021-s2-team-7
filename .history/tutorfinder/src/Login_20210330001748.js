import React from "react";
import "./App.css";
import "./Welcome.css"
import { Input, FormGroup, Label, Form, Container, Button, Col} from 'reactstrap';

class Login extends React.Component {
  
  render(){

  return (
    <div className="login">
<div className="fullWidth">
<br>
      </br>

<Container className="">

<Form className=""  >
  <br>
  </br>
          <Col className="">
            <FormGroup inline>
              <Label >Email</Label>
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
              <Label for="">Password</Label>
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
          
          <Button  color="danger" type="submit"  >Submit</Button>
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
