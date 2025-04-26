import { User, Contact } from "../types";

const ADMIN_EMAIL = "hassangazder3@gmail.com";

export const sendRegistrationEmail = (user: User): void => {
  console.log(`
====== SIMULATED EMAIL TO ADMIN ======
To: ${ADMIN_EMAIL}
Subject: New User Registration

A new user has registered on your travel agency platform:

User Details:
- Name: ${user.firstName} ${user.lastName}
- Username: ${user.username}
- Email: ${user.email}
- Role: ${user.role}
- Registration Time: ${new Date().toLocaleString()}

=====================================
  `);
};

export const sendContactFormEmail = (
  contact: Contact,
  agentEmail: string | null
): void => {
  // Email to admin
  console.log(`
====== SIMULATED EMAIL TO ADMIN ======
To: ${ADMIN_EMAIL}
Subject: New Contact Form Submission

A new contact form has been submitted:

Contact Details:
- Name: ${contact.fullName}
- Email: ${contact.email}
- Phone: ${contact.phone}
- Message: ${contact.message}
- Referred by Agent: ${contact.referringAgent}
- Submission Time: ${new Date().toLocaleString()}

=====================================
  `);

  // Email to referring agent if available
  if (agentEmail) {
    console.log(`
====== SIMULATED EMAIL TO AGENT ======
To: ${agentEmail}
Subject: New Contact Form Referral

A new contact has been referred through your link:

Contact Details:
- Name: ${contact.fullName}
- Email: ${contact.email}
- Phone: ${contact.phone}
- Message: ${contact.message}
- Submission Time: ${new Date().toLocaleString()}

Please follow up with this lead as soon as possible.

=====================================
    `);
  }
};