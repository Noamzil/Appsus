export default {
    props: ['email'],
    name: 'email-preview',
    template: `
        <section class="email-preview" :class="readEmail">
            <p @click="starEmail" class="star"><i class="far fa-star" :class="isStarred"></i></p>
            <div class="email-sender"  @click="changePreview">   
                <img v-if="email.senderImg" :src="senderImg" class="sender-img">
                <h1 v-else class="sender-img">  {{firstLetter}}</h1>
                <h3 v-if="email.senderName" class="sender-name" >{{email.senderName}} </h3>
                <h3 v-else class="sender-name" >{{senderName}} </h3>
            </div>
            <div  class="email-display" @click="changePreview">
                <h3 class="email-subject-list">{{email.subject}} </h3>
                <p v-if="isShortText" class="email-body">{{shortText}}</p>
                <p v-else class="email-body email-body-longTxt">{{longTxt}}</p>
            </div>
            <div class="email-actions" >
                <p @click="deleteEmail"><i class="far fa-trash-alt"></i></p>
                <p v-if="email.isRead" @click="changeReadingStatus"><i class="far fa-envelope-open"></i></p>
                <p v-else @click="changeReadingStatus"><i class="far fa-envelope"></i></p>
            </div>
            <p class="email-date"  @click="changePreview">{{sentAt}}</p>
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
            return { 'longTxt': this.longTxt.split(' ').length > 20, 'longTextDiv': !this.isShortText }
            if (this.longTxt.split(' ').length > 20) return 'longTxt'
        },
        sentAt() {
            const month = new Date(this.email.sentAt).toString().slice(4, 10)
            return month
        },
        firstLetter() {
            return this.email.from.slice(0, 1).toUpperCase()
        },
        isStarred() {
            if (!this.email.isStarred) return 'star-empty'
            else return 'star-full'
        },
        senderImg() {
            return `./img/email-img/senders-img/${this.email.senderName}.jpg`
        },
        readEmail() {
            if (this.email.isRead) return 'readEmail'
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
        },
        starEmail() {
            this.email.isStarred = !this.email.isStarred
            this.$emit('starred')
        }
    }
}