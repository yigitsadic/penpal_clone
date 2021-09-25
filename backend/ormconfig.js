module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5500,
  "username": "penpal",
  "password": "password",
  "database": "penpal_clone",
  "entities": ["src/**/*.entity.ts"],
  "migrations": ["migrations/*.ts"],
  "cli": {
    "migrationsDir": "migrations"
  }
}