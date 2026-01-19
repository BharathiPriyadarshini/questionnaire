import { useState, useRef } from "react";
import {
  ArrowLeft, Star, Fuel, Gauge, Settings, Zap,
  Home, Compass, Heart, User, ChevronLeft, ChevronRight
} from "lucide-react";
import "./questionnaire.css";

function Comparison({ cars, onBack }) {
  const [activeTab, setActiveTab] = useState("discover"); // home, discover, wishlist, profile
  const [wishlist, setWishlist] = useState([]);
  const scrollContainerRef = useRef(null);

  // Scroll Helpers
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Toggle Wishlist
  const toggleWishlist = (carId) => {
    if (wishlist.includes(carId)) {
      setWishlist(wishlist.filter(id => id !== carId));
    } else {
      setWishlist([...wishlist, carId]);
    }
  };

  // Helper to format price
  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
    return `₹${price.toLocaleString()}`;
  };

  // Helper to render stars
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={14}
        className="star-icon"
        fill={i < Math.floor(rating) ? "#FBBF24" : "none"}
        stroke={i < Math.floor(rating) ? "#FBBF24" : "#CBD5E1"}
      />
    ));
  };

  // Helper to generate badges
  const getBadges = (car) => {
    const badges = [];
    if (car.rating >= 4.7) badges.push({ text: "Top Rated", type: "primary" });
    if (car.fuel === "Electric") badges.push({ text: "Eco Friendly", type: "green" });
    if (car.price < 800000) badges.push({ text: "Best Value", type: "orange" });
    return badges.slice(0, 2); // Limit to 2
  };

  // Show only wishlist cars if on wishlist tab
  const displayCars = activeTab === "wishlist"
    ? cars.filter(c => wishlist.includes(c.id))
    : cars;

  // Back button logic
  const handleBack = () => {
    if (activeTab !== "discover") {
      setActiveTab("discover");
    } else {
      onBack();
    }
  };

  return (
    <div className="results-page-container">
      {/* Top Header - Show on Home/Discover/Wishlist */}
      <header className="comparison-app-bar">
        <div className="header-left">
          <button className="nav-icon-btn" onClick={handleBack} title="Back">
            <ArrowLeft size={24} />
          </button>
          <h1 className="page-title">
            {activeTab === "wishlist" ? "My Wishlist" : "riCommendations"}
          </h1>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="desktop-nav">
          <button
            className={`desktop-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          <button
            className={`desktop-nav-item ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            <Compass size={20} />
            <span>Discover</span>
          </button>
          <button
            className={`desktop-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart size={20} />
            <span>Wishlist</span>
          </button>
          <button
            className={`desktop-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
        </nav>
      </header>

      {/* Main Scrollable Content */}
      <main className="results-content-area">
        {activeTab === "profile" ? (
          <div style={{ textAlign: 'center', marginTop: 40, color: '#64748B' }}>
            <div style={{ background: '#F1F5F9', width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={40} />
            </div>
            <h2>User Profile</h2>
            <p>Profile settings coming soon.</p>
          </div>
        ) : (
          <div className="carousel-wrapper">
            {displayCars.length > 0 && (
              <button className="carousel-btn left" onClick={scrollLeft}>
                <ChevronLeft size={24} />
              </button>
            )}
            <div className="cars-horizontal-track" ref={scrollContainerRef}>
              {displayCars.length === 0 && activeTab === "wishlist" && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', marginTop: 40, color: '#94A3B8' }}>
                  <Heart size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                  <p>Your wishlist is empty.</p>
                </div>
              )}

              {displayCars.map((car) => {
                const isLiked = wishlist.includes(car.id);
                return (
                  <div key={car.id} className="result-card horizontal-card">
                    {/* Image Section with Like Button & Badges */}
                    <div className="result-image-wrapper">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="result-card-img"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'; }}
                      />

                      {/* Absolute Like Button */}
                      <button
                        className={`like-button-card ${isLiked ? 'liked' : ''}`}
                        onClick={() => toggleWishlist(car.id)}
                      >
                        <Heart
                          size={20}
                          fill={isLiked ? "#EF4444" : "none"}
                          stroke={isLiked ? "#EF4444" : "#64748B"}
                        />
                      </button>

                      <div className="badge-overlay">
                        {getBadges(car).map((badge, i) => (
                          <div key={i} className={`highlight-badge ${badge.type}`}>
                            {badge.text === "Top Rated" && <Star size={10} fill="currentColor" />}
                            {badge.text === "Eco Friendly" && <Zap size={10} fill="currentColor" />}
                            <span>{badge.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="result-body">
                      <div className="result-header">
                        <div className="result-title-group">
                          <h3 className="result-model">{car.brand} {car.model}</h3>
                          <div className="rating-row">
                            {renderStars(car.rating)}
                            <span className="rating-text">({car.rating}/5)</span>
                          </div>
                        </div>
                        <div className="result-price">{car.priceLabel}</div>
                      </div>

                      {/* Specs Grid */}
                      <div className="specs-row">
                        <span className="spec-tag"><Fuel size={12} /> {car.fuel}</span>
                        <span className="spec-tag"><Settings size={12} /> {car.bodyType}</span>
                        <span className="spec-tag"><Gauge size={12} /> {car.mileage}</span>
                        <span className="spec-tag"><User size={12} /> {car.seating} Seats</span>
                      </div>

                      {/* Footer CTA (Flex Spacer handles push) */}
                    </div>

                    <footer className="result-footer">
                      <button className="view-btn primary">View Details</button>
                    </footer>
                  </div>
                );
              })}
            </div>
            {displayCars.length > 0 && (
              <button className="carousel-btn right" onClick={scrollRight}>
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        )}
      </main>



    </div>
  );
}

export default Comparison;
