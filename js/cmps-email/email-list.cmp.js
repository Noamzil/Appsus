import emailPreview from "./email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
            <ul class="emails-list">
                <li v-for="email in emails" :key="email.id" class="email-list-container">
                    <email-preview :email="email"/>
                </li>
            </ul>
    `,
    components: {
        emailPreview
    },

}