export default {
    props: ['email'],
    template: `
        <div class="email-preview">
            <img src="/img/email-img/sender.png" class="sender-img">
            <h3>{{senderName}} </h3>
            <h3>{{email.subject}} </h3>
            <p>{{email.body}} </p>
            <div>
                <p>DELETE</p>
                <p>{{readingStatus}}</p>
            </div>
        </div>
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
            return (this.email.isRead)? 'V' :'X'
        }
    }
}