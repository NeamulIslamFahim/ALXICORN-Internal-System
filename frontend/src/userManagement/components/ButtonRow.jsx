import React, { Component } from "react";

export default class ButtonRow extends Component {
  render() {
    return <div className="button-row">{this.props.children}</div>;
  }
}
