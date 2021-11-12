import homePage from './pages/appsus-home-page.cmp.js';
import notesPage from './pages/note-app.cmp.js';
import emailApp from './pages/email-app.cmp.js';
import emailDetails from './cmps-email/email-details.cmp.js';
import noteEdit from './cmps-notes/note-edit.cmp.js';
import bookApp from '../js/pages/book-app.cmp.js'
import bookDetails from '../js/pages/book-details.cmp.js'


const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/note',
    component: notesPage,
  },
  {
    path: '/note/:noteId?/edit',
    component: noteEdit,
  },
  {
    path: '/email',
    component: emailApp,
  },
  {
    path: '/email/:emailId?',
    component: emailDetails,
  },
  {
    path: '/book',
    component: bookApp
  },
  {
    path: '/book/:bookId?',
    component: bookDetails
  },
];

export const router = new VueRouter({ routes });
