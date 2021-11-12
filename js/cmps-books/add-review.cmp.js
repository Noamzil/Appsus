export default {
    template: `
    <section class="add-review-container"> 
        <h3>Review Book </h3>
        <form class="add-review">
            <input type="text" placeholder="Full Name" class="full-name">
            Rate Book (1-5)<select class="rate">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            Read at<input type="date" class="date">
            Review<textarea class="review-area"></textarea>
        </form>
        <button @click="$emit('closed')">Cancel</button>
    </section> 
        `,
}