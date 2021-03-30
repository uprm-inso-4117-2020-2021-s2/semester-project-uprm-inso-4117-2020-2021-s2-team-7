import React from "react";
import "./App.css";
import "./Welcome.css"
import { Input, FormGroup, Label, Form, Container, Button, Col} from 'reactstrap';

class Login extends React.Component {
  
  render(){

  return (
    <div className="login">

<br>
      </br>

<Container className="">

<Form className=""  >
  <br>
  </br>
          <Col className="">
            <FormGroup inline>
              <Label >Email</Label>
              <Input
                type="email"
                name="email"
              
                id="exampleEmail"
                placeholder="email"
           
              />
            </FormGroup>
          </Col>
          <Col className="izq">
            <FormGroup >
              <Label for="">Password</Label>
              <Input
                type="password"
                name="password"
               
                id="examplePassword"
                placeholder="contraseña"
              
              />
            </FormGroup>
          </Col>
          <div className="text-right">

          
          <Button  color="danger" type="submit"  >Submit</Button>
          </div>
        </Form>
<br>
</br>
      </Container>

    


  
    </div>

  );
}
}

export default Login;
