import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Brian Mukwe Waliaula — Full-Stack Developer & Freelancer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#111112',
          color: '#f4f4ed',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, letterSpacing: 6, color: '#d2ff00' }}>
          <span>[ AVAILABLE FOR FREELANCE PROJECTS ]</span>
          <span>NAIROBI · KE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 110, fontWeight: 900, lineHeight: 1 }}>
            <span>BRIAN MUKWE</span>
            <span style={{ color: '#d2ff00' }}>.</span>
          </div>
          <div style={{ fontSize: 32, marginTop: 20, color: '#b4b8a5', letterSpacing: 4 }}>
            FULL-STACK DEVELOPER & FREELANCER
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 18, color: '#dde1d2', letterSpacing: 2 }}>
          <span style={{ border: '1px solid #3b3c38', padding: '8px 20px' }}>REACT</span>
          <span style={{ border: '1px solid #3b3c38', padding: '8px 20px' }}>AUTOMATION</span>
          <span style={{ border: '1px solid #3b3c38', padding: '8px 20px' }}>M-PESA / PESAPAL</span>
          <span style={{ border: '1px solid #3b3c38', padding: '8px 20px' }}>AI SYSTEMS</span>
        </div>
      </div>
    ),
    size
  );
}
