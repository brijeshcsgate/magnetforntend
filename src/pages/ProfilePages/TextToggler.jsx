import React, { useState } from "react";

const TextToggler = ({ text, charLimit = 50 ,isShowBtn}) => {
  // State to toggle between showing full or partial text
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the text view
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* Show truncated text based on charLimit if not expanded */}
      <p>{isExpanded ? text : `${text.slice(0, charLimit)}...`}</p>
      
      {/* Button to toggle between expanded and collapsed view */}
      {/* <button onClick={toggleText}>
        {isExpanded ? "Show Less" : "Show More"}
      </button> */}
      {isShowBtn===true?
      <span onClick={toggleText} id="myBtn">
      {isExpanded ? "show Less" : "see More"}
                      </span>:<></>
}
    </div>
  );
};

export default TextToggler;
