export default {
    props: ['email'],
    name: 'email-preview',
    template: `
        <section class="email-preview">
            <div class="email-sender">   
               <h1 class="sender-img">  {{firstLetter}}</h1>
                <h3 class="sender-name" >{{senderName}} </h3>
                <!-- :style=readStyle -->
            </div>
            <div @click="changePreview" class="email-display">
                <h3 class="email-subject-list">{{email.subject}} </h3>
                <p v-if="isShortText" class="email-body" :class="prevClass">{{shortText}}</p>
                <p v-else class="email-body" :class="prevClass">{{longTxt}}</p>
            </div>
            <div class="email-actions">
                <p @click="deleteEmail"><i class="far fa-trash-alt"></i></p>
                <p v-if="email.isRead" @click="changeReadingStatus">'<i class="far fa-envelope"></i>'</p>
                <p v-else @click="changeReadingStatus">'<i class="far fa-envelope-open"></i>'</p>
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
        readingStatus() {
            return (this.email.isRead) ? '📨' : '<i class="far fa-envelope-open"></i>'
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