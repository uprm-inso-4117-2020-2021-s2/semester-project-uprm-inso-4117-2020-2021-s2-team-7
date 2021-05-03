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

{this.state.isLoginVisible && (<Login goToRegister={this.goToRegister.bind(this)}></Login>)}
          {!this.state.isLoginVisible && (<Signup goToLogin={this.goToLogin.bind(this)}></Signup>)}

 {/* <Search/> */}
 {/* <Login/> */}
 <Signup/>
  
    </div>
  );
}
}

export default Welcome;
