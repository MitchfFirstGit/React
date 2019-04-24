import React, { Component } from "react";
import "./style.scss";
export class SearchBar extends Component {
  state = {
    data: {
      gender: "",
      status: "",
      sort: "",
      searchField: ""
    }
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
  };

  sortList = ({ target }) => {
    let { name, value } = target;
    this.state.data[name] = value;
    let newList = this.props.initialListCharacters;

    const filter = (initialListCharacters, valueState, propObj) =>
      initialListCharacters.filter(item => {
        if (valueState === "all") return true;
        return item[propObj].toLowerCase() === valueState;
      });

    const filterByGenderAndStatus = (firstSort, secondSort) => {
      newList = filter(
        this.props.initialListCharacters,
        this.state.data[firstSort],
        firstSort
      );

      if (this.state.data[secondSort] !== "") {
        newList = filter(newList, this.state.data[secondSort], secondSort);
      }
    };

    if (this.state.data.gender !== "") {
      filterByGenderAndStatus("gender", "status");
    } else {
      if (this.state.data.status !== "") {
        filterByGenderAndStatus("status", "gender");
      }
    }

    if (target.value === "nameAsc" || this.state.data.sort === "nameAsc") {
      newList.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
    if (target.value === "nameDesc" || this.state.data.sort === "nameDesc") {
      newList.sort((a, b) => (a.name > b.name ? -1 : 1));
    }

    if (this.state.data.searchField)
      newList = newList.filter(({ name }) =>
        name.toLowerCase().includes(this.state.data.searchField.toLowerCase())
      );
    this.props.onChange(newList);
  };

  render() {
    return (
      <section className="search">
        <form onChange={this.sortList}>
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
