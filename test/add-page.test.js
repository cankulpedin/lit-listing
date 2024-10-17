import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { Router } from '@vaadin/router';

import '../src/pages/add/add-page';
import {
  DEPARTMENTS,
  POSITIONS,
} from '../src/components/employee-form/employee-form.contants';
import Sinon from 'sinon';

describe('AddPage', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<add-page></add-page>`);
  });

  it('renders add employee form & succesfully submits', () => {
    const goStub = Sinon.stub(Router, 'go');

    const form = element.shadowRoot
      .querySelector('div')
      .querySelector('employee-form')
      .shadowRoot.querySelector('form');

    const firstNameInput = form.querySelector('#firstName');
    const lastName = form.querySelector('#lastName');
    const employmentDate = form.querySelector('#employmentDate');
    const birthDate = form.querySelector('#birthDate');
    const phoneNumber = form.querySelector('#phoneNumber');
    const email = form.querySelector('#email');
    const department = form.querySelector('#department');
    const position = form.querySelector('#position');

    expect(form).to.exist;
    expect(firstNameInput).to.exist;
    expect(lastName).to.exist;
    expect(employmentDate).to.exist;
    expect(birthDate).to.exist;
    expect(phoneNumber).to.exist;
    expect(email).to.exist;
    expect(department).to.exist;
    expect(position).to.exist;

    firstNameInput.value = 'name';
    lastName.value = 'surname';
    employmentDate.value = '2002-12-12';
    birthDate.value = '1980-12-12';
    phoneNumber.value = '5382520022';
    email.value = 'name@test.com';
    department.value = DEPARTMENTS.ANALYTICS;
    position.value = POSITIONS.MEDIOR;

    const button = form.querySelector('.submit-button');
    expect(button).to.exist;

    button.click();

    expect(goStub).to.have.been.calledWith('/list');
  });
});
