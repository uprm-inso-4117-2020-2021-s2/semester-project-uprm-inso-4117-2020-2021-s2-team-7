import React from "react";
import "./App.css";
import "./Nav.css"

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render(){

  return (
    <div className="navspace">
                <table style={{ width: '100%', height: '100px' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '70%', verticalAlign: 'middle' }} onClick={() => this.props.onLogoClick()}>
                                <div className="navtext">
                                    TutorFinder
                                </div>
                            </td>
                            <td onClick={()=> this.props.onJoinNowClick()}>
                                <div className="boton" >
                                    Join Now
                                </div>
                            </td>
                            <td>
                                <div className="boton" onClick={() => this.props.onSignInClick()}>
                                    Sign In
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
  );
}
}

export default Nav;
