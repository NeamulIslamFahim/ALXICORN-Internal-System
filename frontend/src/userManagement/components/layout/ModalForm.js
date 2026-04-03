import React, { Component } from "react";

// Base class for modal forms that need reset, field update, and submit helpers.
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
    this.updateForm((form) => ({
      ...form,
      [field]: value,
    }));
  }

  updateForm(updater) {
    this.setState((prevState) => ({
      form: typeof updater === "function" ? updater(prevState.form) : updater,
    }));
  }

  submitForm(event, callback) {
    event.preventDefault();
    callback(this.state.form);
  }

  render() {
    return null;
  }
}
