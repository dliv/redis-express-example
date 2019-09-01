# Redis Express Example

A tiny Express api to compare Redis and SQL.

The example api manages a set of genres (tags).

## Running

Run with your choice of backend, one of:

```
npm run start:memory  # will use a Set; server restarts clear all data
npm run start:redis   # requires Redis running locally
npm run start:sql     # uses sqlite and creates a gitignored tmp file
```

Visit [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) to see available endpoints.

[![Swagger Image](/swagger.png)](http://localhost:3000/api-docs/)
