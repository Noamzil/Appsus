export default {
    template: `
        <section class="email-filter">
            <div class="email-search">
                <input @input="filter" v-model="filterBy.title" type="search" placeholder="Search Email">   
            </div>
            <div class="email-topbar">
                <select v-model="filterBy.read" @change="filter">
                    <option value="">All</option>
                    <option value="true">Read</option>
                    <option value="false">Unread</option>
                </select>
                <div class="email-sort">
                    <p @click="sortDate" title="Sort By Date"> <i class="fas fa-sort"></i></p>
                    <p @click="sortTitle"> <i class="fas fa-sort-alpha-down"></i></p>
                </div>
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
        },
        sortDate() {
            this.$emit('sortDate')
        },
        sortTitle() {
            this.$emit('sortTitle')
        }
    }
}