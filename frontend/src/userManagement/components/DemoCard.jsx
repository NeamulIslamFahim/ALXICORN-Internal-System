import React, { Component } from "react";

export default class DemoCard extends Component {
  render() {
    const { title, lines = [] } = this.props;

    return (
      <div className="demo-card">
        <strong>{title}</strong>
        {lines.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
    );
  }
}
