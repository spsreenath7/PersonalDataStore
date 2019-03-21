import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import activityDetail from '../../../datastore/activityAPI';
import activityAPI from '../../../datastore/activityAPI';
import cuid from 'cuid';

class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = { collapse: false,
            itemtype:'',
            title: '',
            url: '',
            date: '',
            catogery: '',
            privacy: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name +' : '+e.target.value);
      }


    handleAdd = (e) => {
    e.preventDefault();
    let newitemtype = this.state.itemtype.trim();
    let newtitle = this.state.title.trim();
    let newurl = this.state.url.trim();
    let newdate = this.state.date.trim();
    let newcatogery = this.state.catogery.trim();
    let newprivacy = this.state.privacy.trim();

    if(newitemtype === 'Activity')
    {
        // activityAPI.add(newtitle, newurl, newdate, newcatogery, newprivacy);
        let newactid=cuid();
        let newact ={
            id: newactid,
            title: newtitle,
            url: newurl,
            date: newdate,
            catogery: newcatogery ,
            privacy: newprivacy 
          }
          this.props.addActivity(newact);
    }
    else{
        return;
    }
            // let {name, email, gender, contact} = this.state ;
        

    };

    handleCancel = (e) => {
        this.setState({
            collapse: false,
            itemtype:'',
            title: '',
            url: '',
            date: '',
            catogery: '',
            privacy: ''
        })
        e.preventDefault();
    }


    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle} style={{ marginBottom: '1rem', padding: 'right' }}>Create custom item</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <div className="thumbnail">
                                <Form>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="itemtype">Item Type</Label>
                                                <Input type="select" onChange={this.handleChange} id="itemtype" name="itemtype">
                                                    <option value={this.state.itemtype} >Select</option>
                                                    <option>Activity</option>
                                                    <option>Travel</option>
                                                    <option>finance</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="date">Date</Label>
                                                <Input type="text" value={this.state.date} onChange={this.handleChange} name="date" id="date" placeholder="happended at"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        <Input value={this.state.title} onChange={this.handleChange} type="title" name="title" id="title" placeholder="title of custom data item" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="url">Reference</Label>
                                        <Input type="text" value={this.state.url} onChange={this.handleChange} name="url" id="url" placeholder="URL of the content" />
                                        <small id="note" class="form-text text-muted">Optional for Travel and Finance data.</small>
                                    </FormGroup>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleCity">City</Label>
                                                <Input  onChange={this.handleChange} type="select" onChange={this.handleChange} id="catogery" name="catogery">
                                                    <option value={this.state.catogery}>Select</option>
                                                    <option>Academic</option>
                                                    <option>Work</option>
                                                    <option>Social</option>
                                                    <option>Utility</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleState">Transaction type</Label>
                                                <Input type="text" name="state" id="exampleState" disabled/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="exampleZip" >Amount</Label>
                                                <Input type="text" name="zip" id="exampleZip" disabled />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <Row form>
                                    <FormGroup inline>
                                        
                                    <Label >Privacy</Label>
                                        
                                            <FormGroup check>
                                                <Label check>
                                                    <Input value="low" checked={this.state.privacy === "low"}
                                                    onChange={this.handleChange} type="radio" name="privacy" id="privacy"/>{' '}
                                                    Low
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input value="medium" checked={this.state.privacy === "medium"}
                                                    onChange={this.handleChange} type="radio" name="privacy" id="privacy"/>{' '}
                                                    medium
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input value="high" checked={this.state.privacy === "high"}
                                                    onChange={this.handleChange} type="radio" name="privacy"  id="privacy"/>{' '}
                                                    High
                                                </Label>
                                            </FormGroup>
                                        
                                    </FormGroup>
                                    </Row>
                                </Form>
                                <Button color="primary" onClick={this.handleAdd}>Add</Button>{'  '}
                                <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default CreateItem;
