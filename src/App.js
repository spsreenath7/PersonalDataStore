import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import '../node_modules/antd/dist/antd.css';

import logo from './logo.svg';
import './App.css';
import './footer.css';
import { Container, Row, Col } from 'reactstrap';

import Home from './components/home/userHome';
import fire from './config/Fire';
import Header from './header';
import {
  BrowserRouter, Route, Redirect, Switch, Link,
  withRouter
} from 'react-router-dom';
import userdetailAPI from './datastore/userdetail';
import localCache from './datastore/localCache';
import _ from 'lodash';
import cuid from 'cuid';
import request from 'superagent';

const usercurr = {
  isAuthenticated: false,
  // currentuserid: '',
  //   login() {
  //   this.isAuthenticated = true;
  //   },
  // // currentuser: {
  // //   userid: '',
  // //   name: '',
  // //   email: '',
  // //   gender: '',
  // //   contact: ''
  // // },
  // authenticate(useremail) {
  //   this.isAuthenticated = true;
  //   // this.currentuser = userdetailAPI.getUserByEmail(email);
  //   request.get('http://localhost:3001/userlookup')
  //     .end((error, res) => {
  //       if (res) {
  //         console.log("Sucess");
  //         let users = JSON.parse(res.text);
  //         // localCache.populate(acts);
  //         let index = _.findIndex(users,
  //           (user) => user.email === useremail
  //         );
  //         // let user =_.get(this.users, (user) => user.email === key);
  //         console.log(users[index])
  //         // let user = this.users[index];
  //           this.currentuserid=users[index].id;

  //       } else {
  //         console.log(error);
  //       }
  //     });
  //   console.log("In authenticate :");
  //   console.log(this.currentuserid);
  //   console.log(this.isAuthenticated);
  // setTimeout(cb, 100) // fake async
  // },
  signout() {
    this.isAuthenticated = false
    // setTimeout(cb, 100) // fake async
  },
  print() {
    console.log("In print : " + this.isAuthenticated);
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <div className="contant">
//           <Container>
//             <Row>
//             </Row>
//             <Row>
//               <Col sm="2"><LeftNavPan /></Col>
//               <Col sm="10"><PersonalDataTab /></Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//     );
//   }
// }

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    console.log("Inside private route ");
    // usercurr.print();

    return (
      <Route {...rest} render={(props) =>
        usercurr.isAuthenticated === true ?
          <Component {...props} /> :
          <Redirect to={
            {
              pathname: '/user/login',
              state: { from: this.props.location }
            }
          } />

      }
      />
    )
  }
}

export class About extends Component {
  render() {
    return <h2>About page: This is a personal data store</h2>
  }
}

export class Contact extends Component {
  render() {
    return <h2>Contact us at xyz@user.com</h2>
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      isAuthenticated: false,
      userid: '',
      email: '',
      password: '',
      authfailmsg: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    console.log("Inside Login");
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log()

      request.get('http://localhost:3001/userlookup')
        .end((error, res) => {
          if (res) {
            console.log("Sucess");
            let users = JSON.parse(res.text);
            // localCache.populate(acts);
            let index = _.findIndex(users,
              (user) => user.useremail === this.state.email
            );
            console.log(this.state.email);
            // let user =_.get(this.users, (user) => user.email === key);
            console.log(users);
            console.log(index);
            // let user = this.users[index];
            let currentuserid = users[index].id;
            let getuserurl = 'http://localhost:3001/users/' + currentuserid;


            request.get(getuserurl).end((error, res) => {
              if (res) {
                console.log(" request success! added in users");
                let user = JSON.parse(res.text);
                localCache.populateUser(user);
                console.log(user);
                console.log(localCache.getUser());
                usercurr.isAuthenticated = true;
                this.setState({
                  isAuthenticated: true,
                  userid: currentuserid
                });

              } else {
                console.log(error);
              }
            });

          } else {
            console.log(error);
          }
        });

    }).catch((error) => {
      console.log(error);
      this.setState({ authfailmsg: 'Incorrect credintials !!' });
    });

  }

  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      let newuserid = cuid();
      let newuserlookup = {
        id: newuserid,
        useremail: this.state.email
      }
      let newuser = {
        id: newuserid,
        profile: {
          name: this.state.username,
          email: this.state.email,
          gender: '',
          contact: ''
        }
      }
      let adduserlookupurl = 'http://localhost:3001/userlookup/';
      let adduserurl = 'http://localhost:3001/users/';


      request.post(adduserlookupurl).send(newuserlookup).end((error, res) => {
        if (res) {
          console.log(" request success! added in lookup");

          request.post(adduserurl).send(newuser).end((error, res) => {
            if (res) {
              console.log(" request success! added in users");
              // let user = JSON.parse(res.text);
                localCache.populateUser(newuser);
              usercurr.isAuthenticated = true;
              this.setState({
                isAuthenticated: true,
                userid: newuser.id
              });
              // this.setState({time:Date.now()});
            } else {
              console.log(error);
            }
          });
          // this.setState({time:Date.now()});
        } else {
          console.log(error);
        }
      });

      // userdetailAPI.add(this.state.username, this.state.email, '', '');
      // console.log("After add");
      // usercurr.authenticate(this.state.email);

    }).then((u) => { console.log(u) })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    if (this.state.isAuthenticated === true) {
      console.log('redirecting to home page ');
      const homePath = `/home/${this.state.userid}/`
      console.log(homePath);
      return (<Redirect to={homePath} />)
    }


    return (
      <div>
        <div id="loginpg">
          <form >
            {
              this.props.match.params.page === 'login' ? '' :
                <div class="form-group" id="logform">
                  <label for="username1">Name </label>
                  <input value={this.state.username} onChange={this.handleChange} type="text" name="username" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Your name" />

                </div>
            }

            <div class="form-group" id="logform">
              <label for="exampleInputEmail1">Email address</label>
              <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
              <small id="emailHelp" class="form-text">{this.state.authfailmsg}</small>
            </div>
            {
              this.props.match.params.page === 'login' ?
                <button type="submit" onClick={this.login} class="btn btn-primary">Login</button> :
                <button onClick={this.signup} className="btn btn-success">Signup</button>
            }

          </form>
        </div>

      </div>

    );
  }
}

class Footer extends Component {
  render() { 
    return ( 
          <footer className="footer">
              <small>
          The <a href="https://facebook.github.io/react/">ReactJS library</a>
          by <a href="https://www.facebook.com/">Facebook</a>
              </small>
              <nav>
                  <ul>
                      <li><Link to="/contact">Contact Us</Link></li>
                      <li><Link to="/">About</Link></li>
                      
                      
                  </ul>
              </nav>
          </footer>
    )
  }
}


class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header auth={usercurr.isAuthenticated} />
          <div className="container contants">
            <Switch>
              <Route path='/user/:page' component={Login} />
              <PrivateRoute exact path='/home/:userid/*' component={Home} />
              <Route exact path='/' component={About} />
              <Route exact path='/contact' component={Contact} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router;
