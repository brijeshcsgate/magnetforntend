
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function InspectionToolTip({ t_title, t_desc }) {
  return (
    <div>
      <Tooltip describeChild title={t_desc}>
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '50%' }}>
          {t_title?.substring(0, 150)}
        </div>

      </Tooltip>
    </div>
  );
}
