import emailPreview from "./email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
    <section>
        <ul class="emails-list">
            <li v-for="email in emails" :key="email.id" class="email-list-container" :style="">
                <email-preview @delete="deleteEmail(email.id)" :email="email"/>
                <router-link :to="'/email/'+email.id" title="Full Details"><i class="fas fa-expand"></i></router-link>
            </li>
        </ul>
    </section>

    `,
    components: {
        emailPreview,
    },
    methods: {
        deleteEmail(emailId) {
            this.$emit('delete',emailId)
        },
    },
    computed: {
        emailBgc() {
            // return {backgroundColor:'green'}
        }
    }
}
