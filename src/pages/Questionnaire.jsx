import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, X, CheckCircle2,
  MapPin, Gauge, Users, Car, Zap, IndianRupee, Activity, ShieldCheck, Armchair, Building2, Loader2
} from "lucide-react";
import localCars from "../data/cars";
import cities from "../data/cities";
import {
  TataLogo, HyundaiLogo, SuzukiLogo, KiaLogo,
  MahindraLogo, HondaLogo, ToyotaLogo, SkodaLogo
} from "../components/BrandLogos";
import "./questionnaire.css";

function Questionnaire({ onCompare }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [carData, setCarData] = useState(localCars);
  // const [loading, setLoading] = useState(true); // Removed loading state
  const [answers, setAnswers] = useState({
    budget: "",
    brands: [],
    type: "",
    use: "",
    city: ""
  });

  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const cityInputRef = useRef(null);
  const isSelectingRef = useRef(false);

  /* API Loading Effect Removed */



  const questions = [
    {
      id: 1,
      question: "What’s your total budget for buying a car?",
      key: "budget",
      type: "single",
      options: [
        { label: "Below ₹5 Lakhs", value: "low", icon: <IndianRupee size={20} /> },
        { label: "₹5 Lakhs – ₹10 Lakhs", value: "mid_low", icon: <IndianRupee size={20} /> },
        { label: "₹10 Lakhs – ₹20 Lakhs", value: "mid_high", icon: <IndianRupee size={20} /> },
        { label: "Above ₹20 Lakhs", value: "high", icon: <IndianRupee size={20} /> }
      ]
    },
    {
      id: 2,
      question: "Which brand of car do you prefer? (Select all that apply)",
      key: "brands",
      type: "multi", // Enable multi-select
      options: [
        { label: "Tata", subtitle: "Nexon, Harrier, Punch", value: "Tata", icon: <TataLogo size={24} /> },
        { label: "Hyundai", subtitle: "Creta, Verna, i20", value: "Hyundai", icon: <HyundaiLogo size={24} /> },
        { label: "Maruti Suzuki", subtitle: "Swift, Brezza, Baleno", value: "Maruti Suzuki", icon: <SuzukiLogo size={24} /> },
        { label: "Kia", subtitle: "Seltos, Sonet", value: "Kia", icon: <KiaLogo size={24} /> },
        { label: "Mahindra", subtitle: "Thar, XUV700, Scorpio", value: "Mahindra", icon: <MahindraLogo size={24} /> },
        { label: "Honda", subtitle: "City, Amaze, Elevate", value: "Honda", icon: <HondaLogo size={24} /> },
        { label: "Toyota", subtitle: "Fortuner, Glanza", value: "Toyota", icon: <ToyotaLogo size={24} /> },
        { label: "Skoda", subtitle: "Slavia, Kushaq", value: "Skoda", icon: <SkodaLogo size={24} /> }
      ]
    },
    {
      id: 3,
      question: "What type of car are you looking for?",
      key: "type",
      type: "single",
      options: [
        { label: "Hatchback", value: "Hatchback", icon: <Car size={20} /> },
        { label: "Sedan", value: "Sedan", icon: <Car size={20} /> },
        { label: "SUV", value: "SUV", icon: <Car size={20} /> },
        { label: "Electric", value: "Electric", icon: <Zap size={20} /> }
      ]
    },
    {
      id: 4,
      question: "What will you mostly use the car for?",
      key: "use",
      type: "single",
      options: [
        { label: "Daily city commute", value: "Daily city commute", icon: <MapPin size={20} /> },
        { label: "Family trips", value: "Family trips", icon: <Users size={20} /> },
        { label: "Long highway drives", value: "Long highway drives", icon: <Gauge size={20} /> },
        { label: "Off-road / adventure", value: "Off-road or adventure use", icon: <Car size={20} /> }
      ]
    },
    {
      id: 5,
      question: "In which city do you live?",
      key: "city",
      type: "text",
      placeholder: "e.g. Hyderabad, Bangalore..."
    }
  ];

  const currentQuestion = questions[step];
  const currentStepNum = step + 1;
  const totalSteps = questions.length;
  const progressPercent = (currentStepNum / totalSteps) * 100;

  const handleOptionSelect = (value) => {
    if (currentQuestion.type === "multi") {
      // Toggle logic for multi-select
      const currentSelection = answers[currentQuestion.key] || [];
      const newSelection = currentSelection.includes(value)
        ? currentSelection.filter(item => item !== value)
        : [...currentSelection, value];
      setAnswers({ ...answers, [currentQuestion.key]: newSelection });
    } else {
      // Single select
      setAnswers({ ...answers, [currentQuestion.key]: value });
    }
  };

  /* Logic for text input */
  const handleTextChange = (e) => {
    setAnswers({ ...answers, [currentQuestion.key]: e.target.value });
  };

  /* Logic for City Typeahead */
  const handleCityChange = (e) => {
    const val = e.target.value;
    setAnswers({ ...answers, city: val });

    if (val.trim().length >= 1) {
      const matches = cities.filter(c =>
        c.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8); // Limit to 8

      setFilteredCities(matches);
      setShowSuggestions(true);
      setActiveSuggestion(-1);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city) => {
    isSelectingRef.current = true;
    const newAnswers = { ...answers, city: city };
    setAnswers(newAnswers);
    setFilteredCities([]);
    setShowSuggestions(false);
    setActiveSuggestion(-1);

    // Keep focus
    if (cityInputRef.current) {
      cityInputRef.current.focus();
    }

    // Reset selecting flag after a tick
    setTimeout(() => { isSelectingRef.current = false; }, 100);
  };

  const handleCityKeyDown = (e) => {
    if (showSuggestions && filteredCities.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion(prev => (prev < filteredCities.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion(prev => (prev > 0 ? prev - 1 : filteredCities.length - 1));

      } else if (e.key === "Enter") {
        e.preventDefault();

        // Use active suggestion or fallback to the first one
        const targetCity = activeSuggestion >= 0 ? filteredCities[activeSuggestion] : filteredCities[0];

        if (targetCity) {
          handleCitySelect(targetCity);
        }
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    } else {
      if (e.key === "Enter") {
        e.preventDefault();
        if (answers.city.trim().length > 0) {
          handleNext();
        }
      }
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? <strong key={i}>{part}</strong> : part
    );
  };

  const handleNext = (overrideAnswers = null) => {
    if (step < questions.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      handleSubmit(overrideAnswers);
    }
  };

  const handleSubmit = (overrideAnswers = null) => {
    const finalAnswers = overrideAnswers || answers;
    // Scoring Logic (Using carData state)
    const suggestedCars = carData.filter((car) => {
      let score = 0;

      // 1. Budget
      const price = car.price || 0;
      if (finalAnswers.budget === "low" && price <= 500000) score += 5;
      if (finalAnswers.budget === "mid_low" && price > 500000 && price <= 1000000) score += 5;
      if (finalAnswers.budget === "mid_high" && price > 1000000 && price <= 2000000) score += 5;
      if (finalAnswers.budget === "high" && price > 2000000) score += 5;

      // 2. Brand Preference (Start Bonus)
      if (finalAnswers.brands.length > 0) {
        // Handle fuzzy match for brands (e.g. Maruti matches Maruti Suzuki)
        if (finalAnswers.brands.some(b => (car.brand || "").includes(b))) score += 4;
      }

      // 3. Type
      if (finalAnswers.type === "Electric") {
        if (car.fuel === "Electric") score += 5;
      } else if (car.bodyType === finalAnswers.type) { // Normalized data uses bodyType
        score += 3;
      }

      // 4. Use Case
      // car.useCase is usually an array (e.g. ["City", "Family"])
      if (Array.isArray(car.useCase)) {
        // rough match since answers.use is distinct string
        if (car.useCase.some(u => finalAnswers.use.toLowerCase().includes(u.toLowerCase()))) score += 2;
      } else if (car.useCase === finalAnswers.use) {
        score += 2;
      }

      // Filter Threshold
      return score >= 5;
    }).sort((a, b) => (b.price || 0) - (a.price || 0));

    // Fallback if no specific matches found
    const finalResult = suggestedCars.length > 0 ? suggestedCars : carData.slice(0, 6);
    // onCompare will switch to Comparison view
    onCompare(finalResult.slice(0, 6));
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    if (confirm("Are you sure you want to terminate the session?")) {
      window.location.reload();
    }
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  // Validation for finish button
  const canProceed = () => {
    if (currentQuestion.type === "multi") return answers[currentQuestion.key].length > 0;
    if (currentQuestion.type === "text") return answers[currentQuestion.key].trim().length > 0;
    return !!answers[currentQuestion.key];
  };

  // Handle Enter Key Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If suggestions are open, we rely on the input's own ONKEYDOWN handler
      // to manage selection vs navigation. We ignore the global enter here.
      if (e.key === "Enter") {
        if (showSuggestions) return;

        if (canProceed()) {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [answers, step, showSuggestions]); // Added showSuggestions dependency

  /* Loading View Removed */

  return (
    <div className="questionnaire-wrapper">
      {/* Top App Bar - Back Button Removed */}
      <header className="app-bar">
        <div style={{ width: 40 }}></div>

        <div className="progress-section">
          <span className="progress-label">Question {currentStepNum} of {totalSteps}</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="nav-icon-btn" onClick={handleClose}><X size={24} /></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="content-area">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: '100%' }}
          >
            <h1 className="question-text">{currentQuestion.question}</h1>

            {/* Render based on Type */}
            {currentQuestion.type === "text" ? (
              <div className="input-animate-wrapper">
                <div className="relative-city-container">
                  <div className="text-input-container">
                    <Building2 className="input-icon" size={24} />
                    <input
                      ref={cityInputRef}
                      type="text"
                      className="city-input"
                      placeholder={currentQuestion.placeholder}
                      value={answers.city}
                      onChange={handleCityChange}
                      onKeyDown={handleCityKeyDown}
                      autoFocus
                      onBlur={() => {
                        // Delay hide only if not clicking an option
                        setTimeout(() => {
                          if (!isSelectingRef.current) setShowSuggestions(false);
                        }, 200);
                      }}
                    />
                    {answers.city && (
                      <div className="input-check-icon">
                        <CheckCircle2 size={20} className="text-green-500" />
                      </div>
                    )}
                  </div>
                  {showSuggestions && filteredCities.length > 0 && (
                    <ul className="city-suggestions-dropdown">
                      {filteredCities.map((city, index) => (
                        <li
                          key={index}
                          className={`city-suggestion-item ${index === activeSuggestion ? "active" : ""}`}
                          onMouseDown={(e) => {
                            e.preventDefault(); // Prevent blur
                            handleCitySelect(city, false);
                          }}
                          onMouseEnter={() => setActiveSuggestion(index)}
                        >
                          {highlightMatch(city, answers.city)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className={`options-list ${currentQuestion.type === "multi" ? "grid-options" : ""}`}>
                {currentQuestion.options.map((option) => {
                  const isMulti = currentQuestion.type === "multi";
                  const isSelected = isMulti
                    ? answers[currentQuestion.key].includes(option.value)
                    : answers[currentQuestion.key] === option.value;

                  return (
                    <div
                      key={option.value}
                      className={`option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      <div className="option-icon-wrapper">
                        {option.icon}
                      </div>
                      <div className="option-content">
                        <span className="option-label">{option.label}</span>
                        {/* Subtitle mainly for Brands */}
                        {option.subtitle && <span className="option-subtitle block text-xs text-gray-500">{option.subtitle}</span>}
                      </div>
                      <div className="check-indicator">
                        <CheckCircle2 size={24} fill="currentColor" stroke="white" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer - Back Button Added Left */}
      <footer className="footer-bar">
        {step > 0 ? (
          <button className="back-button-footer" onClick={handleBack}>
            <ArrowLeft size={18} /> Back
          </button>
        ) : (
          <div></div> /* Spacer for alignment */
        )}

        <button
          className="next-button"
          disabled={!canProceed()}
          onClick={() => handleNext()}
        >
          {step === totalSteps - 1 ? "Get Recommendations" : "Next"}
        </button>
      </footer>
    </div>
  );
}

export default Questionnaire;
