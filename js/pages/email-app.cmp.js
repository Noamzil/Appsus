import { utilService } from '../services/util-service.js'
import { emailService } from '../services/email-service.js'
import emailList from '../cmps-email/email-list.cmp.js'
import emailFoldersList from '../cmps-email/email-folders-list.cmp.js'
import emailFilter from '../cmps-email/email-filter.cmp.js'

export default {
    template: `
        <section v-if="emails" class="email-page">
            <email-filter @filtered="setFilter"/>
            <email-folders-list @type="setType" />
            <email-list :emails="emailsToShow"/>

        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: {
                title: null,
                read: null,
                type: 'inbox' //maybe use this instead
            },
            folders: null,
            typeSelected: 'sent'
        }
    },
    components: {
        emailList,
        emailFoldersList,
        emailFilter,
    },
    created() {
        this.loadEmails()
        this.setFolders()
        this.emailsByType()
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
        setFolders() {
            this.folders = emailService.getEmailType(this.emails)
        },
        emailsByType() {
            if (this.typeSelected === 'inbox') this.emails = this.folders.inbox
            else if (this.typeSelected === 'trash') this.emails = this.folders.sent
        },
        setType(type) {
            this.typeSelected = type
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy.title && !this.filterBy.read) return this.emails
            if (this.filterBy.title) var searchStr = this.filterBy.title.toLowerCase();
            var emailsToShow = this.emails.filter(email => {
                return email.subject.toLowerCase().includes(searchStr)
            });
            if (this.filterBy.read && this.filterBy.title) {
                console.log('im here');
                var emailsToShow = this.emails.filter(email => {
                    return email.subject.toLowerCase().includes(searchStr) && email.isRead + '' == this.filterBy.read
                });
            }
            if (this.filterBy.read) {
                console.log('im hereee');
                var emailsToShow = this.emails.filter(email => {
                    return email.isRead + '' == this.filterBy.read
                });
            }
            return emailsToShow;
        }
    }
}

