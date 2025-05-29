import styles from '../styles/Landing.module.css';
import prefStyles from '../styles/Preferences.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('');
  const [otherOccasion, setOtherOccasion] = useState('');

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
  const handleVibeClick = (vibe) => setSelectedVibe(vibe);

  const handleFindBouquet = () => {
    router.push('/results');
  };

  return (
    <div>
      {/* Landing Section */}
      <section className={styles.landingContainer} id="landing">
        <div className={styles.centerContent}>
          <h1 className={styles.title}>
            Bloomè
            <span className={styles.flowerOutline}>
              {/* SVG as before */}
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#e9e2d0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 28c-2-4-7-4-7-10 0-4 3-7 7-7s7 3 7 7c0 6-5 6-7 10z"/>
                <path d="M18 15v-3"/>
                <path d="M18 28v3"/>
                <path d="M25 18h3"/>
                <path d="M8 18H5"/>
              </svg>
            </span>
          </h1>
          <p className={styles.subtitle}>
            We'll help you pick flowers that feel just right.
          </p>
          <p className={styles.scrollText}>
            Scroll down to find your perfect bouquet... <span role="img" aria-label="bouquet">🌸</span>
          </p>
        </div>
      </section>

      {/* Preferences Section */}
      <section className={prefStyles.prefSection} id="preferences">
        <div className={prefStyles.prefContainer}>
          <h2 className={prefStyles.prefTitle}>Select Your Perfect Match</h2>
          <div className={prefStyles.group}>
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
          <div className={prefStyles.group}>
            <label className={prefStyles.groupLabel}>Choose a Vibe</label>
            <div className={prefStyles.vibeList}>
              {vibes.map((vibe) => (
                <div className={prefStyles.vibeRow} key={vibe.label}>
                  <button
                    className={`${prefStyles.vibeBtn} ${selectedVibe === vibe.label ? prefStyles.selectedOption : ''}`}
                    onClick={() => handleVibeClick(vibe.label)}
                    type="button"
                  >
                    {vibe.label}
                  </button>
                  <span className={prefStyles.vibeDesc}>{vibe.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={prefStyles.group}>
            <label className={prefStyles.groupLabel}>
              Any details you'd like us to consider? <span className={prefStyles.optional}>(optional)</span>
            </label>
            <input className={prefStyles.detailsInput} type="text" placeholder='e.g. "No lilies please." / "Peachy and warm." / "For a bold person."' />
          </div>
          <button className={prefStyles.findBouquetBtn} onClick={handleFindBouquet} type="button">
            Find My Perfect Bouquet
          </button>
        </div>
      </section>
    </div>
  );
} 