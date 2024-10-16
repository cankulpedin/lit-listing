import { LitElement, html, css } from 'lit';

import validations from './employee-form.validation';

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
        <label>First Name</label>
        <input
          class="form-input"
          type="text"
          name="firstName"
          value=${this.initialValues.firstName}
          placeholder="First Name"
          required
        />
        <label>Last Name</label>
        <input
          class="form-input"
          type="text"
          name="lastName"
          value=${this.initialValues.lastName}
          placeholder="Last Name"
          required
        />
        <label>Employement Date</label>
        <input
          class="form-input"
          type="date"
          name="employmentDate"
          value=${this.initialValues.employmentDate}
          placeholder="Date of Employment"
          required
        />
        <label>Birth Date</label>
        <input
          class="form-input"
          type="date"
          name="birthDate"
          value=${this.initialValues.birthDate}
          placeholder="Date of Birth"
          required
        />
        <label>Phone Number</label>
        <input
          class="form-input"
          type="tel"
          name="phoneNumber"
          value=${this.initialValues.phoneNumber}
          placeholder="Phone Number"
          required
        />
        <label>Email</label>
        <input
          class="form-input"
          type="email"
          name="email"
          value=${this.initialValues.email}
          placeholder="Email Address"
          required
        />
        <label>Department</label>
        <select
          class="form-input"
          name="department"
          selected=${this.initialValues.department}
          placeholder="Department"
          required
        >
          <option value="Analytics">Analytics</option>
          <option value="Tech">Tech</option>
        </select>
        <label>Position</label>
        <select
          class="form-input"
          name="position"
          selected=${this.initialValues.position}
          placeholder="Position"
          required
        >
          <option value="Junior">Junior</option>
          <option value="Medior">Medior</option>
          <option value="Senior">Senior</option>
        </select>
        <button class="submit-button" type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
