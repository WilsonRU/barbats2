import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
        return knex.schema.createTable("users", (table) => {
        table.increments("id").primary().unique();

        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("name").notNullable();

        table.timestamps();
        table.timestamp("deleted_at").nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}

