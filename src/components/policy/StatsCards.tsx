import { Policy } from '@/types/policy';
import { FileText, CheckCircle, FileEdit, Archive } from 'lucide-react';

interface StatsCardsProps {
  policies: Policy[];
}

export function StatsCards({ policies }: StatsCardsProps) {
  const total = policies.length;
  const active = policies.filter(p => p.status === 'Active').length;
  const draft = policies.filter(p => p.status === 'Draft').length;
  const archived = policies.filter(p => p.status === 'Archived').length;

  const stats = [
    { 
      label: 'Tổng số Policy', 
      value: total, 
      icon: FileText, 
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    { 
      label: 'Đang hoạt động', 
      value: active, 
      icon: CheckCircle, 
      color: 'text-status-active',
      bg: 'bg-status-active/10'
    },
    { 
      label: 'Bản nháp', 
      value: draft, 
      icon: FileEdit, 
      color: 'text-status-draft',
      bg: 'bg-status-draft/10'
    },
    { 
      label: 'Đã lưu trữ', 
      value: archived, 
      icon: Archive, 
      color: 'text-status-archived',
      bg: 'bg-status-archived/10'
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.label}
            className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
