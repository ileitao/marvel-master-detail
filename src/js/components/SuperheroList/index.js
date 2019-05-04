import React from "react";
import { connect } from "react-redux";
import { fetchHeroes } from "../../../actions/heroesActions";

class SuperheroList extends React.Component {
  componentDidMount() {
    debugger;
    this.props.dispatch(fetchHeroes());
  }

  render() {
    const { error, loading, heroList } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {heroList.map(hero =>
          <li key={hero.id}>{hero.name}</li>
        )}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  heroList: state.heroes.heroList,
  loading: state.heroes.loading,
  error: state.heroes.error
});

export default connect(mapStateToProps)(SuperheroList);