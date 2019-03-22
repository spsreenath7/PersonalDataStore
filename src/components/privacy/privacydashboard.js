import React from 'react';
import { CustomInput, Form, FormGroup, Label, Button } from 'reactstrap';

export default class PrivacyDashboard extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleCheckbox">Data store provider access</Label>
          <div>
            <CustomInput type="checkbox" id="exampleCustomCheckbox" label=" Automated activity data" />
            <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Medium security items" />
            <CustomInput type="checkbox" id="exampleCustomCheckbox3" label=" Masked finance data" disabled />
            <CustomInput type="checkbox" id="exampleCustomCheckbox4" label=" Complete travel data" htmlFor="exampleCustomCheckbox4_X" disabled />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="exampleCheckbox">Secured consumers</Label>
          <div>
            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label=" Select this to enable social media acitvity read" />
            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label=" Complete readonly acess" />
            <CustomInput type="radio" id="exampleCustomRadio3" label=" High security data handler" disabled />
            <CustomInput type="radio" id="exampleCustomRadio4" label=" Turn on updates" htmlFor="exampleCustomRadio4_X" disabled />
          </div>
        </FormGroup>


        <Button color="info">Save</Button>{' '}
        <Button color="secondary">Cancel</Button>{' '}

      </Form>
    );
  }
}
