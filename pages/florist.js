import { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/router';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '60vh', minHeight: 400, borderRadius: 18 };
const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // fallback: San Francisco

export default function Florist() {
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [center, setCenter] = useState(defaultCenter);
  const [florists, setFlorists] = useState([]);
  const mapRef = useRef(null);
  const [hoveredPlaceId, setHoveredPlaceId] = useState(null);

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {} // ignore error, fallback to default
      );
    }
  }, []);

  // Search for florists in the visible area (bounds) when map is idle
  const handleMapIdle = () => {
    if (!mapRef.current || !window.google) return;
    const map = mapRef.current;
    const bounds = map.getBounds();
    if (!bounds) return;
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(
      {
        bounds: bounds,
        keyword: 'florist',
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setFlorists(results);
        } else {
          setFlorists([]);
        }
      }
    );
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', background: '#f9f4ee', boxSizing: 'border-box', margin: 0, padding: 0, overflow: 'hidden' }}>
      {/* Navigation Bar */}
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
      </nav>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32, padding: 24, paddingTop: 96, height: 'calc(100vh - 96px)', boxSizing: 'border-box', maxWidth: 1200, margin: '0 auto' }}>
        {/* Map on the left */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <h1 style={{ marginTop: 0 }}>Florists Near You</h1>
          <div style={{ flex: 1, maxHeight: '70vh' }}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '70vh', minHeight: 400, borderRadius: 18 }}
              center={center}
              zoom={13}
              onLoad={map => (mapRef.current = map)}
              onIdle={handleMapIdle}
            >
              <Marker position={center} label="You" />
              {florists.map((place) => (
                <Marker
                  key={place.place_id}
                  position={{
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  }}
                  label={place.name}
                  onMouseOver={() => setHoveredPlaceId(place.place_id)}
                  onMouseOut={() => setHoveredPlaceId(null)}
                />
              ))}
            </GoogleMap>
          </div>
        </div>
        {/* List on the right */}
        <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: 24, marginTop: 32, height: 'fit-content', maxHeight: '70vh' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#b35d6a', fontWeight: 500, fontSize: 22, marginTop: 0 }}>Nearby Florists</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {florists.length === 0 ? (
              <li style={{ color: '#bdb7a7', fontFamily: 'Georgia, serif', fontSize: 16 }}>No florists found nearby.</li>
            ) : (
              florists.map((place) => (
                <li
                  key={place.place_id}
                  style={{
                    marginBottom: 20,
                    paddingBottom: 16,
                    borderBottom: '1px solid #f0e6dd',
                    background: hoveredPlaceId === place.place_id ? '#f9e3ea' : 'transparent',
                    borderRadius: hoveredPlaceId === place.place_id ? 10 : 0,
                    transition: 'background 0.2s',
                  }}
                >
                  <strong style={{ fontSize: 18 }}>{place.name}</strong><br />
                  <span style={{ color: '#7a6c5d', fontSize: 15 }}>{place.vicinity}</span>
                  {place.rating && (
                    <div style={{ color: '#b35d6a', fontSize: 15, marginTop: 4 }}>Rating: {place.rating} ⭐</div>
                  )}
                  {place.user_ratings_total && (
                    <div style={{ color: '#bdb7a7', fontSize: 13 }}>({place.user_ratings_total} reviews)</div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 