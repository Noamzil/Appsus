export default {
    props: ['email'],
    name: 'email-preview',
    template: `
        <section class="email-preview">
            <div class="email-sender">   
                <img src="/img/email-img/sender.png" class="sender-img">
                <h3>{{senderName}} </h3>
            </div>
            <div @click="changePreview" class="email-display">
                <h3>{{email.subject}} </h3>
                <p v-if="isShortText" class="email-body" :class="prevClass">{{shortText}}</p>
                <p v-else class="email-body" :class="prevClass">{{longTxt}}</p>
            </div>
            <div class="email-actions">
                <p @click="deleteEmail">🗑️</p>
                <p @click="changeReadingStatus">{{readingStatus}}</p>
            </div>
            <p>{{sentAt}}</p>
        </section>
    `,
    data() {
        return {
            longTxt: this.email.body,
            isShortText: true
        }
    },
    computed: {
        senderName() {
            return this.email.from.split('@')[0]
        },
        readingStatus() {
            return (this.email.isRead) ? '📨' : '✉️'
        },
        NewEmails() {
            emailsPrev = this.emails.split
        },
        shortText() {
            if (this.longTxt.split(' ').length < 20) return this.longTxt
            return this.longTxt.split(' ').slice(0, 10).join(' ') + ' ...'
        },
        prevClass() {
            if (this.longTxt.split(' ').length > 20) return 'longTxt'
        },
        sentAt() {
            const month = new Date(this.email.sentAt).toString().slice(4,10) 
            return month
        }
    },
    methods: {
        changeReadingStatus() {
            this.email.isRead = !this.email.isRead
        },
        deleteEmail() {
            this.$emit('delete', this.email.id)
        },
        changePreview() {
            this.isShortText = !this.isShortText
        }
    }
}