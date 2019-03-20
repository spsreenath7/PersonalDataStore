import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import ActivityList from './activities/activityList';
// import PhoneList from './components/phoneList'  src\datastore\activityAPI.js
import activityAPI from '../../datastore/activityAPI';
import CreateItem from './create/createItem';
import TransList from './finance/transList';



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
    
    console.log("Pers data tab");
    activityAPI.populate();
    // while(activityAPI.getAll.length === 0){
    // }
    setTimeout(2000);
    console.log("activityAPI.getAll.length " +activityAPI.getAll.length);
    this.setState({
      activeTab: '1'
    });
    console.log("after set state");
    

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

  editActivity = () => {
    this.setState({
      activeTab: '1'
    });
  };

  deleteActivity = () => {
    // console.log("inside delete");
    // activityAPI.delete(key);
    // console.log("after delete");
    
    this.setState({
      activeTab: '1'
    });
  };

  addActivity = () => {
    
    this.setState({
      activeTab: '1'
    });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    let activities = activityAPI.getAll();
    console.log("in perstab render");
    console.log(activities);
    return (
      <div>
        <CreateItem addActivity={this.addActivity}/>
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

  