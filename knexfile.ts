import "dotenv/config";
import type { Knex } from "knex";

const config: Knex.Config = {
    client: "sqlite3",
    connection: {
      // connectionString: process.env.DATABASE_URL,
      filename: 'teste.sqlite'
    },
    migrations: {
      directory: "./migrations",
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: "./seeds",
    },
    pool: {
      min: 0,
      max: 7
    }
};

export default config;