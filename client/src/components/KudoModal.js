import React from 'react';
import * as $ from 'axios';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class KudoModal extends React.Component {
  state = {
    modal: false,
    userList: []
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  getUserList = () => {
    $.get(`/api/users`)
      .then((result) => {
        console.log(result);
        this.setState({ userList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Execute this when the mount is done.
  componentDidMount() {
    this.getUserList();
  }

  render() {
    return (
      <div>
        <Button color="info" onClick={this.toggle}>Give Kudos</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader className="text-info" toggle={this.toggle}>Give a Kudos</ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col xs="12" md="3">
                  <Form>
                    <Input type="select" name="fromSelect" className="custom-select btn btn-info" id="fromSelect">
                      <option selected>From</option>
                      {
                        this.state.userList.map((user) => (
                          <option id={user._id}>{user.username}</option>
                        ))
                      }
                    </Input>
                  </Form>
                </Col>
                <Col xs="12" md="5">
                </Col>
                <Col xs="12" md="3">
                  <Form>
                    <Input type="select" name="toSelect" className="custom-select btn btn-info" id="toSelect">
                      <option selected>To</option>
                      {
                        this.state.userList.map((user) => (
                          <option id={user._id}>{user.username}</option>
                        ))
                      }
                    </Input>
                  </Form>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.toggle}>Send Kudos</Button>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default KudoModal;