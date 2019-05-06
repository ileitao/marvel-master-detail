import React from "react";
import { connect } from "react-redux";
import { fetchHeroByID } from "../../../actions/heroesActions";
import { Container, Row, ListGroup, Spinner, Image } from 'react-bootstrap';

class SuperheroDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterId: 0
    };
  }
  componentDidMount() {
    if (this.props.characterId) {      
      this.props.dispatch(fetchHeroByID(this.props.characterId));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.characterId !== this.state.characterId){
      this.setState({characterId: this.state.characterId});
      this.props.dispatch(fetchHeroByID(this.props.characterId));
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.characterId !== prevState.characterId) {
      return { 
        characterId: nextProps.characterId
      };
    } else {
      return null;
    }
  }

  render() {
    const { errorFetchingHero, loadingHero, heroData } = this.props;
    let imageSrc,
        name,
        bio,
        urls = [];
    if (heroData) {
      name = `${heroData.name}`;
      urls = heroData.urls;
      bio = (heroData.description !== "") ? "Biography: " + heroData.description : "Biography: Biography unavailable.";
      imageSrc = `${heroData.thumbnail.path}.${heroData.thumbnail.extension}`;
    }
    

    if (errorFetchingHero) {
      return <div>Error! {errorFetchingHero.message}</div>;
    }

    if (loadingHero) {
      return <Spinner animation="grow" variant="success" />
    }

    return (
      <Container>
        <Row>
        {heroData ? 
        (
          <div className="card">
            <Image className="card-img-top" src={imageSrc} alt={name}/>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{bio}</p>
              <ListGroup variant="flush">
                {urls.map((urlObject, index) =>
                  <ListGroup.Item key={index}>
                    <p className="card-text">Url {urlObject.type}: <a href={urlObject.url}>{urlObject.url}</a></p>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </div>
          </div>
        ) : null }
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  heroData: state.heroes.heroData,
  loadingHero: state.heroes.loadingHero,
  errorFetchingHero: state.heroes.errorFetchingHero
});

export default connect(mapStateToProps)(SuperheroDetail);