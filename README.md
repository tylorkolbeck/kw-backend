# Killer Whale Documentation

## Environment Variables

Adjust these environment variables to match the environment that you are working in

### Database variables

```
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=killerwhale_dev
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
DATABASE_SSL=false
```

### Admin dashboard variables

```
ADMIN_JWT_SECRET
ADMIN_PORT=1337
ADMIN_HOST=0.0.0.0
```

### Email server variables

```
EMAIL_PROVIDER
EMAIL_SMTP_HOST
EMAIL_SMTP_PORT
EMAIL_SMTP_USER
EMAIL_SMTP_PASS
EMAIL_ADDRESS_FROM
EMAIL_ADDRESS_REPLY_TO
```

### AWS s3 bucket variables

```
AWS_ACCESS_KEY_ID
AWS_ACCESS_SECRET
AWS_BUCKET
AWS_REGION
```

## Start Strapi Server

`npm run develop`

## Auth End Points

**/auth/local**

request body:

```
  {
    "identifier": "email@email.com",
    "password: "password"
  }
```

response:

```
{
    "jwt": "generatedToken",
    "user": {
        "id": 1,
        "username": "testuser",
        "email": "email@email.com",
        "provider": "local",
        "confirmed": true,
        "blocked": null,
        "role": {
            "id": 1,
            "name": "Authenticated",
            "description": "Default role given to authenticated user.",
            "type": "authenticated"
        },
        "created_at": "2021-01-25T23:54:07.000Z",
        "updated_at": "2021-01-25T23:54:27.000Z"
    }
}
```

**/auth/local/register**

When a user register they will be emailed a verification link to the provided email. They will not be able to login until they follow the link provided.

request body:

```
{
    "email" : "email@email.com",
    "username" : "userName",
    "password" : "password"
}
```

response:

```
{
    "user": {
        "id": 1,
        "username": "userName",
        "email": "email@email.com",
        "provider": "local",
        "confirmed": null,
        "blocked": null,
        "role": {
            "id": 1,
            "name": "Authenticated",
            "description": "Default role given to authenticated user.",
            "type": "authenticated"
        },
        "created_at": "2021-01-26T01:33:16.000Z",
        "updated_at": "2021-01-26T01:33:16.000Z"
    }
}
```

Todo:

[] Dev environment database re-seed.
