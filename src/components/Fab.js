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
        <div class="wrapper-menu">
          <div class="line-menu half start" />
          <div class="line-menu" />
          <div class="line-menu half end" />
        </div>
      </button>
    );
  }
}
