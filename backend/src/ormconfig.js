module.exports = {
    "type": "postgres",
    "port": 5432,
    "host": process.env.DB_HOST,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "username": process.env.DB_USERNAME,
    "migrations": ["database/migrations/*.ts"],
    "entities": ["entities/*.ts"],
    "cli": {
        "migrationsDir": "database/migrations",
        "entitiesDir": "entities"
    }
}