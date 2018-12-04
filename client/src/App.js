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

  //Get Kudo List
  getKudos = () => {
    $.get('/api/kudos')
    .then((result) => {
      this.setState({kudoList: result.data});
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  //Get user list
  getUserList = () => {
    $.get(`/api/users`)
    .then((result) => {
      this.setState({userList: result.data});
    })
    .catch((error)=>{
      console.log(error);
    });
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
