import React from "react";
import "./App.css";
import "./Welcome.css"
import { Input, FormGroup, Label, Form, Container, Button, Col} from 'reactstrap';

class Login extends React.Component {
  
  render(){

  return (
    <div className="everything">

<br>
      </br>

<Container className="">

<Form className="" onSubmit={handleSubmit} >
  <br>
  </br>
          <Col className="">
            <FormGroup inline>
              <Label >Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                id="exampleEmail"
                placeholder="email"
                onChange={handleEmailChange}
              />
            </FormGroup>
          </Col>
          <Col className="izq">
            <FormGroup >
              <Label for="">Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                id="examplePassword"
                placeholder="contraseña"
                onChange={handlePasswordChange}
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

      <br>


  
    </div>
  );
}
}

export default Login;
