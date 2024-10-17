import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';

import { store } from '../../store/store';
import {
  deleteEmployee,
  employeeCount,
  employeeSelector,
} from '../../store/reducer';
import { PAGE_ELEMENT_COUNT, TABS } from './list-page.constants';
import { Router } from '@vaadin/router';
import { msg } from '@lit/localize';

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
          cursor: pointer;
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
          max-width: 80%;
          display: flex;
          flex-direction: row;

          @media (max-width: 720px) {
            flex-direction: column;
          }

          .key-value-pair {
            margin-bottom: 8px;
          }

          .buttons {
            display: flex;
            flex-direction: column;
            width: 30%;

            @media (max-width: 720px) {
              flex-direction: row;
            }

            .edit {
              cursor: pointer;
              margin-bottom: 16px;

              @media (max-width: 720px) {
                flex-direction: row;
                margin-bottom: 0;
                margin-right: 8px;
              }
            }
            .delete {
              cursor: pointer;
              background-color: red;
            }
          }
        }

        .table {
          border-collapse: collapse;

          th,
          td {
            border: 1px solid rgb(160 160 160);
            padding: 8px 10px;
          }
        }

        @media screen and (max-width: 720px) {
          table,
          thead,
          tbody,
          th,
          td,
          tr {
            display: block;
          }

          thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }

          tr {
            margin-bottom: 20px;
            border: 1px solid #ddd;
          }

          td {
            border: none;
            position: relative;
            padding-left: 50%;
          }

          td:before {
            position: absolute;
            left: 6px;
            content: attr(data-label);
            font-weight: bold;
          }
        }
      }

      .pagination {
        display: flex;
        flex-direction: row;
        margin-top: 16px;

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
    this._currentPage = 1;
    this._currentTab = tabName;
    this._employees = employeeSelector(store.getState(), 1);
    this.requestUpdate();
  }

  setPage(target) {
    this._currentPage = target;
    this._employees = employeeSelector(store.getState(), target);
    this.requestUpdate();
  }

  onDelete(id) {
    const approveDelete = confirm(msg('You are going to delete this user!'));

    if (!approveDelete) {
      return;
    }

    store.dispatch(deleteEmployee(id));

    let newPage = this._currentPage;
    if (this._employees.length === 1) {
      if (this._currentPage === 1) {
        newPage = 1;
      } else {
        newPage = this._currentPage - 1;
      }
    }
    this._employees = employeeSelector(store.getState(), newPage);
    this._employeeCount = employeeCount(store.getState());
    this.requestUpdate();
  }

  onEdit(id) {
    Router.go(`/edit/${id}`);
  }

  renderList() {
    return this._employees.map(employee => {
      return html`<div class="list-item">
        <div>
          ${Object.keys(employee).map(
            key => html`
              <div class="key-value-pair">
                <span> ${key}: </span><span>${employee[key]}</span>
              </div>
            `,
          )}
        </div>
        <div class="buttons">
          <button class="edit" @click=${() => this.onEdit(employee.id)}>
            ${msg('EDIT')}
          </button>
          <button class="delete" @click=${() => this.onDelete(employee.id)}>
            ${msg('DELETE')}
          </button>
        </div>
      </div>`;
    });
  }

  renderTable() {
    const headers = Object.keys(this._employees[0] || []).map(
      el => html`<th scope="col">${el}</th>`,
    );

    const body = this._employees?.map(e => {
      return html`<tr>
        ${Object.values(e).map(v => html`<td>${v}</td>`)}
      </tr>`;
    });

    return html`<table class="table">
      <thead>
        <tr>
          ${headers}
        </tr>
      </thead>
      <tbody>
        ${body}
      </tbody>
    </table>`;
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
            ${msg('List')}
          </button>
          <button
            class=${`button ${this._currentTab === TABS.TABLE ? 'active' : ''}`}
            @click="${() => this.onClickTab(TABS.TABLE)}"
          >
            ${msg('Table')}
          </button>
        </div>
        ${this._currentTab === TABS.LIST
          ? html`<div class="tab-content">${this.renderList()}</div>`
          : null}
        ${this._currentTab === TABS.TABLE
          ? html`<div class="tab-content">${this.renderTable()}</div>`
          : null}
        ${this._employeeCount > PAGE_ELEMENT_COUNT
          ? html`<div class="pagination">${this.renderPagination()}</div>`
          : null}
      </div>
    `;
  }
}

customElements.define('list-page', ListPage);
