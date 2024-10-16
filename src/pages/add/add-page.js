import { connect } from 'pwa-helpers';
import { LitElement, html, css } from 'lit';

import { store } from '../../store/store';
import { add } from '../../store/reducer';

class AddPage extends connect(store)(LitElement) {
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
    event.preventDefault();

    const formData = new FormData(event.target);
    let data = {};
    for (const pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    store.dispatch(add(data));
  }

  render() {
    return html`
      <div>
        <form class="form" @submit="${this.onFormSubmit}">
          <input
            class="form-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            required
          />
          <input
            class="form-input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
          />
          <input
            class="form-input"
            type="date"
            name="employmentDate"
            placeholder="Date of Employment"
            required
          />
          <input
            class="form-input"
            type="date"
            name="birthDate"
            placeholder="Date of Birth"
            required
          />
          <input
            class="form-input"
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            required
          />
          <input
            class="form-input"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <select
            class="form-input"
            name="department"
            placeholder="Department"
            required
          >
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>
          <select
            class="form-input"
            name="position"
            placeholder="Position"
            required
          >
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
          <button class="submit-button" type="submit">Submit</button>
        </form>
      </div>
    `;
  }
}

customElements.define('add-page', AddPage);
