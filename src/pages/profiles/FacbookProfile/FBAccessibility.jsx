import React, { useState } from 'react';
// import './FBAccessibility.css'; // Custom CSS file to match the styling
import './fbstyle.css'
function FBAccessibility() {
  const [isTextToSpeechEnabled, setTextToSpeechEnabled] = useState(false);
  const [isBiggerTextEnabled, setBiggerTextEnabled] = useState(false);
  const [isSmallTextEnabled, setSmallTextEnabled] = useState(false);
  const [isLineHeightEnabled, setLineHeightEnabled] = useState(false);
  const [isHighlightLinksEnabled, setHighlightLinksEnabled] = useState(false);
  const [isTextSpacingEnabled, setTextSpacingEnabled] = useState(false);
  const [isDyslexiaFriendlyEnabled, setDyslexiaFriendlyEnabled] = useState(false);
  const [isHideImagesEnabled, setHideImagesEnabled] = useState(false);
  const [isCursorEnabled, setCursorEnabled] = useState(false);
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
  const [isInvertColorsEnabled, setInvertColorsEnabled] = useState(false);

  // Feature handlers (you can expand these to actually implement the features)
  const toggleTextToSpeech = () => setTextToSpeechEnabled(!isTextToSpeechEnabled);
  const toggleBiggerText = () => setBiggerTextEnabled(!isBiggerTextEnabled);
  const toggleSmallText = () => setSmallTextEnabled(!isSmallTextEnabled);
  const toggleLineHeight = () => setLineHeightEnabled(!isLineHeightEnabled);
  const toggleHighlightLinks = () => setHighlightLinksEnabled(!isHighlightLinksEnabled);
  const toggleTextSpacing = () => setTextSpacingEnabled(!isTextSpacingEnabled);
  const toggleDyslexiaFriendly = () => setDyslexiaFriendlyEnabled(!isDyslexiaFriendlyEnabled);
  const toggleHideImages = () => setHideImagesEnabled(!isHideImagesEnabled);
  const toggleCursor = () => setCursorEnabled(!isCursorEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!isDarkModeEnabled);
  const toggleInvertColors = () => setInvertColorsEnabled(!isInvertColorsEnabled);

  // Reset all features
  const resetAll = () => {
    setTextToSpeechEnabled(false);
    setBiggerTextEnabled(false);
    setSmallTextEnabled(false);
    setLineHeightEnabled(false);
    setHighlightLinksEnabled(false);
    setTextSpacingEnabled(false);
    setDyslexiaFriendlyEnabled(false);
    setHideImagesEnabled(false);
    setCursorEnabled(false);
    setDarkModeEnabled(false);
    setInvertColorsEnabled(false);
  };

  return (
    <div className="uwaw uw-light-theme gradient-head uwaw-initial paid_widget" id="uw-main">
      <div className="relative second-panel">
        <h3>Accessibility options by UX4G</h3>
        <div className="uwaw-close" onClick={() => console.log("Close the widget")}></div>
      </div>
      <div className="uwaw-body">
        <div className="h-scroll">
          <div className="uwaw-features">

            <FeatureItem 
              id="speak" 
              icon="icon-speaker" 
              name="Text To Speech" 
              isEnabled={isTextToSpeechEnabled} 
              toggleFeature={toggleTextToSpeech} 
            />

            <FeatureItem 
              id="btn-s9" 
              icon="icon-bigger-text" 
              name="Bigger Text" 
              isEnabled={isBiggerTextEnabled} 
              toggleFeature={toggleBiggerText} 
            />

            <FeatureItem 
              id="btn-small-text" 
              icon="icon-small-text" 
              name="Small Text" 
              isEnabled={isSmallTextEnabled} 
              toggleFeature={toggleSmallText} 
            />

            <FeatureItem 
              id="btn-s12" 
              icon="icon-line-hight" 
              name="Line Height" 
              isEnabled={isLineHeightEnabled} 
              toggleFeature={toggleLineHeight} 
            />

            <FeatureItem 
              id="btn-s10" 
              icon="icon-highlight-links" 
              name="Highlight Links" 
              isEnabled={isHighlightLinksEnabled} 
              toggleFeature={toggleHighlightLinks} 
            />

            {/* Add other features in the same way */}

            <div className="reset-panel">
              <button className="btn-reset-all" id="reset-all" onClick={resetAll}>
                <span className="reset-icon"></span>
                <span className="reset-btn-text">Reset All Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FeatureItem Component
const FeatureItem = ({ id, icon, name, isEnabled, toggleFeature }) => {
  return (
    <div className="uwaw-features__item reset-feature" id={`featureItem-${id}`}>
      <button id={id} className="uwaw-features__item__i" aria-pressed={isEnabled} onClick={toggleFeature}>
        <span className="uwaw-features__item__icon">
          <span className={`ux4g-icon ${icon}`}></span>
        </span>
        <span className="uwaw-features__item__name">{name}</span>
        <span className={`tick-active uwaw-features__item__enabled reset-tick ${isEnabled ? '' : 'hidden'}`} id={`tickIcon-${id}`} />
      </button>
    </div>
  );
};

export default FBAccessibility;
