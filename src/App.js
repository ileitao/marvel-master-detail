import React from 'react';
import { Container } from 'react-bootstrap';
import SuperheroContainer from './js/components/SuperheroContainer';
import './App.css';

function App() {
  return (
    <div>
      <Container className="master-detail">
        <SuperheroContainer />
      </Container>
    </div>
  );
}

export default App;
