export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <p>{{book.title}} </p>
            <img :src="book.thumbnail" class="book-list-img">
            <p>{{book.listPrice.amount}} {{currToShow}} </p>
        </div>
    `,
    data() {
        return {
            priceCurrency: this.book.listPrice.currencyCode
        }
    },
    computed: {
        currToShow() {
            if (this.priceCurrency === 'USD') return '$'
            else if (this.priceCurrency === 'EUR') return '€'
            else if (this.priceCurrency === 'ILS') return '₪'
        }
    }
}