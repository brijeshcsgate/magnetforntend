import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-blue-primary-200 text-white',
        secondary:
          'border-transparent bg-gray-secondary text-white hover:bg-secondary/80',
        destructive:
          'border-transparent bg-red-500 text-white hover:bg-red-500/80',
        outline: 'text-foreground',
        issueOpen: 'bg-[#FF6F31] text-[white]',
        closedOpen: 'bg-[#F6BF32] text-[white]',
        resolvedOpen: 'bg-[#4D9CF9] text-[white]',
        overdueOpen: 'bg-[#58D20E] text-[white]',
        // dispach status
        assigned: 'bg-[#FED6B3] text-[#031015]',
        unassigned: 'bg-[#FDCFCF] text-[#850D12]',
        ready: 'bg-[#77FF95] text-[#181D02]',
        late: 'bg-[#E1EAEE] text-[#090909]',
        completed: 'bg-[#FDCFCF] text-[#850D12]',
        running: 'bg-[#89AFF9] text-[#FFFFFF]',
        'on-duty': 'bg-[#FDCFCF] text-[#850D12]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
