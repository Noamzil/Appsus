import { emailService } from '../services/email-service.js';

export default {
  template: `
        <section v-if="email" class="email-details">
          <router-link to="/email" class="details-return" title="Back"><i class="fas fa-arrow-left "></i></router-link>
            <div class="email-details-container">
              <h1 class="subject">{{email.subject}}</h1>
              <hr>
              <div class="sender-details">
                <h1 class="sender-img-details">  {{firstLetter}}</h1>
                <h3 class="from"> {{senderName}} <span class="sender-email"><{{email.from}}> </span></h3>
              </div>
              <hr>
              <p class="body">{{email.body}}</p>
            </div>
        </section>
    `,
  data() {
    return {
      email: null,
    };
  },
  created() {
    const { emailId } = this.$route.params;
    emailService.getById(emailId).then((email) => {
      this.email = email;
    });
  },
  computed: {
    senderName() {
      return this.email.from.split('@')[0]
  },
  firstLetter() {
    return this.email.from.slice(0,1).toUpperCase()
}
  }
};
