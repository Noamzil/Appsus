export default {
    template: `
        <section class="email-folders-list">
            <button class="new-mail"> New Mail</button>
            <ul>
                <li @click="getType"> Inbox</li>    
                <li>sent</li>    
                <p>trash</p>    
                <p>draft</p>    
            </ul>
        </section>
    `,
    data() {
       return {
        type: 'inbox'
       }
    },
    methods: {
        getType(val) {
            console.log(val);
            this.type = val 
        }
        }
        //     this.$emit('type', { ...this.filterBy });
}