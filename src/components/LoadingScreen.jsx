import { cn } from '@/lib/utils';
import { ButtonLoadingIcon } from './icons';

export default function LoadingScreen({ className }) {
  return (
    <section
      className={cn(
        'w-full h-full bg-transparent flex items-center justify-center',
        className
      )}
    >
      <ButtonLoadingIcon className="h-12 w-12 text-blue-primary-200" />
    </section>
  );
}
