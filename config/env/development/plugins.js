module.exports = ({ env }) => {
  return {
    email: {
      provider: "console",
    },

    upload: {
      provider: "s3",
      providerOptions: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        region: process.env.AWS_REGION,
        publicFiles: false,
        baseUrl: "https://duj27fxoqhxbb.cloudfront.net",
        params: {
          Bucket: process.env.AWS_BUCKET,
        },
      },
    },

    // email: {
    //   provider: process.env.EMAIL_PROVIDER,
    //   providerOptions: {
    //     host: process.env.EMAIL_SMTP_HOST,
    //     port: process.env.EMAIL_SMTP_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SMTP_USER,
    //       pass: process.env.EMAIL_SMTP_PASS,
    //     },
    //   },
    //   settings: {
    //     defaultFrom: process.env.EMAIL_ADDRESS_FROM,
    //     defaultReplyTo: process.env.EMAIL_ADDRESS_REPLY,
    //   },
    // },
    email: {
      provider: process.env.EMAIL_PROVIDER,
      providerOptions: {
        mandrill_api_key: process.env.EMAIL_SMTP_PASS,
        mandrill_default_from_name: process.env.EMAIL_SMTP_USER,
        mandrill_default_from_email: process.env.EMAIL_ADDRESS_FROM,
        mandrill_subaccount: "noreply",

        // host: process.env.EMAIL_SMTP_HOST,
        // port: process.env.EMAIL_SMTP_PORT,
        // auth: {
        //   user: process.env.EMAIL_SMTP_USER,
        //   pass: process.env.EMAIL_SMTP_PASS,
        // },
      },
      // settings: {
      //   defaultFrom: process.env.EMAIL_ADDRESS_FROM,
      //   defaultReplyTo: process.env.EMAIL_ADDRESS_REPLY,
      // },
    },
  };
};
