import React, { Component } from 'react';
import * as $ from 'axios';
import './App.css';
import Header from './components/Header';
import KudoList from './components/KudoList';
import {
  Container,
  Row,
  Col,
  Button,
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
    const userArray = this.state.userList.concat();

    for(let i=0; i < kudoArray.length; i++){
      const fromUser = userArray.filter(user => user._id.includes(kudoArray[i].from_user));
      const toUser = userArray.filter(user => user._id.includes(kudoArray[i].to_user));
      kudoArray[i].from_user = fromUser[0].username;
      kudoArray[i].to_user = toUser[0].username;
    }
    
    this.setState({ kudoList: kudoArray });
  }

  componentDidMount() {
    this.getKudos();
    this.getUserList();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Header />
          <Row>
            <Col xs="12" md="3">
              <Card className="border-0">
                <CardBody>
                  <Button color="info">Give Kudos</Button>
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
