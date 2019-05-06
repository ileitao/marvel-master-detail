import React from "react";
import { Image } from 'react-bootstrap';

class SuperheroCard extends React.Component {
  render() {
    const imageSrc = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;
    const { name, comics, series, events, stories } = {...this.props.data};
    return (
      <div className="card">
        <Image className="card-img-top" src={imageSrc} alt="{name}"/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p>Shown in comic? : {comics.available > 0 ? 'Yes' : 'No'}</p>
          <p>Shown in series? : {series.available > 0 ? 'Yes' : 'No'}</p>
          <p>Shown in events? : {events.available > 0 ? 'Yes' : 'No'}</p>
          <p>Shown in stories? : {stories.available > 0 ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }
}

export default SuperheroCard;