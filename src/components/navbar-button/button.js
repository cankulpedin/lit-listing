import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

class NavbarButton extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      path: { type: String },
    };
  }

  constructor() {
    super();
  }

  static styles = css`
    .button-wrapper {
      width: 100%;
      height: 32px;
      margin-bottom: 8px;
      cursor: pointer;
    }
  `;

  onClickButton(e) {
    e.preventDefault();

    Router.go(`/${this.path}`);
  }

  render() {
    return html` <button class="button-wrapper" @click="${this.onClickButton}">
      ${this.text}
    </button>`;
  }
}

customElements.define('navbar-button', NavbarButton);
