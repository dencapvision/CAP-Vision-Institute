export interface EmailAddress {
  email: string;
  name?: string;
}

export interface TransactionalEmail {
  to: EmailAddress[];
  from: EmailAddress;
  subject: string;
  html: string;
  text?: string;
  replyTo?: EmailAddress;
  tags?: Record<string, string>;
}
