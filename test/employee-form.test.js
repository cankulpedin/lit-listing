import { html } from 'lit';
import { fixture, expect, fixtureCleanup } from '@open-wc/testing';
import '../src/components/employee-form/employee-form';

describe('EmployeeForm', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(
      html`<employee-form
        initialValues="${{}}"
        .onSubmit="${() => {}}"
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

  it.skip('should validate form values on submit', () => {
    const form = element.shadowRoot.querySelector('form');

    expect(form).to.exist;
  });
});
