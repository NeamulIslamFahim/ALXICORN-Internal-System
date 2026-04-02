import React, { Component } from "react";

export default class ModalForm extends Component {
  componentDidUpdate(prevProps) {
    if (this.shouldResetForm(prevProps)) {
      this.setState({ form: this.buildForm(this.props) });
    }
  }

  shouldResetForm(prevProps) {
    return false;
  }

  updateField(field, value) {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value,
      },
    });
  }

  submitForm(event, callback) {
    event.preventDefault();
    callback(this.state.form);
  }

  render() {
    return null;
  }
}
