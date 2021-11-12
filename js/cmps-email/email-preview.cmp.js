export default {
    props: ['email'],
    name: 'email-preview',
    template: `
        <section class="email-preview"  @click="changePreview">
            <div class="email-sender">   
               <h1 class="sender-img">  {{firstLetter}}</h1>
                <h3 class="sender-name" >{{senderName}} </h3>
            </div>
            <div v-if="isShortText" class="email-display" :class="longShortClass">
                <h3 class="email-subject-list">{{email.subject}} </h3>
                <p  class="email-body">{{shortText}}</p>
                <p class="email-body" hidden>{{longTxt}}</p>
            </div>
            <div class="email-actions">
                <p @click="deleteEmail"><i class="far fa-trash-alt"></i></p>
                <p v-if="email.isRead" @click="changeReadingStatus"><i class="far fa-envelope-open"></i></p>
                <p v-else @click="changeReadingStatus"><i class="far fa-envelope"></i></p>
            </div>
            <p class="email-date">{{sentAt}}</p>
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
        NewEmails() {
            emailsPrev = this.emails.split
        },
        shortText() {
            if (this.longTxt.split(' ').length < 20) return this.longTxt
            return this.longTxt.split(' ').slice(0, 10).join(' ') + ' ...'
        },
        longShortClass() {
            if (this.longTxt.split(' ').length > 20) return 'longTxt'
        },
        sentAt() {
            const month = new Date(this.email.sentAt).toString().slice(4,10) 
            return month
        },
        firstLetter() {
            return this.email.from.slice(0,1).toUpperCase()
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