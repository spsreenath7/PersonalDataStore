import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import '../node_modules/antd/dist/antd.css';

import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

import Home from './components/home/userHome';
import fire from './config/Fire';
import Header from './header';
import {
  BrowserRouter, Route, Redirect, Switch, Link,
  withRouter
} from 'react-router-dom';
import userdetailAPI from './datastore/userdetail';

const usercurr = {
  isAuthenticated: false,
  currentuser: {
    userid: '',
    name: '',
    email: '',
    gender: '',
    contact: ''
  },
  authenticate(email) {
    this.isAuthenticated = true;
    this.currentuser = userdetailAPI.getUserByEmail(email);
    console.log("In authenticate :");
    console.log(this.currentuser);
    console.log(this.isAuthenticated);
    // setTimeout(cb, 100) // fake async
  },
  signout() {
    this.isAuthenticated = false
    // setTimeout(cb, 100) // fake async
  },
  print(){
    console.log("In print : "+this.isAuthenticated);
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
    console.log("Inside private route " );
    usercurr.print();

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
    return <h2>About page</h2>
  }
}

export class Inbox extends Component {
  render() {
    return <h2>Inbox page</h2>
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      username: '',
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
      usercurr.authenticate(this.state.email);
       this.setState({});
    }).catch((error) => {
      console.log(error);
      this.setState({ authfailmsg: 'Incorrect credintials !!' });
    });
  }

  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      userdetailAPI.add(this.state.username,this.state.email,'','');
      console.log("After add");
      usercurr.authenticate(this.state.email);
      this.setState({});
    }).then((u) => { console.log(u) })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    if (usercurr.isAuthenticated === true) {
      console.log( 'redirecting to home page ');
      const homePath = `/home/${usercurr.currentuser.userid}/`
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
              <Redirect from='*' to='/user/login' />
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    )
  }
}
 
export default Router;
