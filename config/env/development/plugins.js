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
  };
};
