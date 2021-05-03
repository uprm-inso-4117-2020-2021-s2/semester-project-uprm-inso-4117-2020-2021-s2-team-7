import React from "react";
import "./App.css";

class Nav extends React.Component {
  
  render(){

  return (
    <nav className="navBar">
  <table>
      <tr>
          <td><h1 className="title">TutorFinder</h1></td>
          <td><button>Join Now</button></td>
          <td><button>Sign In</button></td>
      </tr>
      </table>
      
    </nav>
  );
}
}

export default Nav;
