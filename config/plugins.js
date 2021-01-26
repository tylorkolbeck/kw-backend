module.exports = ({ env }) => {
  const email_dev = {
    provider: "console",
  };

  const email_prod = {
    provider: process.env.EMAIL_PROVIDER,
    providerOptions: {
      host: process.env.EMAIL_SMTP_HOST,
      port: process.env.EMAIL_SMTP_PORT,
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS,
      },
    },
    settings: {
      defaultFrom: process.env.EMAIL_ADDRESS_FROM,
      defaultReplyTo: process.env.EMAIL_ADDRESS_REPLY,
    },
  };

  const emailSettings =
    process.env.NODE_ENV === "development" ? email_dev : email_prod;

  return {
    email: {
      ...emailSettings,
    },
  };
};
