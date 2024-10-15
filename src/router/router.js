import { Router } from '@vaadin/router';

import routes from './routes.js';

export const router = context => {
  const router = new Router(context.shadowRoot.querySelector('#outlet'));
  router.setRoutes(routes);
};
