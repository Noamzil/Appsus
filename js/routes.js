import homePage from './pages/appsus-home-page.cmp.js';


const routes = [
    {
        path: '/',
        component: homePage
    },
];

export const router = new VueRouter({ routes });
