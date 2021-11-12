import { bookService } from '../services/book-service.js';
import { utilService } from '../services/util-service.js';
import bookList from '../cmps-books/book-list.cmp.js'
import bookFilter from '../cmps-books/book-filter.cmp.js'
import addBook from '../cmps-books/add-book.cmp.js'


export default {
    template: `
        <section class="book-app">
            <add-book :books="books"></add-book>
            <book-filter @filtered="setFilter"/>
            <book-list :books="booksToShow" @selected="selectBook"/>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: {
                title: null,
                price:null
            },
            selectedBook: null
        }
    },
    components: {
        bookList,
        bookFilter,
        addBook
    },
    created() {
        this.loadBooks()
        
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy.title = filterBy.title;
            this.filterBy.price = filterBy.price
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        loadBooks() {
            const books = (utilService.loadFromStorage('books'))
            if (books) this.books = books
            else {
                bookService.query()
                .then(books => this.books = books)
            }
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy.title && !this.filterBy.price) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr) && book.listPrice.amount < this.filterBy.price;
            });
            return booksToShow;
        }
    }
}