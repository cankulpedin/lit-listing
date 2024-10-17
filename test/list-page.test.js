import { html } from 'lit';
import { fixture } from '@open-wc/testing';

import '../src/pages/list/list-page';

describe('ListPage', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<list-page></list-page>`);
  });

  it('should switch tab when clicked', () => {
    const wrapper = element.shadowRoot.querySelector('.list-wrapper');

    const tabButtons = wrapper.querySelector('.tab-buttons');

    tabButtons.querySelectorAll('button')[1].click();
  });
});
