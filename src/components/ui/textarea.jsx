import * as React from 'react';

import { cn } from '@/lib/utils';
import { disableCopyPaste } from '@/utils/disableCopyPaste';

const Textarea = React.forwardRef(({ className,maxLength,charCount, ...props }, ref) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
    <textarea
      className={cn(
        'flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      // onCopy={disableCopyPaste}
      // onPaste={disableCopyPaste}
      ref={ref}
      {...props}
    />
    <div style={{
      position: 'absolute',
      bottom: '8px',
      right: '8px',
      color: '#7C7D7E',
      fontSize: '12px',
    }}>
      {charCount} /{ maxLength?maxLength:500}
    </div>
  </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
