import { ImageResponse } from 'next/og'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#060606',
          color: '#FAFAFA',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#C8A951',
              letterSpacing: '-1px',
            }}
          >
            EL WAHEED
          </div>
          <div style={{ fontSize: '48px', fontWeight: '300', color: '#FAFAFA' }}>
            SHOES
          </div>
        </div>
        <div
          style={{
            fontSize: '20px',
            color: '#A0A0A0',
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          Premium Egyptian Footwear Manufacturer
        </div>
        <div
          style={{
            fontSize: '16px',
            color: '#666',
            marginTop: '16px',
          }}
        >
          Since 2010 | Wholesale | OEM | Private Label
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
