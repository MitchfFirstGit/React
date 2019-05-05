import React, { Component } from "react";
import { Character } from "../Character";
import "./style.scss";
export class CharacterList extends Component {
  renderItemsOnScreen = (
    currentPage,
    amountCharactersOnPage,
    listCharacters
  ) => {
    if (listCharacters.length === 0) {
      return (
        <h1 className="error">
          We don't have such character, check your input please!
        </h1>
      );
    }
    let lastPage = Math.ceil(listCharacters.length / amountCharactersOnPage);
    let lastCharacterOnPage =
      currentPage === lastPage
        ? listCharacters.length
        : amountCharactersOnPage * currentPage;
    let arrayCharacters = [];
    for (
      let i = amountCharactersOnPage * (currentPage - 1);
      i < lastCharacterOnPage;
      i++
    ) {
      arrayCharacters.push(<Character {...listCharacters[i]} key={i} />);
    }

    return arrayCharacters;
  };

  render() {
    return (
      <section className="all-characters">
        {this.renderItemsOnScreen(
          this.props.currentPage,
          this.props.amountCharactersOnPage,
          this.props.listCharacters
        )}
      </section>
    );
  }
}
