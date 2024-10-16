import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';

import { store } from '../../store/store';
import { employeeCount, employeeSelector } from '../../store/reducer';
import { PAGE_ELEMENT_COUNT, TABS } from './list-page.constants';

class ListPage extends connect(store)(LitElement) {
  static state = {
    _currentTab: { type: String },
    _employees: {},
    _currentPage: { type: Number },
    _employeeCount: { type: Number },
  };

  constructor() {
    super();
    this._currentTab = TABS.LIST;
    this._employees = employeeSelector(store.getState(), 1);
    this._employeeCount = employeeCount(store.getState());
    this._currentPage = 1;
  }

  static styles = css`
    .list-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .tab-buttons {
        display: flex;
        flex-direction: row;

        .button {
          padding: 12px 32px;
          margin-right: 32px;
          border: 1px solid black;
        }
        .active {
          background-color: #c3def5;
        }
      }

      .tab-content {
        margin-top: 32px;

        .list-item {
          background-color: white;
          padding: 16px;
          margin-bottom: 16px;
          max-width: 50%;

          .key-value-pair {
            margin-bottom: 8px;
          }
        }
      }

      .pagination {
        display: flex;
        flex-direction: row;

        .pagination-button {
          padding: 16px;
          margin-right: 16px;
          border: 1px solid black;
        }
        .active {
          background-color: #c3def5;
        }
      }
    }
  `;

  onClickTab(tabName) {
    this._currentTab = tabName;
    this.requestUpdate();
  }

  setPage(target) {
    this._currentPage = target;
    this._employees = employeeSelector(store.getState(), target);
    this.requestUpdate();
  }

  renderList() {
    return this._employees.map(employee => {
      return html` <div class="list-item">
        ${Object.keys(employee).map(
          key => html`
            <div class="key-value-pair">
              <span> ${key}: </span><span>${employee[key]}</span>
            </div>
          `,
        )}
      </div>`;
    });
  }

  renderPagination() {
    const pageCount = Math.ceil(this._employeeCount / PAGE_ELEMENT_COUNT);
    return new Array(pageCount)
      .fill()
      .map(
        (_, index) =>
          html`<button
            class=${`pagination-button ${index + 1 === this._currentPage ? 'active' : ''}`}
            @click=${() => this.setPage(index + 1)}
          >
            ${index + 1}
          </button>`,
      );
  }

  render() {
    return html`
      <div class="list-wrapper">
        <div class="tab-buttons">
          <button
            class=${`button ${this._currentTab === TABS.LIST ? 'active' : ''}`}
            @click="${() => this.onClickTab(TABS.LIST)}"
          >
            List
          </button>
          <button
            class=${`button ${this._currentTab === TABS.TABLE ? 'active' : ''}`}
            @click="${() => this.onClickTab(TABS.TABLE)}"
          >
            Table
          </button>
        </div>
        ${this._currentTab === TABS.LIST
          ? html`<div class="tab-content">${this.renderList()}</div>`
          : null}
        ${this._employeeCount > PAGE_ELEMENT_COUNT
          ? html`<div class="pagination">${this.renderPagination()}</div>`
          : null}
      </div>
    `;
  }
}

customElements.define('list-page', ListPage);
