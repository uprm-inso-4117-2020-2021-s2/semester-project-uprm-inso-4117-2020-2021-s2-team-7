import React from "react";
import "./App.css";
import "./Welcome.css"
import foto from "./assets/bg.png" 

class Welcome extends React.Component {
  
  render(){

  return (
    <div className="background">
 
 <div className="everything">
 <div className="square">
<h1>Find the best tutor for you</h1>
<p></p>
 </div>

 <div className="">
<input type="text" className="search"></input>
 </div>
 </div>
      
    </div>
  );
}
}

export default Welcome;
