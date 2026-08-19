import Link from 'next/link'

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-[10rem] font-bold leading-none text-gold-gradient opacity-20">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-[-3rem] mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/en" className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  )
}
