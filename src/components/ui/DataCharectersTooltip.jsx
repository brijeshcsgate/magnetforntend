import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const DataCharectersTooltip = ({ text, maxLength }) => {
  if (!text) return null;

  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <Tooltip title={text}>
      <span>{truncatedText}</span>
    </Tooltip>
  );
};

export default DataCharectersTooltip
