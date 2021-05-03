import React from "react";
import "./App.css";
import "./Nav.css"

class Nav extends React.Component {
  
  render(){

  return (
    <div className="">
  <table className="navBar">
      <tr>
          <td><h1 className="title">TutorFinder</h1></td>
          <td><button className="buttons buttonLetters">Join Now</button></td>
          <td><button className="buttons buttonLetters">Sign In</button></td>
      </tr>
      </table>
      
    </div>
  );
}
}

export default Nav;
