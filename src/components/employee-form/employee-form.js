import { LitElement, html, css } from 'lit';

class EmployeeForm extends LitElement {
  static get properties() {
    return {
      initialValues: {},
      onSubmit: {},
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

  onFormSubmit(event) {
    this.onSubmit(event);
  }

  render() {
    return html`
      <form class="form" @submit="${this.onFormSubmit}">
        <input
          class="form-input"
          type="text"
          name="firstName"
          value=${this.initialValues.firstName}
          placeholder="First Name"
          required
        />
        <input
          class="form-input"
          type="text"
          name="lastName"
          value=${this.initialValues.lastName}
          placeholder="Last Name"
          required
        />
        <input
          class="form-input"
          type="date"
          name="employmentDate"
          value=${this.initialValues.employmentDate}
          placeholder="Date of Employment"
          required
        />
        <input
          class="form-input"
          type="date"
          name="birthDate"
          value=${this.initialValues.birthDate}
          placeholder="Date of Birth"
          required
        />
        <input
          class="form-input"
          type="tel"
          name="phoneNumber"
          value=${this.initialValues.phoneNumber}
          placeholder="Phone Number"
          required
        />
        <input
          class="form-input"
          type="email"
          name="email"
          value=${this.initialValues.email}
          placeholder="Email Address"
          required
        />
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
