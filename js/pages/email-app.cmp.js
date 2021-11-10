import { utilService } from '../services/util-service.js'
import { emailService } from '../services/email-service.js'
import emailList from '../cmps-email/email-list.cmp.js'
import emailFoldersList from '../cmps-email/email-folders-list.cmp.js'
import emailFilter from '../cmps-email/email-filter.cmp.js'

export default {
    template: `
        <section v-if="emails" class="email-page">
            <email-filter @filtered="setFilter"/>
            <email-folders-list />
            <email-list :emails="emailsToShow"/>

        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: {
                title: null,
                read: null,
                type: 'inbox'
            },
        }
    },
    components: {
        emailList,
        emailFoldersList,
        emailFilter,
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
        },
        setFilter(filterBy) {
            this.filterBy.title = filterBy.title;
            this.filterBy.read = filterBy.read;
        },
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy.title && !this.filterBy.read) return this.emails
            if (this.filterBy.title) var searchStr = this.filterBy.title.toLowerCase();
            const emailsToShow = this.emails.filter(email => {
                console.log(this.emails);
                console.log(email.isRead)
                console.log(this.filterBy.isRead)
                return email.subject.toLowerCase().includes(searchStr) && email.isRead+'' == this.filterBy.read
            });
            return emailsToShow;
        }
    }
}
