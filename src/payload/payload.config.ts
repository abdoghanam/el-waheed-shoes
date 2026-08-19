import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Inquiries } from './collections/Inquiries'
import { Users } from './collections/Users'
import { Navigation } from './collections/Navigation'
import { Blog } from './collections/Blog'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUri = process.env.DATABASE_URI

const dbAdapter = databaseUri
  ? postgresAdapter({
      pool: {
        connectionString: databaseUri,
      },
    })
  : sqliteAdapter({
      client: {
        url: 'file:' + path.resolve(dirname, '..', '..', 'database.db'),
      },
    })

const blobToken = process.env.BLOB_READ_WRITE_TOKEN

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
    meta: {
      titleSuffix: ' | EL WAHEED SHOES Admin',
      description: 'Admin dashboard for EL WAHEED SHOES - Egyptian Footwear Manufacturer',
    },
    components: {
      views: {
        dashboard: {
          Component: '@/components/admin/CustomDashboardView',
          path: '/',
          meta: {
            title: 'Dashboard | EL WAHEED SHOES',
          },
        },
      },
    },
  },
  editor: lexicalEditor(),
  collections: [
    Products,
    Categories,
    Media,
    Pages,
    Inquiries,
    Users,
    Navigation,
    Blog,
  ],
  globals: [SiteSettings, HomePage, Header, Footer],
  secret: process.env.PAYLOAD_SECRET ?? (() => { throw new Error('PAYLOAD_SECRET is required') })(),
  typescript: {
    outputFile: path.resolve(dirname, '..', 'payload-types.ts'),
  },
  db: dbAdapter,
  plugins: blobToken
    ? [
        vercelBlobStorage({
          collection: 'media',
          token: blobToken,
        }),
      ]
    : [],
})
