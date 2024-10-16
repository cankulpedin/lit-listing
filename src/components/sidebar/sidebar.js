import { LitElement, html, css } from 'lit';
import { msg } from '@lit/localize';

import '../navbar-button/button.js';

class Sidebar extends LitElement {
  static styles = css`
    :host {
      width: 20%;
      border-right: 1px solid black;
    }

    .sidebar-wrapper {
      margin-top: 32px;
      padding: 8px;
    }
  `;

  render() {
    return html` <div class="sidebar-wrapper">
      <navbar-button
        class="button"
        text=${msg('Employee List')}
        path="list"
      ></navbar-button>
      <navbar-button
        class="button"
        text=${msg('Add Employee')}
        path="add"
      ></navbar-button>
    </div>`;
  }
}

customElements.define('side-bar', Sidebar);
