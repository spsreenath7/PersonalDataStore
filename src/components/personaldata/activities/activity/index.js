import React from 'react';
import { Modal } from 'antd';
import './activity.css';
import { Col, Row, Form, FormGroup, Label, Input, FormText, Table, CustomInput ,Button, Badge} from 'reactstrap';
// import DatePicker from "react-datepicker";
import activityDetail from '../../../../datastore/activityAPI';



export default class Activity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: '',
      visible: false,
      id: this.props.activity.id,
      userid: this.props.activity.userid,
      title: this.props.activity.title,
      url: this.props.activity.url,
      date: this.props.activity.date,
      catogery: this.props.activity.catogery ,
      privacy: this.props.activity.privacy ,
      previousDetails: {
        // id: this.props.activity.id,
        title: this.props.activity.title,
        url: this.props.activity.url,
        date: this.props.activity.date,
        catogery: this.props.activity.catogery ,
        privacy: this.props.activity.privacy 
      }
      
    };
    
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    console.log("In handleChange  " +e.target.name + " : "+ e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleSave = () => {
    
    console.log("In handleSave status : " );
    console.log(this.state);

    let updatedTitle = this.state.title.trim();
    let updatedurl = this.state.url.trim();
    let updateddate = this.state.date.trim();
    let updatedcatogery = this.state.catogery.trim();

    console.log("Catogery before update :" +updatedcatogery);
    
    let updatedact ={
      id: this.props.activity.id,
      userid: this.props.activity.userid,
      title: updatedTitle,
      url: updatedurl,
      date: updateddate,
      catogery: updatedcatogery ,
      privacy: this.props.activity.privacy 
    }
    console.log("Updated act:");
    console.log(updatedact);
    this.props.editHandler(updatedact);
    this.setState({
      status: '',
      visible: false,
    });
    // activityDetail.update(this.state.previousDetails.email,
    //   updatedTitle, updatedurl, updateddate, updatedcatogery);

    //   let {title, url, date, catogery, privacy} = this.state ;
    //   this.setState({status : '',
    //       previousDetails: {title, url, date, catogery, privacy}
    //   })
      // console.log("Catogery after update :" +catogery);
      

  }; 


  handleOk = (e) => {
    console.log(e);
    if(this.state.status === 'edit'){
      console.log("In handleOk status : " + this.state.status);
      this.handleSave();
    }
    else{
      this.setState({
        status: 'edit',
        visible: true,
      });
    }

  }

  handleCancel = (e) => {
    console.log(e);
    
    this.setState({
      status: '',
      visible: false,
    });
  }

  handleDelete = (e) => {
    
    e.preventDefault();
    console.log("inside handledelete");
    console.log(this.props.activity.id+ " " +this.state.title);
    // activityDetail.delete(this.props.id).then(()=>console.log('XXXXXXXXX')).then(()=>this.props.deleteHandler());
        
    this.props.deleteHandler(this.props.activity.id);
        

  }

  render() {
    return (
      <div>
        <div className="thumbnail">
        <div >
          <p className="actile">{this.state.title}       </p>
        <p className="actdate">{this.state.date}</p>
        </div>

        <br/>
        <br/>
        <div >
        <Button color="info" onClick={this.showModal}>More..</Button>{' '}
        <Button color="danger" onClick={this.handleDelete} >Remove</Button>
        {/* <span class="actprivacy badge badge-info">Info</span> */}
        <Badge className="actprivacy" color="info">{this.state.privacy}</Badge>
        </div>
        </div>
        <Modal
          title="Activity Detail"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={this.state.status === 'edit' ? 'Save' : 'Edit'}
          cancelText="Back"
        >

          <div className="panel-body">
            {this.state.status === 'edit' ?
              <Form>
                <FormGroup>
                  <Label for="catogery">Catogery</Label>
                  <CustomInput type="select" onChange={this.handleChange} id="catogery" name="catogery">
                    <option value={this.state.catogery}>Select</option>
                    <option>Academic</option>
                    <option>Work</option>
                    <option>Social</option>
                    <option>Utility</option>
                  </CustomInput>
                </FormGroup>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" value={this.state.title} onChange={this.handleChange} name="title" id="title" placeholder="Content title" disabled/>
                </FormGroup>
                <FormGroup>
                  <Label for="url">Location</Label>
                  <Input type="text" value={this.state.url} onChange={this.handleChange} name="url" id="url" placeholder="URL of the content" disabled/>
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date :</Label>
                  <Input type="text" value={this.state.date} onChange={this.handleChange} name="date" id="date" placeholder="URL of the content"/>
                </FormGroup>

              </Form> :
              <Table bordered>
                <thead>
                  <tr>
                    <th>Feild</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Title</th>
                    <td>{this.state.title}</td>
                  </tr>
                  <tr>
                    <th scope="row">URL</th>
                    <td>{this.state.url}</td>
                  </tr>
                  <tr>
                    <th scope="row">Catogery</th>
                    <td>{this.state.catogery}</td>
                  </tr>
                </tbody>
              </Table>
            }
          </div>

        </Modal>
      </div>
    );
  }
}

