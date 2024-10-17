


// import React, { useState } from 'react';
// import { Accessibility, Type, LineHeight, Link, Spacing, BookOpen, Image, MousePointer, Moon, Contrast } from 'lucide-react';
// import { Switch } from '@/components/ui/switch';
// import { Button } from '@/components/ui/button';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// const FBAccessibility = () => {
//   const [features, setFeatures] = useState({
//     textToSpeech: false,
//     biggerText: false,
//     lineHeight: false,
//     highlightLinks: false,
//     textSpacing: false,
//     dyslexiaFriendly: false,
//     hideImages: false,
//     cursor: false,
//     darkMode: false,
//     invertColors: false,
//   });

//   const toggleFeature = (feature) => {
//     setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
//   };

//   const resetAll = () => {
//     setFeatures(Object.fromEntries(Object.keys(features).map(key => [key, false])));
//   };

//   const FeatureItem = ({ id, icon: Icon, name }) => (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors">
//             <div className="flex items-center space-x-3">
//               <Icon className="w-5 h-5 text-blue-500" />
//               <span className="text-sm font-medium">{name}</span>
//             </div>
//             <Switch
//               checked={features[id]}
//               onCheckedChange={() => toggleFeature(id)}
//               className="data-[state=checked]:bg-blue-500"
//             />
//           </div>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Toggle {name}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );

//   return (
//     <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
//         <h2 className="text-xl font-bold">Accessibility Options</h2>
//       </div>
//       <div className="p-4 space-y-2">
//         <FeatureItem id="textToSpeech" icon={Accessibility} name="Text To Speech" />
//         <FeatureItem id="biggerText" icon={Type} name="Bigger Text" />
//         <FeatureItem id="lineHeight" icon={LineHeight} name="Line Height" />
//         <FeatureItem id="highlightLinks" icon={Link} name="Highlight Links" />
//         <FeatureItem id="textSpacing" icon={Spacing} name="Text Spacing" />
//         <FeatureItem id="dyslexiaFriendly" icon={BookOpen} name="Dyslexia Friendly" />
//         <FeatureItem id="hideImages" icon={Image} name="Hide Images" />
//         <FeatureItem id="cursor" icon={MousePointer} name="Cursor" />
//         <FeatureItem id="darkMode" icon={Moon} name="Dark Mode" />
//         <FeatureItem id="invertColors" icon={Contrast} name="Invert Colors" />
//       </div>
//       <div className="p-4 bg-gray-50">
//         <Button
//           onClick={resetAll}
//           className="w-full bg-red-500 hover:bg-red-600 text-white"
//         >
//           Reset All Settings
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FBAccessibility;




// import React, { useState } from 'react';
// import './FBAccessibility.css'; // We'll create this CSS file separately

// const FBAccessibility = () => {
//   const [features, setFeatures] = useState({
//     textToSpeech: false,
//     biggerText: false,
//     lineHeight: false,
//     highlightLinks: false,
//     textSpacing: false,
//     dyslexiaFriendly: false,
//     hideImages: false,
//     cursor: false,
//     darkMode: false,
//     invertColors: false,
//   });

//   const toggleFeature = (feature) => {
//     setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
//   };

//   const resetAll = () => {
//     setFeatures(Object.fromEntries(Object.keys(features).map(key => [key, false])));
//   };

//   const FeatureItem = ({ id, icon, name }) => (
//     <div className="feature-item">
//       <button
//         className={`feature-button ${features[id] ? 'active' : ''}`}
//         onClick={() => toggleFeature(id)}
//         title={`Toggle ${name}`}
//       >
//         <span className="feature-icon">{icon}</span>
//         <span className="feature-name">{name}</span>
//       </button>
//       <div 
//         className={`toggle ${features[id] ? 'active' : ''}`}
//         onClick={() => toggleFeature(id)}
//       >
//         <div className="toggle-slider"></div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="accessibility-widget">
//       <div className="widget-header">
//         <h2>Accessibility Options</h2>
//       </div>
//       <div className="widget-content">
//         <FeatureItem id="textToSpeech" icon="🔊" name="Text To Speech" />
//         <FeatureItem id="biggerText" icon="🔍" name="Bigger Text" />
//         <FeatureItem id="lineHeight" icon="↕️" name="Line Height" />
//         <FeatureItem id="highlightLinks" icon="🔗" name="Highlight Links" />
//         <FeatureItem id="textSpacing" icon="↔️" name="Text Spacing" />
//         <FeatureItem id="dyslexiaFriendly" icon="📖" name="Dyslexia Friendly" />
//         <FeatureItem id="hideImages" icon="🖼️" name="Hide Images" />
//         <FeatureItem id="cursor" icon="🖱️" name="Cursor" />
//         <FeatureItem id="darkMode" icon="🌙" name="Dark Mode" />
//         <FeatureItem id="invertColors" icon="🔄" name="Invert Colors" />
//       </div>
//       <div className="widget-footer">
//         <button className="reset-button" onClick={resetAll}>
//           Reset All Settings
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FBAccessibility;




import React, { useState, useEffect } from 'react';
import './FBAccessibility.css';

const FBAccessibility = () => {
  const [features, setFeatures] = useState({
    textToSpeech: false,
    biggerText: false,
    lineHeight: false,
    highlightLinks: false,
    textSpacing: false,
    dyslexiaFriendly: false,
    hideImages: false,
    cursor: false,
    darkMode: false,
    invertColors: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Apply styles based on active features
    document.body.style.fontSize = features.biggerText ? '120%' : '';
    document.body.style.lineHeight = features.lineHeight ? '1.8' : '';
    document.body.style.letterSpacing = features.textSpacing ? '1px' : '';
    document.body.style.wordSpacing = features.textSpacing ? '3px' : '';
    document.body.className = features.darkMode ? 'dark-mode' : '';
    
    if (features.dyslexiaFriendly) {
      document.body.style.fontFamily = '"Open Dyslexic", sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }

    const style = document.createElement('style');
    if (features.highlightLinks) {
      style.textContent = 'a { background-color: yellow; }';
    } else if (features.hideImages) {
      style.textContent = 'img { display: none !important; }';
    } else if (features.invertColors) {
      style.textContent = 'html { filter: invert(100%); }';
    } else {
      style.textContent = '';
    }
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [features]);

  const toggleFeature = (feature) => {
    setFeatures((prev) => {
      const newFeatures = { ...prev, [feature]: !prev[feature] };
      
      // Special handling for text-to-speech
      if (feature === 'textToSpeech') {
        if (newFeatures.textToSpeech) {
          window.speechSynthesis.speak(new SpeechSynthesisUtterance("Text to speech enabled"));
        } else {
          window.speechSynthesis.cancel();
        }
      }

      // Special handling for cursor
      if (feature === 'cursor') {
        document.body.style.cursor = newFeatures.cursor ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3Cline x1=\'12\' y1=\'16\' x2=\'12\' y2=\'12\'/%3E%3Cline x1=\'12\' y1=\'8\' x2=\'12\' y2=\'8\'/%3E%3C/svg%3E") 20 20, auto' : '';
      }

      return newFeatures;
    });
  };

  const resetAll = () => {
    setFeatures(Object.fromEntries(Object.keys(features).map(key => [key, false])));
    window.speechSynthesis.cancel();
    document.body.removeAttribute('style');
    document.body.className = '';
  };

  const FeatureItem = ({ id, icon, name }) => (
    <div className="feature-item">
      <button
        className={`feature-button ${features[id] ? 'active' : ''}`}
        onClick={() => toggleFeature(id)}
        title={`Toggle ${name}`}
      >
        <span className="feature-icon">{icon}</span>
        <span className="feature-name">{name}</span>
      </button>
      <div 
        className={`toggle ${features[id] ? 'active' : ''}`}
        onClick={() => toggleFeature(id)}
      >
        <div className="toggle-slider"></div>
      </div>
    </div>
  );

  return (
    <div className="accessibility-widget">
      <div className="widget-header">
        <h2>Accessibility Options</h2>
      </div>
      <div className="widget-content">
        <FeatureItem id="textToSpeech" icon="🔊" name="Text To Speech" />
        <FeatureItem id="biggerText" icon="🔍" name="Bigger Text" />
        <FeatureItem id="lineHeight" icon="↕️" name="Line Height" />
        <FeatureItem id="highlightLinks" icon="🔗" name="Highlight Links" />
        <FeatureItem id="textSpacing" icon="↔️" name="Text Spacing" />
        <FeatureItem id="dyslexiaFriendly" icon="📖" name="Dyslexia Friendly" />
        <FeatureItem id="hideImages" icon="🖼️" name="Hide Images" />
        <FeatureItem id="cursor" icon="🖱️" name="Cursor" />
        <FeatureItem id="darkMode" icon="🌙" name="Dark Mode" />
        <FeatureItem id="invertColors" icon="🔄" name="Invert Colors" />
      </div>
      <div className="widget-footer">
        <button className="reset-button" onClick={resetAll}>
          Reset All Settings
        </button>
      </div>
    </div>
  );
};

export default FBAccessibility;
