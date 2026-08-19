export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-2 border-gold/20 rounded-full" />
          <div className="absolute top-0 left-0 w-20 h-20 border-2 border-transparent border-t-gold rounded-full animate-spin" />
        </div>
        <div className="mt-6">
          <span className="text-gold font-bold text-xl tracking-wider">EL WAHEED</span>
          <span className="text-white font-light text-lg ml-2">SHOES</span>
        </div>
      </div>
    </div>
  )
}
