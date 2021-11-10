export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            <input type="checkbox">
            <div class="email-sender">   
                <img src="/img/email-img/sender.png" class="sender-img">
                <h3>{{senderName}} </h3>
            </div>
            <h3>{{email.subject}} </h3>
            <p>{{email.body}} </p>
            <div class="email-actions">
                <p>🗑️</p>
                <p @click="changeReadingStatus">{{readingStatus}}</p>
            </div>
        </section>
    `,
    data() {
        return {
            sender: null
        }
    },
    computed: {
        senderName() {
            return this.email.from.split('@')[0]
        },
        readingStatus() {
            return (this.email.isRead)? '📨' :'✉️'
        }
    },
    methods: {
        changeReadingStatus() {
            this.email.isRead = !this.email.isRead
        }
    }
}