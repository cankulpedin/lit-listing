import { LitElement, html, css } from 'lit';

import validations from './employee-form.validation';
import { msg } from '@lit/localize';

class EmployeeForm extends LitElement {
  static get properties() {
    return {
      initialValues: {},
      onSubmit: {},
      validationFunction: {},
    };
  }

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;

      .form-input {
        margin-bottom: 8px;
        padding: 8px;
      }

      .submit-button {
        padding: 8px;
      }
    }
  `;

  validate(event) {
    if (this.validationFunction) {
      return this.validationFunction(event);
    } else {
      const formData = new FormData(event.target);
      let errors = {};
      for (const pair of formData.entries()) {
        if (validations[pair[0]] === undefined) continue;
        if (!validations[pair[0]](pair[1])) errors[pair[0]] = false;
      }

      if (JSON.stringify(errors) !== '{}') {
        confirm(`Errors on ${Object.keys(errors).join(', ')}`);
        return false;
      }

      return true;
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.validate(event)) this.onSubmit(event);
  }

  render() {
    return html`
      <form class="form" @submit="${this.onFormSubmit}">
        <label>${msg('First Name')}</label>
        <input
          class="form-input"
          type="text"
          name="firstName"
          value=${this.initialValues.firstName}
          placeholder=${msg('First Name')}
          required
        />
        <label>${msg('Last Name')}</label>
        <input
          class="form-input"
          type="text"
          name="lastName"
          value=${this.initialValues.lastName}
          placeholder=${msg('Last Name')}
          required
        />
        <label>${msg('Date of Employment')}</label>
        <input
          class="form-input"
          type="date"
          name="employmentDate"
          value=${this.initialValues.employmentDate}
          placeholder=${msg('Date of Employment')}
          required
        />
        <label>${msg('Date of Birth')}</label>
        <input
          class="form-input"
          type="date"
          name="birthDate"
          value=${this.initialValues.birthDate}
          placeholder=${msg('Date of Birth')}
          required
        />
        <label>${msg('Phone Number')}</label>
        <input
          class="form-input"
          type="tel"
          name="phoneNumber"
          value=${this.initialValues.phoneNumber}
          placeholder=${msg('Phone Number')}
          required
        />
        <label>${msg('Email Address')}</label>
        <input
          class="form-input"
          type="email"
          name="email"
          value=${this.initialValues.email}
          placeholder=${msg('Email Address')}
          required
        />
        <label>${msg('Department')}</label>
        <select
          class="form-input"
          name="department"
          selected=${this.initialValues.department}
          placeholder=${msg('Department')}
          required
        >
          <option value="Analytics">${msg('Analytics')}</option>
          <option value="Tech">${msg('Tech')}</option>
        </select>
        <label>${msg('Position')}</label>
        <select
          class="form-input"
          name="position"
          selected=${this.initialValues.position}
          placeholder=${msg('Position')}
          required
        >
          <option value="Junior">${msg('Junior')}</option>
          <option value="Medior">${msg('Medior')}</option>
          <option value="Senior">${msg('Senior')}</option>
        </select>
        <button class="submit-button" type="submit">${msg('Submit')}</button>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
