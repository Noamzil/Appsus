import emailPreview from "./email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
    <section class="email-list-page">
        <div v-if="openEmails">
        <img src="https://c.tenor.com/q-zZSTX6jSIAAAAM/mail-download.gif" class="download-emails-gif">
        </div>
        <div v-else>
            <ul class="emails-list">
                <li v-for="email in emails" :key="email.id" class="email-list-container">
                    <email-preview @delete="deleteEmail(email.id)" :email="email" @starred="starred" :class="readEmail"/>
                    <router-link :to="'/email/'+email.id" title="Full Details" class="full-details"><i class="fas fa-expand"></i></router-link>
                </li>
            </ul>
        </div>
    </section>

    `,
    data() {
        return {
            openMail: false
        }
    },
    created() {
        this.emailTime()
    },
    components: {
        emailPreview,
    },
    methods: {
        deleteEmail(emailId) {
            this.$emit('delete', emailId)
        },
        emailTime() {
            setTimeout(() => {
                this.openMail = true
            }, 800)
        },
        starred() {
            this.$emit('starred')
        }
    },
    computed: {
        openEmails() {
            if (!this.openMail) return true
            else return false
        },
        readEmail(email) {
            if (email.isRead) return 'readEmail'
        }
    }
}
