import React, { Component } from "react";
import "./style.scss";
export class SearchBar extends Component {
  state = {
    gender: "",
    status: "",
    sort: "",
    searchField: ""
  };

  changeState = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.handleChange(value);
    });
  };

  handleChange = value => {
    let newList = this.props.initialListCharacters;

    if (this.state.gender !== "") {
      newList = this.filterByGenderAndStatus("gender", "status", newList);
    } else {
      if (this.state.status !== "") {
        newList = this.filterByGenderAndStatus("status", "gender", newList);
      }
    }

    if (value === "nameAsc" || this.state.sort === "nameAsc") {
      newList.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
    if (value === "nameDesc" || this.state.sort === "nameDesc") {
      newList.sort((a, b) => (a.name > b.name ? -1 : 1));
    }

    if (this.state.searchField)
      newList = newList.filter(({ name }) =>
        name.toLowerCase().includes(this.state.searchField.toLowerCase())
      );
    this.props.onChange(newList);
  };

  filter = (filterList, valueState, propObj) =>
    filterList.filter(item => {
      if (valueState === "all") return true;
      return item[propObj].toLowerCase() === valueState;
    });

  filterByGenderAndStatus = (firstSort, secondSort, filterList) => {
    filterList = this.filter(filterList, this.state[firstSort], firstSort);

    if (this.state[secondSort] !== "") {
      filterList = this.filter(filterList, this.state[secondSort], secondSort);
    }
    return filterList;
  };

  render() {
    return (
      <section className="search">
        <form onChange={this.changeState} onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            className="search-by-input"
            placeholder="Search..."
            name="searchField"
          />

          <div>
            <strong>Gender:</strong> <br />
            <label>
              <input type="radio" name="gender" value="male" /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" />
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="genderless" />
              Genderless
            </label>
            <label>
              <input type="radio" name="gender" value="unknown" />
              Unknown
            </label>
            <label>
              <input type="radio" name="gender" value="all" />
              All
            </label>
          </div>
          <div>
            <strong>Status:</strong> <br />
            <label>
              <input type="radio" name="status" value="alive" /> Alive
            </label>
            <label>
              <input type="radio" name="status" value="dead" /> Dead
            </label>
            <label>
              <input type="radio" name="status" value="unknown" /> Unknown
            </label>
            <label>
              <input type="radio" name="status" value="all" /> All
            </label>
          </div>
          <div>
            <strong>Name</strong> <br />
            <label>
              <input type="radio" name="sort" value="nameAsc" />
              A-Z
            </label>
            <label>
              <input type="radio" name="sort" value="nameDesc" />
              Z-A
            </label>
          </div>
        </form>
      </section>
    );
  }
}
