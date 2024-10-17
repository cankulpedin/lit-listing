import { html, render } from 'lit';
import { setLocaleFromLang } from './localization';

import './app';

const main = document.querySelector('main');

(async () => {
  try {
    await setLocaleFromLang();
  } catch (e) {
    console.error(`Error loading locale: ${e.message}`);
  }
  render(html` <ing-proj></ing-proj> `, main);
})();
