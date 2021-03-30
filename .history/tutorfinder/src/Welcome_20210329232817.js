import React from "react";
import "./App.css";
import "./Welcome.css"
import foto from "./assets/bg.png" 

class Welcome extends React.Component {
  
  render(){

  return (
    <div className="background">
 
 <div className="square">
<h1>Find the best tutor for you</h1>
<p></p>
 </div>

 <div className="search">
<input type="text"></input>
 </div>
      
    </div>
  );
}
}

export default Welcome;
