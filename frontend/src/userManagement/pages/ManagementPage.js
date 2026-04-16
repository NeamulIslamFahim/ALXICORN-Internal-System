import React, { Component } from "react";

export default class ManagementPage extends Component {
  navigateToPage(page) {
    this.context?.setPage?.(page);
    this.context?.navigateToPage?.(page);
  }
}
