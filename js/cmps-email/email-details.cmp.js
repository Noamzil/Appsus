import { emailService } from '../services/email-service.js';

export default {
  template: `
        <section class="email-details">
            <h1>Hello</h1>
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
    console.log(emailId);
    emailService.getById(emailId).then((email) => {
      console.log(email);
      this.email = email;
    });
  },
};
