import { html } from 'lit';
import { fixture, expect, fixtureCleanup } from '@open-wc/testing';
import '../src/components/employee-form/employee-form';
import {
  DEPARTMENTS,
  POSITIONS,
} from '../src/components/employee-form/employee-form.contants';
import Sinon from 'sinon';

describe('EmployeeForm', () => {
  let element;
  const onSubmit = Sinon.fake();
  beforeEach(async () => {
    element = await fixture(
      html`<employee-form
        initialValues="${{}}"
        .onSubmit="${onSubmit}"
      ></employee-form>`,
    );
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it('renders form by default', () => {
    const form = element.shadowRoot.querySelector('form');

    expect(form).to.exist;

    // expect(form.children).to.equal(16);
  });

  it('should validate form values on submit', () => {
    const form = element.shadowRoot.querySelector('form');

    const firstNameInput = form.querySelector('#firstName');
    const lastName = form.querySelector('#lastName');
    const employmentDate = form.querySelector('#employmentDate');
    const birthDate = form.querySelector('#birthDate');
    const phoneNumber = form.querySelector('#phoneNumber');
    const email = form.querySelector('#email');
    const department = form.querySelector('#department');
    const position = form.querySelector('#position');

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

    expect(onSubmit).to.have.been.calledWith();
  });
});
