import newEmail from './new-email.cmp.js'
export default {
    props: ['unread'],
    template: `
        <section class="email-folders-list">
            <div class="new-mail" @click="newMail">
                <h3> Compose </h3>
                <img src="./img/email-img/compose.png">
            </div>
                <p @click="changeTxt('inbox')"> <i class="fas fa-inbox"></i> Inbox ({{unread}})</p>
                <p @click="changeTxt('sent')"><i class="fas fa-paper-plane"></i> Sent</p>    
                <p @click="changeTxt('trash')"><i class="fas fa-trash"></i> Trash</p>    
                <p @click="changeTxt('draft')"><i class="fas fa-sticky-note"></i> Draft</p>
                <new-email v-if="isNewEmail" @close="newMail" @addEmail="addEmail"/>  
                  
        </section>
    `,
    data() {
        return {
            type: 'inbox',
            isNewEmail: false
        }
    },
    components: {
        newEmail
    },
    methods: {
        changeTxt(val) {
            switch (val) {
                case 'inbox':
                    this.type = 'inbox';
                    break;
                case 'sent':
                    this.type = 'sent';
                    break;
                case `trash`:
                    this.type = `trash`;
                    break;
                case `draft`:
                    this.type = `draft`;
                    break;
            }
            this.$emit('type', this.type)
        },
        setType() {
            this.$emit('type', { ...this.type })
        },
        newMail() {
            this.isNewEmail = !this.isNewEmail
        },
        addEmail() {
            this.$emit('add')
            // this.isNewEmail = false
        }
    }
}