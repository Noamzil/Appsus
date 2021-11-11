import newEmail from './new-email.cmp.js'
export default {
    props:['unread'],
    template: `
        <section class="email-folders-list">
            <button class="new-mail" @click="newMail"> New Mail</button>
                <p @click="changeTxt('inbox')"> Inbox ({{unread}})</p>
                <p @click="changeTxt('sent')">Sent</p>    
                <p @click="changeTxt('trash')">Trash</p>    
                <p @click="changeTxt('draft')">Draft</p>
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
            console.log('im here in folders');
            this.$emit('add')
        }
    }
}