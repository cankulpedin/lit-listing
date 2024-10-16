import { LitElement, html, css } from 'lit';

import './components/sidebar/sidebar.js';

import { router } from './router/router';

class IngProj extends LitElement {
  static properties = {
    header: { type: String },
  };

  static styles = css`
    .main-wrapper {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;

      .outlet {
        width: 100%;
        height: 100%;
        padding: 32px 16px;
      }
    }
  `;

  constructor() {
    super();
    this.header = 'My app';
  }

  firstUpdated() {
    super.firstUpdated();

    this.router = router(this);
  }

  render() {
    return html`
      <main class="main-wrapper">
        <side-bar class="side-bar"></side-bar>
        <div id="outlet" class="outlet"></div>
      </main>
    `;
  }
}

customElements.define('ing-proj', IngProj);
