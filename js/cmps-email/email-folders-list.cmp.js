export default {
    props:['unread'],
    template: `
        <section class="email-folders-list">
            <button class="new-mail"> New Mail</button>
                <p @click="changeTxt('inbox')"> Inbox ({{unread}})</p>
                <p @click="changeTxt('sent')">Sent</p>    
                <p @click="changeTxt('trash')">Trash</p>    
                <p @click="changeTxt('draft')">Draft</p>    
        </section>
    `,
    data() {
        return {
            type: 'inbox'
        }
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
        }
    }
}