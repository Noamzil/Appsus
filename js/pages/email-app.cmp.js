import { utilService } from '../services/util-service.js'
import { emailService } from '../services/email-service.js'
import emailList from '../cmps-email/email-list.cmp.js'
import emailFoldersList from '../cmps-email/email-folders-list.cmp.js'
import emailTopbar from '../cmps-email/email-topbar.cmp.js'

export default {
    template:`
        <section v-if="emails" class="email-page">
            <email-topbar/>
            <email-folders-list />
            <email-list :emails="emails"/>

        </section>
    `,
    data() {
        return {
            emails: null
        }
    },
    components: {
        emailList,
        emailFoldersList,
        emailTopbar,
    },
    created() {
        this.loadEmails()
    },
    methods: {
        loadEmails() {
            const emails = (utilService.loadFromStorage('emails'))
            if (emails) this.emails = emails
            else {
                emailService.query()
                .then(email => this.email = email)
            }
        }
    }
}