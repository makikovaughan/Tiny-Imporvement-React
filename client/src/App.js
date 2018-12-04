import React, { Component } from 'react';
import * as $ from 'axios';
import './App.css';
import Header from './components/Header';
import KudoList from './components/KudoList';
import KudoModal from './components/KudoModal';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Jumbotron
} from 'reactstrap';


class App extends Component {

  state = {
    kudoList: [],
    userList: [],
    newKudo: {},
    isUpdating: false
  }

  getKudos = () => {
    $.get('/api/kudos')
    .then((result) => {
      console.log(result);
      this.setState({kudoList: result.data});
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  getUserList = () => {
    $.get(`/api/users`)
    .then((result) => {
      console.log(result);
      this.setState({userList: result.data});
      this.findUser();
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  findUser = () => {
    // Copies the kudoList array from state and stores it in a kudo Array
    let kudoArray = this.state.kudoList.concat();

    // Copies the userList array from state and stores it in a user Array
    const userArray = this.state.userList.concat();

    for(let i=0; i < kudoArray.length; i++){

      //Get the user name based on user id
      const fromUser = userArray.filter(user => user._id.includes(kudoArray[i].from_user));
      const toUser = userArray.filter(user => user._id.includes(kudoArray[i].to_user));

      //Switch the user information from id to user name
      kudoArray[i].from_user = fromUser[0].username;
      kudoArray[i].to_user = toUser[0].username;
    }
    
    //Apply the change to the list.
    this.setState({ kudoList: kudoArray });
  }

  //Execute this when the mount is done.
  componentDidMount() {
    this.getKudos();
    this.getUserList();
  }

  //Render the index.html
  render() {
    return (
      <div className="App">
        <Container>
          <Header />
          <Row>
            <Col xs="12" md="3">
              <Card className="border-0">
                <CardBody>
                  <KudoModal />
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md="9">
              <Jumbotron>
                <KudoList kudoList={this.state.kudoList} userList={this.state.userList}/>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
