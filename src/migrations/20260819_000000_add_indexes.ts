import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs) {
  // Add indexes for frequently queried/filter/sorted fields
  const queries = [
    // Products
    'CREATE INDEX IF NOT EXISTS products_is_active_idx ON products (is_active)',
    'CREATE INDEX IF NOT EXISTS products_featured_idx ON products (featured)',
    'CREATE INDEX IF NOT EXISTS products_sort_order_idx ON products (sort_order)',
    'CREATE INDEX IF NOT EXISTS products_slug_idx ON products (slug)',
    // Blog/Posts
    'CREATE INDEX IF NOT EXISTS posts_status_idx ON posts (status)',
    'CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts (published_at)',
    'CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts (slug)',
    // Inquiries
    'CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status)',
    'CREATE INDEX IF NOT EXISTS inquiries_priority_idx ON inquiries (priority)',
    'CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries (email)',
  ]

  for (const query of queries) {
    try {
      await payload.db.drizzle.execute(query)
    } catch (e) {
      // Index may already exist, continue
      console.warn(`Index creation skipped: ${e}`)
    }
  }
}

export async function down({ payload }: MigrateDownArgs) {
  const queries = [
    'DROP INDEX IF EXISTS products_is_active_idx',
    'DROP INDEX IF EXISTS products_featured_idx',
    'DROP INDEX IF EXISTS products_sort_order_idx',
    'DROP INDEX IF EXISTS products_slug_idx',
    'DROP INDEX IF EXISTS posts_status_idx',
    'DROP INDEX IF EXISTS posts_published_at_idx',
    'DROP INDEX IF EXISTS posts_slug_idx',
    'DROP INDEX IF EXISTS inquiries_status_idx',
    'DROP INDEX IF EXISTS inquiries_priority_idx',
    'DROP INDEX IF EXISTS inquiries_email_idx',
  ]

  for (const query of queries) {
    try {
      await payload.db.drizzle.execute(query)
    } catch (e) {
      console.warn(`Index drop skipped: ${e}`)
    }
  }
}
