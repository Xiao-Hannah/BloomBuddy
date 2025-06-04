import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const IMAGES_PER_PAGE = 8;

// SVG icons
const DownloadIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#b35d6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/><path d="M5 19h14"/></svg>
);
const SaveIcon = () => (
  <svg width="24" height="24" fill="#fff" stroke="#b35d6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
);
const UnsaveIcon = () => (
  <svg width="24" height="24" fill="#fff" stroke="#b35d6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/><line x1="4" y1="4" x2="20" y2="20" /></svg>
);

export default function Gallery() {
  const router = useRouter();
  const [view, setView] = useState('All');
  const [page, setPage] = useState(1);
  const [allImages, setAllImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);

  // Load saved images from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedImages') || '[]');
    setSavedImages(saved);
  }, []);

  // Save to localStorage when savedImages changes
  useEffect(() => {
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
  }, [savedImages]);

  useEffect(() => {
    fetch('/api/gallery-images')
      .then(res => res.json())
      .then(data => setAllImages(data.images));
  }, []);

  const images = view === 'All' ? allImages : savedImages;
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const startIdx = (page - 1) * IMAGES_PER_PAGE;
  const endIdx = startIdx + IMAGES_PER_PAGE;
  const imagesToShow = images.slice(startIdx, endIdx);

  // Split images into two rows as evenly as possible
  const topRowCount = Math.ceil(imagesToShow.length / 2);
  const bottomRow = imagesToShow.slice(topRowCount);
  const topRow = imagesToShow.slice(0, topRowCount);

  const handleViewChange = (newView) => {
    setView(newView);
    setPage(1);
  };

  // Save/Unsave logic
  const isSaved = (img) => savedImages.includes(img);
  const handleSave = (img) => {
    if (!isSaved(img)) setSavedImages([...savedImages, img]);
  };
  const handleUnsave = (img) => {
    setSavedImages(savedImages.filter(i => i !== img));
  };

  // Download logic
  const handleDownload = (img) => {
    const link = document.createElement('a');
    link.href = img;
    link.download = img.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Image card with overlay icons
  const ImageCard = ({ src, idx }) => (
    <div className="gallery-image-card">
      <img
        src={src}
        alt={`Gallery ${idx + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '18px' }}
      />
      <div className="gallery-hover-overlay">
        <span
          className="gallery-icon-btn"
          title="Download"
          onClick={() => handleDownload(src)}
        >
          <DownloadIcon />
        </span>
        {view === 'All' ? (
          isSaved(src) ? (
            <span
              className="gallery-icon-btn"
              title="Unsave"
              onClick={() => handleUnsave(src)}
            >
              <UnsaveIcon />
            </span>
          ) : (
            <span
              className="gallery-icon-btn"
              title="Save"
              onClick={() => handleSave(src)}
            >
              <SaveIcon />
            </span>
          )
        ) : (
          <span
            className="gallery-icon-btn"
            title="Unsave"
            onClick={() => handleUnsave(src)}
          >
            <UnsaveIcon />
          </span>
        )}
      </div>
      <style jsx>{`
        .gallery-image-card {
          position: relative;
          width: 220px;
          height: 220px;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(179,93,106,0.08);
        }
        .gallery-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(44, 41, 34, 0.45); /* semi-transparent dark */
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.2rem;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .gallery-image-card:hover .gallery-hover-overlay {
          opacity: 1;
          pointer-events: auto;
        }
        .gallery-icon-btn {
          background: #fff;
          border-radius: 50%;
          padding: 0.5rem;
          box-shadow: 0 2px 8px rgba(179,93,106,0.12);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #bdb7a7;
          transition: background 0.2s, box-shadow 0.2s;
          pointer-events: auto;
        }
        .gallery-icon-btn:hover {
          background: #f9e3ea;
          box-shadow: 0 4px 16px rgba(179,93,106,0.18);
        }
        .gallery-icon-btn svg {
          display: block;
        }
      `}</style>
    </div>
  );

  return (
    <div style={{ height: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f9f4ee', padding: '0 2rem' }}>
      {/* Full-width Top Navigation Bar */}
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
        background: '#f9e3ea', // muted light pink
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
          onClick={() => router.push('/preferences')}
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
          Find Your Bouquet
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
      {/* Connected Toggle Bar for All/Saved */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', marginTop: '6rem' }}>
        <div style={{
          display: 'flex',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '2px solid #bdb7a7',
          background: '#fff',
        }}>
          <button
            onClick={() => handleViewChange('All')}
            style={{
              padding: '0.7rem 2.5rem',
              border: 'none',
              outline: 'none',
              background: view === 'All' ? '#b35d6a' : 'transparent',
              color: view === 'All' ? '#fff' : '#b35d6a',
              fontFamily: 'Georgia, serif',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              fontWeight: 500,
              borderRight: '1px solid #bdb7a7',
            }}
          >
            All
          </button>
          <button
            onClick={() => handleViewChange('Saved')}
            style={{
              padding: '0.7rem 2.5rem',
              border: 'none',
              outline: 'none',
              background: view === 'Saved' ? '#b35d6a' : 'transparent',
              color: view === 'Saved' ? '#fff' : '#b35d6a',
              fontFamily: 'Georgia, serif',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              fontWeight: 500,
            }}
          >
            Saved
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', flex: 1 }}>
        {imagesToShow.length === 0 ? (
          <p style={{ color: '#bdb7a7', fontFamily: 'Georgia, serif', fontSize: '1.2rem', textAlign: 'center' }}>No images to display.</p>
        ) : (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
              {topRow.map((src, idx) => (
                <ImageCard key={src} src={src} idx={startIdx + idx} />
              ))}
            </div>
            {bottomRow.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {bottomRow.map((src, idx) => (
                  <ImageCard key={src} src={src} idx={startIdx + topRowCount + idx} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '3rem', gap: '0.5rem' }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '18px',
              border: '2px solid #bdb7a7',
              background: page === 1 ? '#eee' : '#fff',
              color: '#b35d6a',
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '18px',
                border: page === i + 1 ? '2px solid #b35d6a' : '2px solid #bdb7a7',
                background: page === i + 1 ? '#b35d6a' : '#fff',
                color: page === i + 1 ? '#fff' : '#b35d6a',
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                cursor: 'pointer',
                margin: '0 2px',
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '18px',
              border: '2px solid #bdb7a7',
              background: page === totalPages ? '#eee' : '#fff',
              color: '#b35d6a',
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              opacity: page === totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 