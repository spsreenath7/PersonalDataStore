import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import ActivityList from './activities/activityList';
// import PhoneList from './components/phoneList'  src\datastore\activityAPI.js
import activityAPI from '../../datastore/activityAPI';
import localCache from '../../datastore/localCache';
import activityCache from '../../datastore/activityCache';
import CreateItem from './create/createItem';
import TransList from './finance/transList';
import request from 'superagent';



export default class PersonalDataTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
    this.state = {
      activeTab: '1'
    };
  }
   componentDidMount() {

    // console.log('in profile component mount ' + this.props.usersid);
    
    // console.log("Pers data tab");
    // let temp =await activityAPI.populate();
    // while(activityAPI.getAll.length === 0){
    // }
    // setTimeout(2000);
    let userid=this.props.match.params.userid;
    let actsurl=`http://localhost:3001/activities?userid=${userid}`
    request.get(actsurl)
            .end((error, res) => {
                if (res) {
                  console.log("Sucess");
                    let acts = JSON.parse(res.text);
                    activityCache.populateActs(acts);
                    console.log(acts);
                    this.setState({time:Date.now()});
                } else {
                    console.log(error);
                }
            });
    // console.log("activityAPI.getAll.length " +activityAPI.getAll.length);
    // this.setState({
    //   activeTab: '1'
    // });
    // console.log("after set state");
    

  }

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('shouldComponentUpdate ');
//     return true;
//     // if (this.props.list.length === nextProps.list.length ) {
//     //     console.log('FALSE shouldComponentUpdate of FilteredFriendList')
//     //     return false ;
//     // } else {
//     //     console.log('TRUE shouldComponentUpdate of FilteredFriendList')
//     //     return true ;
//     // }     
// }

  editActivity = (act) => {
    let updateurl=`http://localhost:3001/activities/${act.id}`;
        request.put(updateurl).send(act).end((error, res) => {
            if (res) {
                console.log(" request success!");
                console.log(activityCache.update(act));
                this.setState({time:Date.now()});
            } else {
                console.log(error);
            }
        });
    // this.setState({
    //   activeTab: '1'
    // });
  };

  deleteActivity = (id) => {
    // console.log("inside delete");
    // activityAPI.delete(key);
    // console.log("after delete");
    let actsurl=`http://localhost:3001/activities/${id}`
    request.delete(actsurl).end((error, res) => {
            if (res) {
                console.log(" delete success!");
                // console.log(localCache.getAll());
                console.log("local delete!");
                activityCache.delete(id);
                console.log("after local delte!");
                // console.log(localCache.getAll());
                this.setState({time:Date.now()});
            } else {
                console.log(error);
            }
        });
    
    // this.setState({
      
    //   time:Date.now()
    // });
  };

  addActivity = (act) => {
    
    // let userid=this.props.match.params.userid;
    let addurl= `http://localhost:3001/activities/`;  //'http://localhost:3001/acts/';
        request.post(addurl).send(act).end((error, res) => {
            if (res) {
                console.log("addActivity request success!");
                activityCache.add(act);
                console.log(activityCache.getAll());
                this.setState({time:Date.now()});
            } else {
                console.log(error);
            }
        });
    // this.setState({
      
    // });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    
    let activities =activityCache.getAll();

    console.log("in perstab render");
    console.log(activities);
    return (
      <div>
        <CreateItem addActivity={this.addActivity} userid={this.props.match.params.userid}/>
        <Nav tabs>
          <NavItem className={this.state.activeTab === '1' ? 'active' : ''}>
            <NavLink
              onClick={() => { this.toggle('1'); }}
            >
              Activities
            </NavLink>
          </NavItem>
          <NavItem className={this.state.activeTab === '2' ? 'active' : ''}>
            <NavLink
              onClick={() => { this.toggle('2'); }}
            >
              Travel
            </NavLink>
          </NavItem>
          <NavItem className={this.state.activeTab === '3' ? 'active' : ''}>
            <NavLink
              onClick={() => { this.toggle('3'); }}
            >
              Finance
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ActivityList activities={activities}
            editHandler={this.editActivity}
            deleteHandler={this.deleteActivity} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
              {/* <ActivityList activities={activities}
            editHandler={this.editActivity}
            deleteHandler={this.deleteActivity} /> */}
            <TransList />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

  