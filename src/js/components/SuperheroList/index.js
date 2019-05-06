import React from "react";
import { connect } from "react-redux";
import { fetchHeroes } from "../../../actions/heroesActions";
import SuperheroCard from "../SuperheroCard";
import { ListGroup, Spinner } from 'react-bootstrap';

class SuperheroList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchHeroes());
  }

  handleCharacterSelected = (data) => {
    this.props.handleCharacterSelected(data);
  }

  render() {
    const { errorFetchingHeroes, loadingHeroes, heroList } = this.props;

    if (errorFetchingHeroes) {
      return <div>Error! {errorFetchingHeroes.message}</div>;
    }

    if (loadingHeroes) {
      return <Spinner animation="grow" variant="success" />
    }

    return (
      <ListGroup variant="flush">
        {heroList.map((hero, index) =>
          <ListGroup.Item key={index} onClick={() => this.handleCharacterSelected({hero})}>
            <SuperheroCard data={hero}/>
          </ListGroup.Item>
        )}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => ({
  heroList: state.heroes.heroList,
  loadingHeroes: state.heroes.loadingHeroes,
  errorFetchingHeroes: state.heroes.errorFetchingHeroes
});

export default connect(mapStateToProps)(SuperheroList);