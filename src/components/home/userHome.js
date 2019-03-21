import React, { Component } from 'react';
import PersonalDataTab from '../personaldata/personalDataTab';
import Profile from '../profile';
import { Container, Row, Col } from 'reactstrap';
import {
    BrowserRouter, Route, Redirect, Switch, Link, Router, NavLink,
    withRouter
} from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import './user.css';



class Welcome extends Component {
    render() {
        return <h2>Welcome dear user !!</h2>
    }
}

class Home extends Component {


    render() {
        
    const userid=this.props.match.params.userid;
    // const homePath = this.props.match.url;
    const homePath = `/home/${userid}/`;
    const profilePath = `/home/profile/`;
    const pdsPath = `/home/pds/`;
    const privacyPath = `/home/privacy/`;
    console.log('In Home ' +userid);
    console.log('URL : '+ this.props.match.url);
        return (
            <Container>
                    <Row>
                    
                        <Col sm="2">
                        <div class="hometab">
                             <Nav vertical>
                                <NavItem>
                                    <NavLink exact to={`${homePath}`}><span class="tabtext "> Home</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink exact to={`${homePath}profile`}><span class="tabtext"> Profile</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink exact to={`${homePath}pds`}><span class="tabtext"> PersonalData</span></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink exact to={`${homePath}privacy`}><span class="tabtext"> PrivacyDashboard</span></NavLink>
                                </NavItem>
                            </Nav> 
                            
                            </div>
                        </Col>
                     
                        <Col sm="10">
                            <Switch>
                                <Route exact path='/home/:userid/' component={Welcome} />
                                <Route exact path='/home/:userid/profile' component={Profile} />
                                <Route exact path='/home/:userid/pds' component={PersonalDataTab} />
                                <Route exact path='/home/:userid/privacy' component={Welcome} />
                                <Redirect from='*' to={`${homePath}`} />
                            </Switch>
                            
                        </Col> 
                                                {/* <Col sm="10">
                            <Switch>
                                <Route exact path='/home/:userid/' component={PersonalDataTab} />
                                <Route exact path='/home/:userid/profile' component={Profile} />
                                <Route exact path='/home/:userid/pds' component={PersonalDataTab} />
                                <Route exact path='/home/:userid/privacy' component={Profile} />
                                <Redirect from='*' to={`${homePath}`} />
                            </Switch>
                            
                        </Col> */}

                    </Row>
                </Container>
            
                // <Container>
                //     <Row>
                    
                //         <Col sm="2">
                //         <div class="hometab">
                //              <Nav vertical>
                //                 <NavItem>
                //                     <NavLink exact to={homePath}><span class="tabtext "> Home</span></NavLink>
                //                 </NavItem>
                //                 <NavItem>
                //                     <NavLink exact to={profilePath}><span class="tabtext"> Profile</span></NavLink>
                //                 </NavItem>
                //                 <NavItem>
                //                     <NavLink exact to={pdsPath}><span class="tabtext"> PersonalData</span></NavLink>
                //                 </NavItem>
                //                 <NavItem>
                //                     <NavLink exact to={privacyPath}><span class="tabtext"> PrivacyDashboard</span></NavLink>
                //                 </NavItem>
                //             </Nav> 
                            
                //             </div>
                //         </Col>
                        
                //         <Col sm="10">
                //             <Switch>
                //                 <Route exact path='/home/pds/' component={PersonalDataTab} />
                //                 <Route exact path='/home/profile/' 
                //                 render={ (props) => <Profile {...props} usersid={userid} /> } />
                //                 <Route exact path='/home/privacy/' component={PersonalDataTab} />
                //                 <Route exact path='/home/:userid/' component={Welcome} />
                //                 <Redirect from='*' to='/home/' />
                //             </Switch>
                            
                //         </Col>

                //     </Row>
                // </Container>
            
        );
    }
}

export default withRouter(Home);