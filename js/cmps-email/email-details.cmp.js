import { emailService } from '../services/email-service.js';

export default {
  template: `
        <section class="email-details">
          <router-link to="/email">⬅️</router-link>
          <h1 class="subject">{{email.subject}}</h1>
          <h3 class="from">{{email.from}}</h3>
          <p class="body">{{email.body}}</p>
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
};
