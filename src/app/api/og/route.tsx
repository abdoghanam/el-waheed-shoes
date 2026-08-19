import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get('title') || 'EL WAHEED SHOES').slice(0, 200)
  const subtitle = (searchParams.get('subtitle') || 'Premium Egyptian Footwear Manufacturer').slice(0, 300)

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        color: 'white',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8960C)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#0a0a0a' }}>W</span>
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>EL WAHEED SHOES</span>
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 800, textAlign: 'center', maxWidth: 800, margin: '0 0 16px' }}>{title}</h1>
        <p style={{ fontSize: 24, color: '#D4AF37', textAlign: 'center' }}>{subtitle}</p>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
