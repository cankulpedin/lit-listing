import '../pages/list/list-page.js';
import '../pages/add/add-page.js';

export default [
  { path: '/', component: 'list-page' },
  { path: '/list', component: 'list-page' },
  { path: '/add', component: 'add-page' },
  { path: '(.*)', redirect: '/' },
];
