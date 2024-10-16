import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit';

class NavbarButton extends LitElement {
  static get properties() {
    return {
      textId: { type: String },
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
      ${this.textId}
    </button>`;
  }
}

customElements.define('navbar-button', NavbarButton);
