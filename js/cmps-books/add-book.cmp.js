import { utilService } from '../services/util-service.js'
import { bookService } from '../services/book-service.js'

export default {
    props: ['books'],
    template: `
        <section class="add-book">
            <label>Add Book</label>
            <input type="search" v-model="bookName" @input="getBooks">
            <ul >
                <li v-for="book in booksRes" :key="book.id">
                    <span> {{book.volumeInfo.title}} </span>
                    <button @click="addBook(book)">+</button>      
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            bookName: null,
            booksRes: null
        }
    },
    methods: {
        getBooks() {
            const URL = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.bookName}`
            fetch(URL)
                .then(res => res.json())
                .then(books => this.booksRes = books.items)
        },
        addBook(book) {
            var book = bookService.addGoogleBook(book)
            this.books.push(book)
            utilService.saveToStorage('books', this.books)
        }
    },
}