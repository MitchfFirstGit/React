import React, { Component } from "react";
import "./style.scss";
import { Page } from "../Page";
export class Pagination extends Component {
  handleClick = ({ target }) => {
    if (target.tagName === "INPUT") {
      let currentPage = Number(target.parentElement.lastChild.innerHTML);
      console.log(target.parentElement.parentElement);
      if (target.value !== "") {
        this.props.onClick(this.props.listCharacters, 1, Number(target.value));
      } else {
        this.props.onClick(
          this.props.listCharacters,
          currentPage,
          this.props.amountCharactersOnPage
        );
      }
      window.scrollTo(0, 0);
    }
  };

  createPagination = (amountCharactersOnPage, currentPage, listCharacters) => {
    let pages = Math.ceil(listCharacters.length / amountCharactersOnPage);
    let arrayPages = [];

    if (pages < 8) {
      for (let i = 1; i <= pages; i++) {
        arrayPages.push(<Page page={i} key={i} name={"pagination"} />);
      }
    } else {
      if (currentPage < 5) {
        for (let i = 1; i < pages; i++) {
          if (i === 6) {
            arrayPages.push(
              <span key={i} className="page">
                ...
              </span>
            );
            i = pages;
          }
          arrayPages.push(<Page page={i} key={i} name={"pagination"} />);
        }
      }
      if (currentPage >= 5 && currentPage <= pages - 4) {
        for (let i = 1; i < pages; i++) {
          if (i === 2) {
            arrayPages.push(
              <span key={i} className="page">
                ...
              </span>
            );
            i = currentPage - 1;
          }
          if (i === currentPage + 2) {
            arrayPages.push(
              <span key={i} className="page">
                ...
              </span>
            );
            i = pages;
          }
          arrayPages.push(<Page page={i} key={i} name={"pagination"} />);
        }
      }
      if (currentPage > pages - 4) {
        for (let i = 1; i <= pages; i++) {
          if (i === 2) {
            arrayPages.push(
              <span key={i} className="page">
                ...
              </span>
            );
            i = pages - 4;
          }
          arrayPages.push(<Page page={i} key={i} name={"pagination"} />);
        }
      }
    }

    return arrayPages;
  };

  maxNumberCharactersOnPage = () => {
    let arrayPages = [];
    if (this.props.listCharacters.length === 0) {
      return;
    }
    for (let i = 0, j = 10; i < 3; i++, j = 50 * i) {
      arrayPages.push(<Page page={j} value={j} key={i} name={"max-amount"} />);
    }
    return arrayPages;
  };
  render() {
    return (
      <div className="container">
        <div className="pagination" onClick={this.handleClick}>
          {this.createPagination(
            this.props.amountCharactersOnPage,
            this.props.currentPage,
            this.props.listCharacters
          )}
        </div>
        <div onClick={this.handleClick} className="choose-number-characters">
          {this.maxNumberCharactersOnPage()}
        </div>
      </div>
    );
  }
}
