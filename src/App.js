import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SuperheroList from './js/components/SuperheroList'
import './App.css';

function App() {
  return (
    <div className="container">
      <Container className="master-detail">
      <Row>
        <Col className="hero-list">
          <SuperheroList/>
        </Col>
        <Col className="hero-detail">
          <h1>Hero Detail</h1>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
