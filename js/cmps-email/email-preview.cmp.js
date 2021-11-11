export default {
    props: ['email'],
    name: 'email-preview',
    template: `
        <section class="email-preview" @click="changePreview">
            <input type="checkbox">
            <div class="email-sender">   
                <img src="/img/email-img/sender.png" class="sender-img">
                <h3>{{senderName}} </h3>
            </div>
            <h3>{{email.subject}} </h3>
            <p v-if="isShortText" class="email-body" :class="prevClass">{{shortText}}</p>
            <p v-else class="email-body" :class="prevClass">{{longTxt}}</p>
            <div class="email-actions">
                <p @click="deleteEmail">🗑️</p>
                <p @click="changeReadingStatus"><i class="far fa-envelope"></i></p>
            </div>
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
            return this.longTxt.split(' ').slice(0,10).join(' ') + ' ...'
        },
        prevClass() {
            if (this.longTxt.split(' ').length > 20) return 'longTxt'
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