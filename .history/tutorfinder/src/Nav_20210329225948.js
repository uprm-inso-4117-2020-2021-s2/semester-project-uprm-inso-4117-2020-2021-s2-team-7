import React from "react";
import "./App.css";
import "./Nav.css"

class Nav extends React.Component {
  
  render(){

  return (
    <div className="">
  <table className="navBar">
      <tr>
          <td className="left"><h1 className="title">TutorFinder</h1></td>
         
          <td className="right "><div><button className="buttons buttonLetters ">Join Now</button></div>
          <div><button className="buttons buttonLetters">Sign In</button></div></td>
      </tr>
      </table>
      
    </div>
  );
}
}

export default Nav;
