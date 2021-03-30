import React from "react";
import "./App.css";
import "./Welcome.css"
import foto from "./assets/bg.png" 
import Search from "./Search";
import Login from "./Login";
import Signup from "./Signup";

class Welcome extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
          isLoginVisible: true
        }
      }
    
      goToRegister(){
        this.setState({
          isLoginVisible: false
        })
      }
    
      goToLogin(){
        this.setState({
          isLoginVisible: true
        })
      }
    

  render(){

  return (
    <div className="background">


 {/* <Search/> */}
 {/* <Login/> */}
 <Signup/>
  
    </div>
  );
}
}

export default Welcome;
