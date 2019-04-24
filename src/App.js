import React, { Component } from "react";
import "./App.css";
import { getCharacterList } from "./services/api";
import { CharacterList } from "./components/CharacterList";
import { SearchBar } from "./components/SearchBar";
import { Pagination } from "./components/Pagination";

class App extends Component {
  state = {
    listCharacters: [],
    initialListCharacters: [],
    currentPage: 1,
    amountCharactersOnPage: 10,
    isFetching: true
  };
  handleState = (
    listCharacters,
    currentPage = 1,
    amountCharactersOnPage = this.state.amountCharactersOnPage
  ) => {
    this.setState({
      listCharacters,
      currentPage,
      amountCharactersOnPage
    });
  };
  async componentDidMount() {
    let listCharacters = await getCharacterList();
    this.setState({
      listCharacters,
      initialListCharacters: [...listCharacters],
      isFetching: false
    });
  }
  render() {
    let {
      listCharacters,
      initialListCharacters,
      currentPage,
      amountCharactersOnPage
    } = this.state;
    if (this.state.isFetching) {
      return (
        <div className="animation">
          <div className="circle1" />
          <div className="circle2" />
          <div className="circle3" />
        </div>
      );
    }
    return (
      <div className="App">
        <SearchBar
          initialListCharacters={initialListCharacters}
          onChange={this.handleState}
        />
        <CharacterList
          listCharacters={listCharacters}
          currentPage={currentPage}
          amountCharactersOnPage={amountCharactersOnPage}
        />
        <Pagination
          listCharacters={listCharacters}
          onClick={this.handleState}
          currentPage={currentPage}
          amountCharactersOnPage={amountCharactersOnPage}
        />
      </div>
    );
  }
}

export default App;
