import React, { Component } from "react";
import ButtonRow from "./ButtonRow";
import FormButton from "./FormButton";
import layoutStyles from "../layout/layout.module.css";
import { joinClassNames } from "../../utils/uiHelpers";

// Shared modal footer for create/edit screens so actions stay visually consistent.
export default class ModalActionFooter extends Component {
  render() {
    const {
      note,
      submitLabel,
      onCancel,
      align = "space-between",
    } = this.props;
    // Footer alignment is configurable because some forms need the note while others do not.
    const actionsClassName = joinClassNames(
      layoutStyles.modalActions,
      align === "end" ? layoutStyles.modalActionsEnd : null
    );

    return (
      <div className={actionsClassName}>
        {note ? <span className={layoutStyles.modalNote}>{note}</span> : null}
        <ButtonRow>
          <FormButton type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </FormButton>
          <FormButton type="submit" variant="primary">
            {submitLabel}
          </FormButton>
        </ButtonRow>
      </div>
    );
  }
}
