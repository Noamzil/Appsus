import { emailService } from '../services/email-service.js'

export default {
    template: `
        <section class="new-email-container">
            <div class="new-email-head">
                <h3>New Email </h3>
                <button @click="close" >X</button>
            </div>
            <form v-if="newEmail" class="new-email" @submit.prevent="saveEmail">
                <label>To</label>
                <input type="text" class="email-to" v-model="newEmail.to">
                <label>Subject</label>
                <input type="text" class="email-subject" v-model="newEmail.subject">
                <textarea class="email-content" v-model="newEmail.body"></textarea>
                <button @click="saveEmail"> Send </button>
            </form>
        </section>
    `,
    data() {
        return {
            newEmail: null
        }
    },
    created() {
        this.newEmail = emailService.getEmptyMail()
        this.draftInterval()
    },
    methods: {
        close() {
            this.$emit('close')
            this.saveDraft()
        },
        saveEmail() {
            emailService.save(this.newEmail)
            this.$emit('addEmail')
        },
        saveDraft() {
            this.$emit('saveDraft', this.newEmail)
        },
        draftInterval() {
            setInterval(() => {
                this.saveDraft()
            }, 5000);
        }
    }
}