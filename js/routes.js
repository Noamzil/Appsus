import homePage from './pages/appsus-home-page.cmp.js';
import notesPage from './pages/note-page.cmp.js';
import emailApp from './pages/email-app.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/notes',
        component: notesPage
    },
    {
        path: '/email',
        component: emailApp
    },
];

export const router = new VueRouter({ routes });
