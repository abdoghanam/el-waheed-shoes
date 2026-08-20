import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const indexes = [
    sql`CREATE INDEX IF NOT EXISTS products_is_active_idx ON products (is_active)`,
    sql`CREATE INDEX IF NOT EXISTS products_featured_idx ON products (featured)`,
    sql`CREATE INDEX IF NOT EXISTS products_sort_order_idx ON products (sort_order)`,
    sql`CREATE INDEX IF NOT EXISTS products_slug_idx ON products (slug)`,
    sql`CREATE INDEX IF NOT EXISTS posts_status_idx ON posts (status)`,
    sql`CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts (published_at)`,
    sql`CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts (slug)`,
    sql`CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status)`,
    sql`CREATE INDEX IF NOT EXISTS inquiries_priority_idx ON inquiries (priority)`,
    sql`CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries (email)`,
  ]

  for (const query of indexes) {
    await db.run(query)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const drops = [
    sql`DROP INDEX IF EXISTS products_is_active_idx`,
    sql`DROP INDEX IF EXISTS products_featured_idx`,
    sql`DROP INDEX IF EXISTS products_sort_order_idx`,
    sql`DROP INDEX IF EXISTS products_slug_idx`,
    sql`DROP INDEX IF EXISTS posts_status_idx`,
    sql`DROP INDEX IF EXISTS posts_published_at_idx`,
    sql`DROP INDEX IF EXISTS posts_slug_idx`,
    sql`DROP INDEX IF EXISTS inquiries_status_idx`,
    sql`DROP INDEX IF EXISTS inquiries_priority_idx`,
    sql`DROP INDEX IF EXISTS inquiries_email_idx`,
  ]

  for (const query of drops) {
    await db.run(query)
  }
}
