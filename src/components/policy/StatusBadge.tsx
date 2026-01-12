import { cn } from '@/lib/utils';
import { PolicyStatus } from '@/types/policy';

interface StatusBadgeProps {
  status: PolicyStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants: Record<PolicyStatus, string> = {
    Active: 'bg-status-active/15 text-status-active border-status-active/30',
    Draft: 'bg-status-draft/15 text-status-draft border-status-draft/30',
    Archived: 'bg-status-archived/15 text-status-archived border-status-archived/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        variants[status],
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'Active' && 'bg-status-active animate-pulse-subtle',
          status === 'Draft' && 'bg-status-draft',
          status === 'Archived' && 'bg-status-archived'
        )}
      />
      {status}
    </span>
  );
}
