import Image from 'next/image';

export default function Results() {
  return (
    <div style={{ background: '#fff7f0', minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '32px 0' }}>
      {/* Block 1: Title */}
      <div style={{ width: '100%', maxWidth: 660, margin: '0 auto', padding: '0 16px' }}>
        <h1 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontWeight: 500, fontSize: 32, marginBottom: 50, marginTop: 36 }}>Your Perfect Bouquet</h1>
      </div>
      {/* Block 2: Image and Card Cohesive Block */}
      <div style={{ width: '100%', maxWidth: 660, margin: '0 auto' }}>
        <div style={{ width: '100%', height: 340, background: '#ede7df', borderTopLeftRadius: 22, borderTopRightRadius: 22, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            src="/bouquet-placeholder.jpg"
            alt="Bouquet"
            width={660}
            height={340}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ width: '100%', background: '#ede7df', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 22, borderBottomRightRadius: 22, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '32px 0 26px 0', fontFamily: 'Georgia, serif', color: '#3d3d3d' }}>
          <div style={{ padding: '0 32px' }}>
            <h2 style={{ fontWeight: 500, fontSize: 20, margin: 0, marginBottom: 8 }}>TIMELESS ELEGANCE</h2>
            <p style={{ fontSize: 16, margin: 0, marginBottom: 18 }}>
              A luxurious arrangement of white peonies, ivory ranunculus, and soft apricot garden roses, paired with silvery greens for a touch of grace.
            </p>
            <div style={{ fontWeight: 500, marginBottom: 6, fontSize: 16 }}>Why This Works:</div>
            <div style={{ fontSize: 15 }}>
              Perfect For Weddings Or Deeply Personal Moments, This Bouquet Blends Purity And Warmth — Evoking A Sense Of Serene Devotion And Refined Beauty.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
