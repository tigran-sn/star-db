import React, { Component, Fragment } from "react";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

import "./person-details.css";

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    person: null,
    loading: true
  };
  componentDidMount() {
    this.updatePerson();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }
  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService.getPerson(personId).then(person => {
      this.setState({ person, loading: false });
    });
  }
  render() {
    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }
    const { person, loading } = this.state;
    const isLoading = loading ? <Spinner /> : null;
    const hasData = !loading;
    const personDetails = hasData ? <PesonView person={person} /> : null;
    return (
      <div className="person-details card">
        {isLoading}
        {personDetails}
      </div>
    );
  }
}

const PesonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;
  return (
    <Fragment>
      <img
        className="person-image"
        alt={name}
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
