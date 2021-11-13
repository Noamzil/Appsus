import { utilService } from '../services/util-service.js'
import { emailService } from '../services/email-service.js'
import emailList from '../cmps-email/email-list.cmp.js'
import emailFoldersList from '../cmps-email/email-folders-list.cmp.js'
import emailFilter from '../cmps-email/email-filter.cmp.js'

export default {
    template: `
        <section v-if="emails" class="email-page">
            <email-filter @filtered="setFilter" @sortDate="sortDate" @sortTitle="sortTitle" />
            <div class="email-page-inner-container">
                <email-folders-list @type="setType" :unread="unreadEmails" @add="addEmail"/>
                <email-list :emails="emailsToShow" @delete="deleteEmail"/>
            </div>
        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: {
                title: null,
                read: null,
            },
            folders: null,
            typeSelected: 'inbox',
            sortDateSTB: true,
            sortTitleAZ: true,

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
            else if (this.typeSelected === 'sent') this.emails = this.folders.sent
            else this.emails = []
        },
        setType(type) {
            this.typeSelected = type
            this.emailsByType()
        },
        deleteEmail(id) {
            emailService.remove(id)
                .then(() => {
                    this.emails = this.emails.filter(email => email.id !== id);
                })
                .catch((err) => {
                    console.log('err', err);
                });
        },
        addEmail() {
            this.loadEmails()
            this.setFolders()
            this.emailsByType()
        },
        sortDate() {
            if (this.sortDateSTB) {
                this.emails.sort((a, b) => {
                    return new Date(a.sentAt) - new Date(b.sentAt)
                })
            } else {
                this.emails.sort((a, b) => {
                    return new Date(b.sentAt) - new Date(a.sentAt)
                })
            }
            this.sortDateSTB = !this.sortDateSTB
        },
        sortTitle() {
            if (this.sortTitleAZ) {
                this.emails.sort((a, b) => {
                    return (a.subject.toLowerCase()>b.subject.toLowerCase()) ? 1 : -1
                })
            } else {
                this.emails.sort((a, b) => {
                    return (a.subject.toLowerCase()<b.subject.toLowerCase()) ? 1 : -1
                })
            }
            this.sortTitleAZ = !this.sortTitleAZ
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
                var emailsToShow = this.emails.filter(email => {
                    return email.subject.toLowerCase().includes(searchStr) && email.isRead + '' == this.filterBy.read
                });
            }
            if (this.filterBy.read) {
                var emailsToShow = this.emails.filter(email => {
                    return email.isRead + '' == this.filterBy.read
                });
            }
            return emailsToShow;
        },
        unreadEmails() {
            const unreadEmails = this.emails.filter(email => {
                return !email.isRead
            })
            return unreadEmails.length
        }

    }
}

