import prefStyles from '../styles/Preferences.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Preferences() {
  const router = useRouter();
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('');
  const [otherOccasion, setOtherOccasion] = useState('');
  const [otherVibe, setOtherVibe] = useState('');
  const [details, setDetails] = useState('');

  const occasions = [
    'Wedding',
    'Graduation',
    'First Date',
    'Apology',
    'Birthday',
    'Sympathy',
  ];
  const vibes = [
    { label: 'Elegant', desc: 'Structured, balanced, classic colors' },
    { label: 'Romantic', desc: 'Soft textures, blush tones, dreamy' },
    { label: 'Wild', desc: 'Asymmetrical, garden-picked feel' },
    { label: 'Minimal', desc: 'Clean lines, monochrome or simple palette' },
    { label: 'Bright', desc: 'Bold, saturated, cheerful' },
    { label: 'Soft', desc: 'Muted, delicate, comforting' },
  ];

  const handleOccasionClick = (occasion) => {
    setSelectedOccasion(occasion);
    setOtherOccasion('');
  };
  const handleOtherOccasionChange = (e) => {
    setOtherOccasion(e.target.value);
    setSelectedOccasion('');
  };
  const handleVibeClick = (vibe) => {
    setSelectedVibe(vibe);
    setOtherVibe('');
  };

  const handleFindBouquet = () => {
    router.push({
      pathname: '/results',
      query: {
        occasion: selectedOccasion || otherOccasion,
        vibe: selectedVibe === '__other__' ? otherVibe : selectedVibe,
        details,
      },
    });
  };

  // Navigation bar from gallery.js
  return (
    <div style={{ width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', background: '#f9f4ee', boxSizing: 'border-box', margin: 0, padding: 0, overflow: 'hidden' }}>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9e3ea',
        boxShadow: '0 2px 8px rgba(179, 93, 106, 0.08)',
        padding: '0.7rem 2.5rem',
        gap: '2.5rem',
        borderBottom: '2px solid #bdb7a7',
        borderRadius: 0,
      }}>
        <a
          onClick={() => router.push('/')}
          style={{
            color: '#b35d6a',
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            textDecoration: 'none',
            cursor: 'pointer',
            padding: '0.3rem 0.8rem',
            borderRadius: '18px',
            transition: 'background 0.2s, color 0.2s',
            fontWeight: 500,
          }}
          onMouseOver={e => e.currentTarget.style.background = '#f9f4ee'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          Home
        </a>
        <a
          onClick={() => router.push('/gallery')}
          style={{
            color: '#b35d6a',
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            textDecoration: 'none',
            cursor: 'pointer',
            padding: '0.3rem 0.8rem',
            borderRadius: '18px',
            transition: 'background 0.2s, color 0.2s',
            fontWeight: 500,
          }}
          onMouseOver={e => e.currentTarget.style.background = '#f9f4ee'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          View Gallery
        </a>
        <a
          onClick={() => router.push('/florist')}
          style={{
            color: '#b35d6a',
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            textDecoration: 'none',
            cursor: 'pointer',
            padding: '0.3rem 0.8rem',
            borderRadius: '18px',
            transition: 'background 0.2s, color 0.2s',
            fontWeight: 500,
          }}
          onMouseOver={e => e.currentTarget.style.background = '#f9f4ee'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          Find Nearest Florist
        </a>
      </nav>
      <section className={prefStyles.prefSection} id="preferences" style={{ paddingTop: '1rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={prefStyles.prefContainer + ' ' + prefStyles.prefFlexContainer}>
          <h2 className={prefStyles.prefTitle}>Select Your Perfect Match</h2>
          <div className={prefStyles.prefOptionsRow}>
            <div className={prefStyles.group} style={{ flex: 1 }}>
              <label className={prefStyles.groupLabel}>Choose an Occasion</label>
              <div className={prefStyles.occasionRow}>
                {occasions.map((occasion) => (
                  <button
                    key={occasion}
                    className={`${prefStyles.occasionBtn} ${selectedOccasion === occasion ? prefStyles.selectedOption : ''}`}
                    onClick={() => handleOccasionClick(occasion)}
                    type="button"
                  >
                    {occasion}
                  </button>
                ))}
                <div className={prefStyles.otherInputWrap}>
                  <span>Other:</span>
                  <input
                    className={prefStyles.otherInput}
                    type="text"
                    value={otherOccasion}
                    onChange={handleOtherOccasionChange}
                    placeholder="Type here"
                  />
                </div>
              </div>
            </div>
            <div className={prefStyles.group} style={{ flex: 1 }}>
              <label className={prefStyles.groupLabel}>Choose a Vibe</label>
              <div className={prefStyles.vibeGrid}>
                <div className={prefStyles.vibeGridRow}>
                  {vibes.map((vibe) => (
                    <div className={prefStyles.vibeGridItem} key={vibe.label}>
                      <button
                        className={`${prefStyles.vibeBtn} ${selectedVibe === vibe.label ? prefStyles.selectedOption : ''}`}
                        onClick={() => handleVibeClick(vibe.label)}
                        type="button"
                        tabIndex={0}
                      >
                        {vibe.label}
                      </button>
                      <span className={prefStyles.vibeTooltip}>{vibe.desc}</span>
                    </div>
                  ))}
                  <div className={prefStyles.otherInputWrap}>
                    <span>Other:</span>
                    <input
                      className={prefStyles.otherInput}
                      type="text"
                      value={selectedVibe === '__other__' ? otherVibe : ''}
                      onFocus={() => handleVibeClick('__other__')}
                      onChange={e => { setSelectedVibe('__other__'); setOtherVibe(e.target.value); }}
                      placeholder="Type here"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={prefStyles.group}>
            <label className={prefStyles.groupLabel}>
              Any details you'd like us to consider? <span className={prefStyles.optional}>(optional)</span>
            </label>
            <input
              className={prefStyles.detailsInput}
              type="text"
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder='e.g. "No lilies please." / "Peachy and warm." / "For a bold person."'
            />
          </div>
          <button className={prefStyles.findBouquetBtn} onClick={handleFindBouquet} type="button">
            Find Your Perfect Bouquet
          </button>
        </div>
      </section>
    </div>
  );
} 