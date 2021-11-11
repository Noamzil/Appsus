import { emailService } from '../services/email-service.js';

export default {
  template: `
        <section class="email-details">
          <h1>{{email.subject}}</h1>
          <h3>{{email.from}}</h3>
          <p>{{email.body}}</p>
            <p>{{email}}</p>
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
