import React, { Component } from "react";
import FormButton from "../forms/FormButton";

export default class Modal extends Component {
  render() {
    if (!this.props.open) {
      return null;
    }

    return (
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-head">
            {this.props.header ? (
              this.props.header
            ) : (
              <div>
                {this.props.subtitle ? <p className="eyebrow">{this.props.subtitle}</p> : null}
                {this.props.title ? <h3>{this.props.title}</h3> : null}
              </div>
            )}
            <FormButton type="button" variant="ghost" onClick={this.props.onClose}>
              Close
            </FormButton>
          </div>

          <form className="modal-form" onSubmit={this.props.onSubmit}>
            <div className="modal-body">{this.props.children}</div>
            {this.props.footer || null}
          </form>
        </div>
      </div>
    );
  }
}
