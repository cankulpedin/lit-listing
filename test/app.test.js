import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/app.js';
import '../src/components/sidebar/sidebar.js';

describe('IngProj', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<ing-proj></ing-proj>`);
  });

  it('renders sidebar and outlet by default', () => {
    const sideBar = element.shadowRoot.querySelector('side-bar');
    const outlet = element.shadowRoot.querySelector('#outlet');
    expect(sideBar).to.exist;
    expect(outlet).to.exist;
  });
});
