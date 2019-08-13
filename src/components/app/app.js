import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details/item-details";
import PeoplePage from "../people-page";

import "./app.css";
import SwapiService from "../../services/swapi-service";
import Row from "../row";

export default class App extends React.Component {
  swapiService = new SwapiService();
  state = {};

  render() {
    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
      getPlanet,
      getPlanetImage
    } = this.swapiService;
    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="birthYear" label="Birth Year" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );
    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="costInCredits" label="Cost" />
        <Record field="passengers" label="Passengers" />
        <Record field="length" label="Length" />
        <Record field="cargoCapacity" label="Cargo Capacity" />
      </ItemDetails>
    );
    const planetDetails = (
      <ItemDetails itemId={10} getData={getPlanet} getImageUrl={getPlanetImage}>
        <Record field="diameter" label="Diameter" />
        <Record field="population" label="Population" />
        <Record field="rotationPeriod" label="Rotation Period" />
      </ItemDetails>
    );

    return (
      <div className="container">
        <Header />
        {/* <RandomPlanet />
        <PeoplePage />
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={({ name, diameter }) => `${name} (${diameter})`}
            />
          </div>
          <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson} />
          </div>
        </div>
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={item => item.name}
            />
          </div>
          <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson} />
          </div>
        </div> */}
        <Row left={personDetails} right={starshipDetails} />
      </div>
    );
  }
}
