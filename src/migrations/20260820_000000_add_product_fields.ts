import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const columns = [
    sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSON`,
    sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS moq TEXT`,
    sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS lead_time TEXT`,
    sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS certifications JSON`,
    sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS weight TEXT`,
    sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS usage TEXT`,
  ]

  for (const query of columns) {
    try {
      await db.run(query)
    } catch {
      // Column may already exist
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // SQLite doesn't support DROP COLUMN before 3.35, skip
}
