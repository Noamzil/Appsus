export default {
    template: `
     <div class="book-filter">
            <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            <label>Max price:</label>
            <input @input="filter" v-model="filterBy.price" type="range" min="0" max="250" title="value">
            <span> {{filterBy.price}}</span>
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