import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import { Router } from '@vaadin/router';

import '../src/pages/edit/edit-page';
import {
  DEPARTMENTS,
  POSITIONS,
} from '../src/components/employee-form/employee-form.contants';

describe('EditPage', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(
      html`<edit-page
        .initialValues=${{
          firstName: 'name',
          lastName: 'lsatname',
          employmentDate: '2002-12-12',
          birthDate: '1980-12-12',
          phoneNumber: '5382520022',
          email: 'test@mail.com',
          department: DEPARTMENTS.ANALYTICS,
          position: POSITIONS.MEDIOR,
        }}
      ></edit-page>`,
    );
  });

  it('renders edit page by default & navigates to list on submit', () => {
    const goStub = Sinon.stub(Router, 'go');
    window.confirm = Sinon.fake(() => true);

    const form = element.shadowRoot
      .querySelector('div')
      .querySelector('employee-form')
      .shadowRoot.querySelector('form');
    expect(form).to.exist;

    const button = form.querySelector('.submit-button');
    expect(button).to.exist;

    button.click();

    expect(window.confirm).to.have.been.calledWith(
      'Are you sure you want to submit this form?',
    );
    expect(goStub).to.have.been.calledWith('/list');
  });
});
