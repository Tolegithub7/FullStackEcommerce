import { integer, pgTable, timestamp, varchar, doublePrecision } from 'drizzle-orm/pg-core';
import { usersTable } from './usersSchema.js';
import { productsTable } from './productsSchema.js';

export const ordersTable = pgTable('orders', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp().notNull().defaultNow(),
    status: varchar({ length: 50}).notNull().default('New'),

    userId: integer()
        .references(() => usersTable.id)
        .notNull(),
});

export const orderItemsTable = pgTable('order_items', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    orderId: integer()
       .references(() => ordersTable.id)
       .notNull(),

    productId: integer()
       .references(() => productsTable.id)
       .notNull(),

    quantity: integer().notNull(),
    price: doublePrecision().notNull(),
});
