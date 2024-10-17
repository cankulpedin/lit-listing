import { connect } from 'pwa-helpers';
import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';

import { store } from '../../store/store';
import { add, uniqnessChecker } from '../../store/reducer';

import '../../components/employee-form/employee-form';
import { msg } from '@lit/localize';

class AddPage extends connect(store)(LitElement) {
  onFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let data = {};
    for (const pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    if (!uniqnessChecker(store.getState(), data.email, data.phoneNumber)) {
      confirm(msg('This user data already exists!'));
      return;
    }
    store.dispatch(add(data));
    Router.go(`/list`);
  }

  render() {
    return html`
      <div>
        <employee-form
          initialValues="${{}}"
          .onSubmit="${this.onFormSubmit}"
        ></employee-form>
      </div>
    `;
  }
}

customElements.define('add-page', AddPage);
