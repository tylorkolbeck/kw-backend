module.exports = ({ env }) => ({
  host: process.env.ADMIN_HOST,
  port: process.env.ADMIN_PORT,
  url: process.env.URL,
  admin: {
    auth: {
      secret: process.env.ADMIN_JWT_SECRET,
    },
  },
});
