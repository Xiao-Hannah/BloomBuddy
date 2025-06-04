import styles from '../styles/Landing.module.css';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      {/* Landing Section */}
      <section className={styles.landingContainer} id="landing">
        <div className={styles.centerContent}>
          <h1 className={styles.title}>
            Bloomè
            <span className={styles.flowerOutline} role="img" aria-label="flower">🌸</span>
          </h1>
          <p className={styles.subtitle}>
            We'll help you pick flowers that feel just right.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
            <button className={styles.landingBtn} onClick={() => router.push('/preferences')} type="button">
              Find Your Bouquet
            </button>
            <button className={styles.landingBtn} onClick={() => router.push('/gallery')} type="button">
              View Gallery
            </button>
            <button className={styles.landingBtn} onClick={() => router.push('/florist')} type="button">
              Find Nearest Florist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 