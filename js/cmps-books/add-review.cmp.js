import { bookService } from "../services/book-service.js";
import { utilService } from "../services/util-service.js";

export default {
  template: `
        <form class="review-add" @submit.prevent="save">
            <ul  v-if="bookReviews" class="reviews-details">
              <li v-for="review in bookReviews">
                <p>{{ review.fullName }} :     {{ review.freeTxt }}  <button @click="removeReview(review.id)"> X </button></p> 
            </li>
            </ul>
            <h1>Add Review</h1>
            <input v-model="currReview.fullName" type="text" value="Books Reader" placeholder="Name..."><br>
            <input v-model="currReview.rate" type="number" placeholder="Rate 1-5"><br>
            <label for="date"> Read at</label>
            <input v-model="currReview.readAt" name="date" type="date"><br>
            <textarea v-model="currReview.freeTxt" name="Text1" cols="40" rows="5"></textarea>
            <button>Save</button>
        </form>
    `,
  data() {
    return {
      bookReviews: null,
      currReview: null,
    };
  },
  created() {
    const { bookId } = this.$route.params;
    var reviews = bookService.getBookReviews(bookId);
    this.bookReviews = reviews;
    if (this.bookReview) {
      bookService
        .getBookReviews(bookId)
        .then((reviews) => (this.bookReviews = reviews));
    } else this.currReview = bookService.getEmptyReview();
  },
  methods: {
    save() {
      if (!this.currReview.freeTxt) return;
      const { bookId } = this.$route.params;
      bookService.saveReview(bookId, this.currReview);
      this.bookReviews = utilService.loadFromStorage(bookId);
      this.currReview = bookService.getEmptyReview();
    },
    removeReview(reviewId) {
      var reviewIdx = this.bookReviews.findIndex(
        (review) => review.id === reviewId
      );
      this.bookReviews.splice(reviewIdx, 1);
      const { bookId } = this.$route.params;
      utilService.saveToStorage(bookId, this.bookReviews);
    },
  },
};
