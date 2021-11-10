import emailPreview from "./email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
    <section>
        <ul class="emails-list">
            <li v-for="email in emails" :key="email.id" class="email-list-container">
                <email-preview :email="email"/>
                <router-link :to="'/email/'+email.id">Details</router-link>
            </li>
        </ul>
    </section>

    `,
    components: {
        emailPreview,
    },

}