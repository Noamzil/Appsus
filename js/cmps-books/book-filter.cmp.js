export default {
    template: `
     <div class="book-filter">
            <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            <label>Price:</label>
            <input @input="filter" v-model="filterBy.price" type="range" min="0" max="500" title="value">
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                price: +''
            }
        }
    }, 
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        }
    }

}