import { cn } from '@/lib/utils';
import { PolicyType } from '@/types/policy';
import { Calendar, Activity } from 'lucide-react';

interface TypeBadgeProps {
  type: PolicyType;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  const variants: Record<PolicyType, string> = {
    Preventive: 'bg-policy-preventive/15 text-policy-preventive border-policy-preventive/30',
    Condition: 'bg-policy-condition/15 text-policy-condition border-policy-condition/30',
  };

  const Icon = type === 'Preventive' ? Calendar : Activity;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        variants[type],
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {type === 'Preventive' ? 'PM Calendar' : 'Condition-based'}
    </span>
  );
}
