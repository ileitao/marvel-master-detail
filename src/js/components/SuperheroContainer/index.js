import React from "react";
import { Row, Col } from 'react-bootstrap';
import SuperheroList from '../SuperheroList';
import SuperheroDetail from '../SuperheroDetail';

class SuperheroContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterId: 0
    }
  }

  handleCharacterSelected = (data) => {
    this.setState({characterId: data.hero.id});
  }

  render() {
    return (
      <Row>
        <Col xs={3} sm={3} md={3} lg={3} xl={3} className="hero-list">
          <SuperheroList handleCharacterSelected={(data) => this.handleCharacterSelected(data)}/>
        </Col>
        <Col className="hero-detail">
          <SuperheroDetail characterId={this.state.characterId}/>
        </Col>
      </Row>
    );
  }
}

export default SuperheroContainer;