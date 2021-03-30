import React from "react";
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function Home() {
    return (
        <body>
            <div className="navspace">
                <table style={{ width: '100%', height: '100px' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '70%', verticalAlign: 'middle' }}>
                                <div className="navtext">
                                    TutorFinder
                                </div>
                            </td>
                            <td>
                                <div className="boton">
                                    Join Now
                                </div>
                            </td>
                            <td>
                                <div className="boton">
                                    Sign In
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ width: "100%", paddingTop: "30%" }}>
                <div className="box">
                    <div className="boxTitle">
                        Find the Best Tutor for You</div>
                    <div className="boxText">
                        Select from an ample catalog of tutors so you too <br></br>
                        can improve your academic performance</div>
                </div>
                <div style={{ width: '40%', marginLeft:'30%', marginTop: '8px' }}>

                    <form action="">
                        <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <button id="button-addon2" type="submit" class="btn btn-link text-warning" style={{width:'40px'}}><i class="fa fa-search"></i></button>
                                </div>
                                <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon2" class="form-control border-0 bg-light" style={{marginRight:'10px'}} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default Home;