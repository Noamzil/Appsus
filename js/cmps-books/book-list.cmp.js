import bookPreview from '../cmps-books/book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
            <ul class="book-list">
                <li v-for="book in books" :key="book.id" class="book-list-container">
                    <book-preview :book="book"/>
                    <div class="actions">
                        <!-- <button @click="select(book)" >Details</button> -->
                        <router-link :to="'/book/'+book.id">Details</router-link>
                    </div>
                </li>
            </ul>
    `,
     components: {
        bookPreview
    },
    methods: {
        select(book) {
            this.$emit('selected', book)
        }
    }
}