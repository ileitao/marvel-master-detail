import React from "react";

class SuperheroCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false
    };
  }

  componentDidMount() {
    const img = new Image();
    img.onload = () => {
      this.setState({
        loaded: true
      });
    };
    img.onerror = () => {
      this.setState({
        error: true
      });
    };
    img.src = this.props.data.thumbnail.path;
  }

  render() {
    const imageSrc = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;
    const { name } = {...this.props.data};
    if (this.state.error) {
      return (
        <div className="card">
          <div className="card-body">
          <img className="card-img-top" src={imageSrc} alt="{name}"/>
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      )
    } else if (!this.state.loaded) {
      return <h1>Loading</h1>
    }
    return (
      <div className="card">
        <img className="card-img-top" src={imageSrc} alt="{name}"/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    );
  }
}

export default SuperheroCard;