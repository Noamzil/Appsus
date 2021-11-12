export default {
    template: `
        <section class="home-page">
            <h1 class="welcome-page">Welcome To Appsus!</h1>
            <div class="pages-icons">
                <router-link to="/email" class="home-email"><i class="fas fa-envelope"></i></router-link> 
                <router-link to="/note" class="home-keep"><i class="fas fa-sticky-note"></i></router-link> 
                <router-link to="/book" class="home-book"><i class="fas fa-book-open"></i></router-link> 
            </div>

        </section>
    `
}