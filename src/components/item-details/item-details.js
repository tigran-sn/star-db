import React, { Component, Fragment } from "react";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

import "./item-details.css";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item" key={field}>
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export { Record };

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    item: null,
    image: null,
    loading: false
  };
  componentDidMount() {
    this.updateItem();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }
  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then(item => {
      this.setState({ item, image: getImageUrl(item) });
    });
  }
  render() {
    if (!this.state.item) {
      return <span>Select a person from a list</span>;
    }
    const { item, loading, image } = this.state;
    const isLoading = loading ? <Spinner /> : null;
    const hasData = !loading;
    const itemDetails = hasData ? (
      <ItemView item={item} image={image} props={this.props} />
    ) : null;
    return (
      <div className="person-details card">
        {isLoading}
        {itemDetails}
      </div>
    );
  }
}

const ItemView = ({ item, image, props }) => {
  const { name } = item;
  return (
    <Fragment>
      <img className="person-image" alt={name} src={image} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(props.children, child => {
            return React.cloneElement(child, { item });
          })}
        </ul>
        <ErrorButton />
      </div>
    </Fragment>
  );
};
