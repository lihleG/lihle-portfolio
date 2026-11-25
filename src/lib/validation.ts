/** Shared by the contact form (client) and /api/contact (server). */

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  messageMin: 10,
  messageMax: 2000,
  emailMax: 254,
} as const;

export function validateContact(input: Partial<Record<ContactField, unknown>>): {
  valid: boolean;
  errors: ContactErrors;
  data: ContactInput;
} {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const errors: ContactErrors = {};

  if (name.length < LIMITS.nameMin) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.nameMax) errors.name = `Name must be ${LIMITS.nameMax} characters or fewer.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.emailMax || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";

  if (message.length < LIMITS.messageMin)
    errors.message = `Tell me a little more — at least ${LIMITS.messageMin} characters.`;
  else if (message.length > LIMITS.messageMax)
    errors.message = `Message must be ${LIMITS.messageMax} characters or fewer.`;

  return { valid: Object.keys(errors).length === 0, errors, data: { name, email, message } };
}
