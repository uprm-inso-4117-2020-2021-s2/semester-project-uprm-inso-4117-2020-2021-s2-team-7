import React from "react";
import "./App.css";

class Nav extends React.Component {
  
  render(){

  return (
    <div className="navBar">
  <table className="">
      <tr>
          <td><h1 className="title">TutorFinder</h1></td>
          <td><button>Join Now</button></td>
          <td><button>Sign In</button></td>
      </tr>
      </table>
      
    </div>
  );
}
}

export default Nav;
