import homePageAppsus from './pages/appsus-home-page.cmp.js'
const routes = [
    {
        path: '/',
        component: homePageAppsus
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    // {
    //     path: '/book/:bookId?',
    //     component: bookDetails
    // },
    // {
    //     path: '/about',
    //     component: aboutPage
    // }, 
]
export const router = new VueRouter({routes})