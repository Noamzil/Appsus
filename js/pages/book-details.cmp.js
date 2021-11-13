import { bookService } from "../services/book-service.js";
import bookReview from "../cmps-books/add-review.cmp.js";

export default {
  template: `
        <section v-if="book" class="book-details">
            <h2>Book Details:</h2>
            <p>Title: {{book.title}}</p>
            <p>Subtitle: {{book.subtitle}}</p>
            <div class="price-container">
            <p>Price: <span :class="priceClass">{{book.listPrice.amount}}{{currToShow}}</span></p>
            <img v-if="book.listPrice.isOnSale" src="./img/sale.png" class="sale-img">
            </div>
            <img :src="book.thumbnail" class="book-img">
            <p>Description: {{book.description}}</p>
            <p>Author: {{book.authors[0]}}</p>
            <p>Publish Date: {{book.publishedDate}} {{publishDateType}}</p>
            <p>Language: {{book.language}}</p>
            <ul class="category-list">
                Categories:
                <li v-for="category in book.categories">
                    <p>{{category}}</p>
                </li>
            </ul>
            <p>Page Count: {{book.pageCount}} ({{pageCountType}}) </p>
            <button @click="addReview">Show Reviews</button>
            <bookReview v-if="isAddReview" @colsed="addReview"/>
        </section>
    `,
  data() {
    return {
      book: null,
      publishTime: null,
      isAddReview: false,
      bookReviews: null,
    };
  },
  components: {
    bookReview,
  },
  created() {
    const { bookId } = this.$route.params;
    bookService.getById(bookId).then((book) => {
      this.book = book;
    });
  },
  computed: {
    currToShow() {
      if (this.book.listPrice.currencyCode === "USD") return "$";
      else if (this.book.listPrice.currencyCode === "EUR") return "€";
      else if (this.book.listPrice.currencyCode === "ILS") return "₪";
    },
    pageCountType() {
      if (this.book.pageCount > 500) return "Long Reading";
      else if (this.book.pageCount > 200) return "Decent Reading";
      else if (this.book.pageCount < 100) return "Light Reading";
    },
    publishDateType() {
      this.publishTime = new Date().getFullYear() - this.book.publishedDate;
      if (this.publishTime > 10) return "- Veteran Book";
      else if (this.publishTime < 1) return "- New!";
    },
    priceClass() {
      return {
        Red: this.book.listPrice.amount > 150,
        Green: this.book.listPrice.amount < 20,
      };
    },
  },
  methods: {
    addReview() {
      this.isAddReview = !this.isAddReview;
    },
  },
};
