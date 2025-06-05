import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// Download icon SVG
const DownloadIcon = () => (
  <svg
    width="32"
    height="32"
    fill="none"
    stroke="#b35d6a"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M12 5v14M5 12l7 7 7-7" />
    <path d="M5 19h14" />
  </svg>
);

export default function Results() {
  const router = useRouter();
  const { occasion = "", vibe = "", details = "" } = router.query;
  const [basePath, setBasePath] = useState("");

  useEffect(() => {
    const isGitHubPages = window.location.hostname.includes("github.io");
    setBasePath(isGitHubPages ? "/BloomBuddy" : "");
  }, []);

  // List of gallery images (from public/gallery)
  const imageFiles = [
    "Gallery1_first date_elegant_purple.jpg",
    "Gallery2_first date_bright_purple.jpg",
    "Gallery3_wedding_romantic_red_roses.jpg",
    "Gallery4_sympathy_soft_mixed color.jpg",
    "Gallery5_apology_wild_purple_mixed flowers.jpg",
    "Gallery6_wedding_romantic_soft_light color.jpg",
    "Gallery7_sympathy_bright_purple.jpg",
    "Gallery8_wedding_minimal_pink_roses.jpg",
    "Gallery9_romantic_roses_pink.jpg",
    "Gallery10_apology_wild_mixed colors.jpg",
    "Gallery11_graduation_soft_mixed flowers.jpg",
    "Gallery12_graduation_elegant_purple.jpg",
    "Gallery13_sympathy_wild_purple_mixed flowers.jpg",
    "Gallery14_graduation_apology_sympathy_birthday_blue_soft.jpg",
    "Gallery15_apology_birthday_graduation_blue_soft.jpg",
    "Gallery16_first date_mixed colors_elegant_romantic.jpg",
  ];

  // Build keywords array from user selections
  const detailsKeywords =
    typeof details === "string" ? details.split(/\s+/).filter(Boolean) : [];
  const keywords = [occasion, vibe, ...detailsKeywords].filter(Boolean);

  // Find all images with the highest keyword match count and their matched keywords
  function getBestImages(keywords, imageFiles) {
    let bestScore = -1;
    let bestImages = [];
    for (const file of imageFiles) {
      const matched = keywords.filter((kw) =>
        file.toLowerCase().includes(kw.toLowerCase())
      );
      const score = matched.length;
      if (score > bestScore) {
        bestScore = score;
        bestImages = [{ file, matched }];
      } else if (score === bestScore && score > 0) {
        bestImages.push({ file, matched });
      }
    }
    // If no matches at all, show placeholder
    if (bestScore <= 0) {
      return [{ file: null, matched: [] }];
    }
    return bestImages;
  }

  const bestImages = getBestImages(keywords, imageFiles);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Navigation handlers
  const hasMultiple = bestImages.length > 1 && bestImages[0].file !== null;
  const showIdx = Math.min(currentIdx, bestImages.length - 1);
  const handlePrev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const handleNext = () =>
    setCurrentIdx((i) => Math.min(bestImages.length - 1, i + 1));

  return (
    <div
      style={{
        background: "#fff7f0",
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 0,
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 20,
          background: "#f9e3ea",
          boxShadow: "0 2px 8px rgba(179, 93, 106, 0.08)",
          borderBottom: "2px solid #bdb7a7",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            padding: "0.7rem 2.5rem",
          }}
        >
          <a
            onClick={() => router.push("/")}
            style={{
              color: "#b35d6a",
              fontFamily: "Georgia, serif",
              fontSize: "1rem",
              textDecoration: "none",
              cursor: "pointer",
              padding: "0.3rem 0.8rem",
              borderRadius: "18px",
              transition: "background 0.2s, color 0.2s",
              fontWeight: 500,
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f9f4ee")}
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Home
          </a>
          <a
            onClick={() => router.push("/gallery")}
            style={{
              color: "#b35d6a",
              fontFamily: "Georgia, serif",
              fontSize: "1rem",
              textDecoration: "none",
              cursor: "pointer",
              padding: "0.3rem 0.8rem",
              borderRadius: "18px",
              transition: "background 0.2s, color 0.2s",
              fontWeight: 500,
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f9f4ee")}
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            View Gallery
          </a>
          <a
            onClick={() => router.push("/florist")}
            style={{
              color: "#b35d6a",
              fontFamily: "Georgia, serif",
              fontSize: "1rem",
              textDecoration: "none",
              cursor: "pointer",
              padding: "0.3rem 0.8rem",
              borderRadius: "18px",
              transition: "background 0.2s, color 0.2s",
              fontWeight: 500,
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f9f4ee")}
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Find Nearest Florist
          </a>
        </div>
      </nav>
      {/* Block 1: Title */}
      <div
        style={{
          width: "100%",
          maxWidth: 660,
          margin: "0 auto",
          padding: "0 16px",
          marginTop: 80,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Go Back Button */}
        <button
          onClick={() => router.push("/preferences")}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            background: "#fff",
            color: "#b35d6a",
            border: "2px solid #bdb7a7",
            borderRadius: "18px",
            padding: "0.4rem 1.2rem",
            fontSize: "1rem",
            fontFamily: "Georgia, serif",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(179, 93, 106, 0.08)",
            transition: "background 0.2s, color 0.2s",
            fontWeight: 500,
            zIndex: 5,
          }}
        >
          &#8592; Back
        </button>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Georgia, serif",
            fontWeight: 500,
            fontSize: 32,
            marginBottom: 36,
            marginTop: 0,
            flex: 1,
          }}
        >
          Your Perfect Bouquet
        </h1>
      </div>
      {/* Block 2: Images and Cards */}
      <div
        style={{
          width: "100%",
          maxWidth: 660,
          margin: "0 auto",
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: 0,
        }}
      >
        {bestImages[0].file === null ? (
          <div
            style={{
              width: "100%",
              height: 340,
              background: "#ede7df",
              borderRadius: 22,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Image
              src={"/bouquet-placeholder.jpg"}
              alt="Bouquet"
              width={660}
              height={340}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            {/* Left Arrow */}
            {hasMultiple && showIdx > 0 && (
              <button
                onClick={handlePrev}
                aria-label="Previous bouquet"
                style={{
                  position: "absolute",
                  left: -64,
                  top: "18%",
                  background: "none",
                  border: "none",
                  borderRadius: 0,
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 44,
                  color: "#b35d6a",
                  cursor: "pointer",
                  boxShadow: "none",
                  zIndex: 10,
                  padding: 0,
                  lineHeight: 1,
                  outline: "none",
                }}
              >
                {"\u2039"}
              </button>
            )}
            {/* Right Arrow */}
            {hasMultiple && showIdx < bestImages.length - 1 && (
              <button
                onClick={handleNext}
                aria-label="Next bouquet"
                style={{
                  position: "absolute",
                  right: -64,
                  top: "18%",
                  background: "none",
                  border: "none",
                  borderRadius: 0,
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 44,
                  color: "#b35d6a",
                  cursor: "pointer",
                  boxShadow: "none",
                  zIndex: 10,
                  padding: 0,
                  lineHeight: 1,
                  outline: "none",
                }}
              >
                {"\u203A"}
              </button>
            )}
            {/* Image Card */}
            {(() => {
              const { file, matched } = bestImages[showIdx];
              // Download handler
              const handleDownload = () => {
                const link = document.createElement("a");
                link.href = `${basePath}/Gallery/${file}`;
                link.download = file;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              };

              return (
                <div style={{ marginBottom: 36 }}>
                  <div
                    className="bouquet-image-hover-wrap"
                    style={{
                      width: "100%",
                      height: 340,
                      background: "#ede7df",
                      borderTopLeftRadius: 22,
                      borderTopRightRadius: 22,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      overflow: "hidden",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={`${basePath}/Gallery/${file}`}
                      alt="Bouquet"
                      width={660}
                      height={340}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {/* Overlay and Download Icon */}
                    <div className="bouquet-hover-overlay">
                      <button
                        className="download-btn-overlay"
                        onClick={handleDownload}
                        title="Download image"
                      >
                        <DownloadIcon />
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      background: "#ede7df",
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      borderBottomLeftRadius: 22,
                      borderBottomRightRadius: 22,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      padding: "32px 0 26px 0",
                      fontFamily: "Georgia, serif",
                      color: "#3d3d3d",
                    }}
                  >
                    <div style={{ padding: "0 32px" }}>
                      <div
                        style={{
                          fontWeight: 500,
                          marginBottom: 10,
                          fontSize: 16,
                          color: "#b35d6a",
                          background: "#fff3e6",
                          borderRadius: 8,
                          padding: "6px 14px",
                          display: "inline-block",
                        }}
                      >
                        Matched keywords:{" "}
                        {matched.length > 0 ? matched.join(", ") : "None"}
                      </div>
                      <h2
                        style={{
                          fontWeight: 500,
                          fontSize: 20,
                          margin: "18px 0 8px 0",
                        }}
                      >
                        TIMELESS ELEGANCE
                      </h2>
                      <p style={{ fontSize: 16, margin: 0, marginBottom: 12 }}>
                        A luxurious arrangement of white peonies, ivory
                        ranunculus, and soft apricot garden roses, paired with
                        silvery greens for a touch of grace.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
            {/* Image count indicator */}
            {hasMultiple && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: 8,
                  color: "#b35d6a",
                  fontFamily: "Georgia, serif",
                  fontSize: 16,
                }}
              >
                {showIdx + 1} of {bestImages.length}
              </div>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .bouquet-image-hover-wrap {
          position: relative;
        }
        .bouquet-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(44, 41, 34, 0.38);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.18s;
          z-index: 21;
        }
        .bouquet-image-hover-wrap:hover .bouquet-hover-overlay {
          opacity: 1;
        }
        .download-btn-overlay {
          background: #fff;
          border: 2px solid #bdb7a7;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(179, 93, 106, 0.13);
          cursor: pointer;
          padding: 0;
          border-color: #bdb7a7;
          z-index: 22;
        }
      `}</style>
    </div>
  );
}
