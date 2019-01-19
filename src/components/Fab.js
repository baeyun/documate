import React, { Component } from "react";

export default class Fab extends Component {
  state = {
    isOpen: false
  };

  onFabClick() {
    let sidebar = document.getElementById("sidebar");
    let wrapperMenu = document.querySelector(".wrapper-menu");

    if (!this.state.isOpen) {
      sidebar.classList.add("active-mobile");
      wrapperMenu.classList.add("open");
    } else {
      sidebar.classList.remove("active-mobile");
      wrapperMenu.classList.remove("open");
    }
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <button
        onClick={this.onFabClick.bind(this)}
        id="sidebar-fab"
      >
        <div className="wrapper-menu">
          <div className="line-menu half start" />
          <div className="line-menu" />
          <div className="line-menu half end" />
        </div>
      </button>
    );
  }
}
