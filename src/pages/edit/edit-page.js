import { connect } from 'pwa-helpers';
import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';

import { store } from '../../store/store';
import { findEmployee, updateEmployee } from '../../store/reducer';
import '../../components/employee-form/employee-form';
import { msg } from '@lit/localize';

class EditPage extends connect(store)(LitElement) {
  static state = {
    _id: { type: String },
  };

  static properties = {
    initialValues: {},
  };

  onBeforeEnter(location) {
    this._id = location.params.id;

    this.initialValues = findEmployee(store.getState(), this._id);
  }

  constructor() {
    super();

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const userConfirmed = confirm(
      msg('Are you sure you want to submit this form?'),
    );
    if (!userConfirmed) {
      return;
    }

    const formData = new FormData(event.target);
    let data = {};
    for (const pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    store.dispatch(updateEmployee(this._id, data));
    Router.go(`/list`);
  }

  render() {
    return html`
      <div>
        <employee-form
          .initialValues=${this.initialValues}
          .onSubmit="${this.onFormSubmit}"
        ></employee-form>
      </div>
    `;
  }
}

customElements.define('edit-page', EditPage);
