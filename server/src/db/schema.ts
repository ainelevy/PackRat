import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// User
export const User = sqliteTable('User', {
	id: text('id').primaryKey(),
	name: text("name"),
	password: text("password"),
	email: text('email').notNull(),
	token: text("token"),
	code: text("code"),
	googleId: text("google_id"),
	is_certified_guide: integer("is_certified_guide"),
	passwordResetToken: text("password_reset_token"),
	passwordResetTokenExpiration: integer('password_reset_token_expiration', { mode: 'timestamp' }),
	role: text('role').default("user"),
	username: text("username"),
	profileImage: text("profile_image"),
	preferredWeather: text("preferred_weather"),
	preferredWeight: text("preferred_weight"),
	favorites: text("favorites"),
	packs: text("packs"),
	items: text("items"),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }),
	favorite: text('pack[]_undefined'),
	pack: text('pack[]_undefined'),
	item: text('item_id)').references(()=> item.id),
	templates: text('template[]_undefined'),
	trips: text('trip[]_undefined'),
	Pack: text('pack[]_undefined'),
  });

export type User = InferSelectModel<typeof User>;
export type InsertUser = InferInsertModel<typeof User>;
export const insertUserSchema = createInsertSchema(User);
export const selectUserSchema = createSelectSchema(User);

export const geojson = sqliteTable("geojson", {
	id: text('id').primaryKey(),
	type: text("type"),
	properties: text('json_undefined'),
	geometry: text('geojsongeometry_undefined'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const itemcategory = sqliteTable("itemcategory", {
	id: text('id').primaryKey(),
	name: text('itemcategoryname_undefined'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	// Item: text('item[]_undefined'),

	// @@map("itemcategories"): undefined,
})

export const item = sqliteTable("item", {
	id: text('id').primaryKey(),
	name: text("name"),
	weight: text('float_undefined'),
	quantity: integer("quantity"),
	unit: text("unit"),
	global: integer("global").default(0),
	packs: text("packs"),
	owners: text("owners"),
	category: text("category"),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	type: text("type"),
	itemCategory: text('itemcategory_id)').references(()=> itemcategory.id),
	pack: text('pack[]_id)').references(()=> pack.id),
	owner: text('user[]_undefined'),
	// @@map("items"): undefined,
})

export const pack = sqliteTable("pack", {
	id: text('id').primaryKey(),
	name: text("name"),
	owner_id: text("owner_id"),
	owners: text("owners"),
	trips: text("trips"),
	is_public: integer("is_public"),
	grades: text('packsgrades_undefined'),
	scores: text('packsscores_undefined'),
	type: text("type").default("pack"),
	items: text("items"),
	favorited_by: text("favorited_by"),
	createdAt: text("created_at"),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	item: text('item[]_id)').references(()=> item.id),
	favoritedBy: text('user[]_undefined'),
	owner: text('user_id)').references(()=> User.id),
	//: text('virtuals_undefined'),
	total_weight: text('float_undefined'),
	total_scores: integer("total_scores"),
	favorites_count: integer("favorites_count"),
	// @@map("packs"): undefined,
	})

export const template = sqliteTable("template", {
	id: text('id').primaryKey(),
	type: text('templatetype_undefined'),
	templateId: text("template_id"),
	isGlobalTemplate: integer("is_global_template").default(0),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	createdBy: text('user_id)').references(()=> User.id),
	// @@map("templates"): undefined,
	})

export const trip = sqliteTable("trip", {
	id: text('id').primaryKey(),
	name: text("name"),
	description: text("description"),
	duration: text("duration"),
	weather: text("weather"),
	start_date: integer('created_at', { mode: 'timestamp' }),
	end_date: integer('created_at', { mode: 'timestamp' }),
	destination: text("destination"),
	owner_id: text("owner_id"),
	is_public: integer("is_public"),
	type: text("type").default("trip"),
	packs: text("packs"),
	geojson: text('geoJson_id').references(()=> geojson.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	owner: text('user_id)').references(()=> User.id),

	// @@map("trips"): undefined,
	})
export type Trip = InferSelectModel<typeof trip>;
export type InsertTrip = InferInsertModel<typeof trip>;
export type UpdateTrip = Partial<InsertTrip> & { id: string };
export const insertTripSchema = createInsertSchema(trip);
export const selectTripSchema = createSelectSchema(trip);

export const conversation = sqliteTable("conversation", {
	id: text('id').primaryKey(),
	userId: text("user_id"),
	history: text("history"),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' })

	// @@map("conversations"): undefined,
	})

export const way = sqliteTable("way", {
	id: text('id').primaryKey(),
	osm_id: integer("osm_id"),
	osm_type: text("osm_type").default("way"),
	tags: text('json_undefined'),
	nodes: text("nodes"),
	geoJSON: text('json_undefined'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updated_at: integer('created_at', { mode: 'timestamp' })

	// @@map("ways"): undefined,
	})

export const node = sqliteTable("node", {
	id: text('id').primaryKey(),
	osm_id: integer("osm_id"),
	lat: text('float_undefined'),
	lon: text('float_undefined'),
	osm_type: text("osm_type").default("node"),
	tags: text('json_undefined'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updated_at: integer('created_at', { mode: 'timestamp' }),

	// @@map("nodes"): undefined,
	})

export const relation = sqliteTable("relation", {
	id: text('id').primaryKey(),
	osm_id: integer("osm_id"),
	osm_type: text("osm_type").default("relation"),
	tags: text('json_undefined'),
	members: text('member[]_undefined'),
	geoJSON: text('json_undefined'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updated_at: integer('created_at', { mode: 'timestamp' }),

	// @@map("relations"): undefined,
})
