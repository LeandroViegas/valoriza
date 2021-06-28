module.exports = {
    "type": "postgres",
    "port": 5432,
    "host": process.env.DB_HOST,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "username": process.env.DB_USERNAME,
    "migrations": ["src/database/migrations/*.ts"],
    "entities": ["src/entities/*.ts"],
    "cli": {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    }
}