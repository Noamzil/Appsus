import homePage from './pages/appsus-home-page.cmp.js';
import notesPage from './pages/note-page.cmp.js';



const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/notes',
        component: notesPage
    },
];

export const router = new VueRouter({ routes });
