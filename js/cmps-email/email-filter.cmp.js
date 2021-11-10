export default {
    template: `
        <section class="email-filter">
            <div class="email-search">
                <input @input="filter" v-model="filterBy.title" type="search" placeholder="Search Email">   
            </div>
            <div class="email-topbar">
                <select v-model="filterBy.read" @change="filter">
                    <option value="all">All</option>
                    <option value="true">Read</option>
                    <option value="false">Unread</option>
                </select>
            </div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: null,
                read: null,
                type: 'inbox'
            },
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        }
    }
}