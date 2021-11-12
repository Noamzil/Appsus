export default {
    template: `
        <header class="app-header">
            <!-- <section class="app-header"> -->
                    <router-link to="/" active-class="active-link" exact><img src="/img/appsus.png" class='logo-img'> </router-link> 
                    <!-- <h3>Appsus</h3> -->
                </div>
                <nav>
                    <router-link to="/" active-class="active-link" exact>Home</router-link> |
                    <router-link to="/email">Emails</router-link> |
                    <router-link to="/note">Keep</router-link> |
                    <router-link to="/book">Books</router-link> 
                </nav>
            <!-- </section> -->
        </header>
    `,
}