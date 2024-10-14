import { useEffect } from "react";

// Custom hook to enhance front-end deterrents for security
const useSecurityDeterrents = () => {
  useEffect(() => {
    // Disable right-click to prevent access to the context menu
    const disableRightClick = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", disableRightClick);

    // Disable common keyboard shortcuts for opening DevTools (F12, Ctrl+Shift+I/J/C/K, Ctrl+U)
    const disableDevToolsShortcuts = (e) => {
      if (
        e.key === "F12" || // F12
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "K")) || // Ctrl+Shift+I/J/C/K
        (e.ctrlKey && e.key === "U") // Ctrl+U (View Source)
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", disableDevToolsShortcuts);

    // Detect if DevTools is open using a console.log() trick
    const detectDevTools = () => {
      const element = new Image();
      Object.defineProperty(element, "id", {
        get: function () {
          alert("Developer tools are open! Be careful with your actions.");
        },
      });
      console.log(element);
    };

    const devToolsChecker = setInterval(detectDevTools, 1000);

    // Cleanup event listeners and intervals on component unmount
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      window.removeEventListener("keydown", disableDevToolsShortcuts);
      clearInterval(devToolsChecker);
    };
  }, []);
};

export default useSecurityDeterrents;
