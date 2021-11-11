import { router } from './routes.js';
import appHeader from './app/app-header.cmp.js';

const options = {
    el: '#app',
    router,
    template: `
    <section> 
        <app-header />
        <router-view/>
    </section>
    `,
    components: {
        appHeader,
        // userMsg
    }
}
new Vue(options)