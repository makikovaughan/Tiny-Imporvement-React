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
  Label,
  Input,
} from 'reactstrap';

const Users = (props) => (

  props.userList.map((user) => (
    <option key={user._id} id={user._id} value={user._id}>{user.username}</option>
  ))

);

class KudoModal extends React.Component {
  state = {
    modal: false,
    userList: [],
    isError: false,
    title: "",
    body: "",
    from_user: "",
    to_user: ""
  }

  //Close&Open Modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      isError: false
    });
  }

  //Get user list and store on userList
  getUserList = () => {
    $.get(`/api/users`)
      .then((result) => {
        this.setState({ userList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Post the new kudos and close the modal window.
  postKudos = (newKudo) => {
    console.log(newKudo);
    $.post(`/api/kudos`, newKudo)
    .then((result)=>{
      this.toggle();
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  //Get the input value
  changeHandler = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    });

  }

  //When the button is pressed on the modal window, this will be executed
  clickHandler = (event) => {
    event.preventDefault();
    const newKudo = {
      title: this.state.title,
      body: this.state.body,
      from_user: this.state.from_user,
      to_user: this.state.to_user
    }

    console.log(newKudo);
    if (newKudo.title === "" || newKudo.body === "" || newKudo.from_user === "" || newKudo.to_user === "") {
      this.setState({
        isError: true
      });
    }
    else if (newKudo.from_user === newKudo.to_user) {
      this.setState({
        isError: true
      });
    }
    else {
      this.postKudos(newKudo);
      this.setState({
        isError: false
      });
      window.location.reload();
    }
  }

  //Execute this when the mount is done.
  componentDidMount() {
    this.getUserList();
  }

  //Render the modal window
  render() {
    return (
      <div>
        <Button color="info" onClick={this.toggle}>Give Kudos</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader className="text-info" toggle={this.toggle}>Give a Kudos</ModalHeader>
          <ModalBody className="text-info">
            <Container>
              {
                this.state.isError ?
                  (<Row>
                    <Col xs="12">
                      <div className="alert alert-danger">
                        Please check the input.
                  </div>
                    </Col>
                  </Row>) : <span />
              }
              <Row>
                <Col xs="12" md="3">
                  <Form>
                    <Input type="select" onChange={this.changeHandler} name="from_user" className="custom-select btn btn-info" id="fromSelect" value={this.state.from_user}>
                      <option id="from">From</option>
                      <Users userList={this.state.userList} />
                    </Input>
                  </Form>
                </Col>
                <Col xs="12" md="5">
                  <Form>
                    <Label for="kudoTitle">Kudo Title</Label><br />
                    <Input type="text" onChange={this.changeHandler} name="title" id="kudoTitle" value={this.state.title} placeholder="Please type the title" />
                    <br /><br />
                    <Label for="kudoMessage">Kudo Message</Label><br />
                    <Input type="textarea" onChange={this.changeHandler} name="body" id="kudoMessage" rows="4" cols="30" value={this.state.body} placeholder="Please type the Kudo message." />
                  </Form>
                </Col>
                <Col xs="12" md="3">
                  <Form>
                    <Input type="select" onChange={this.changeHandler} name="to_user" value={this.state.to_user} className="custom-select btn btn-info" id="toSelect">
                      <option id="to">To</option>
                      <Users userList={this.state.userList} />
                    </Input>
                  </Form>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.clickHandler}>Send Kudos</Button>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default KudoModal;