import React from 'react';
import logo from '../images/validate.png';
import {
    Row,
    Col,
    Navbar,
    NavbarBrand,
  } from 'reactstrap';

//Render the header
const Header = () => (

    
          <header className="bg-white">
            <Row>
              <Col xs="12" className="mb-5">
                <Navbar color="light" className="bg-light justify-content-center">
                  <NavbarBrand href="#">
                    <h1><img src={logo} className="img-fluid" alt="responsive"/> Tiny Improvement</h1>
                  </NavbarBrand>
                </Navbar>
              </Col>
            </Row>
          </header>
    

);

export default Header;