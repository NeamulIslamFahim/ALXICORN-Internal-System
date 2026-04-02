import React, { Component } from "react";

export default class InfoCard extends Component {
  render() {
    return (
      <div className={this.props.className || "profile-card"}>
        {this.props.label ? <span>{this.props.label}</span> : null}
        <strong>{this.props.value}</strong>
      </div>
    );
  }
}
