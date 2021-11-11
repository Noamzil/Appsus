export default {
    template: `
        <header class="app-header">
            <!-- <section class="app-header"> -->
                    <img src="/img/logo.png" class='logo-img'> 
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