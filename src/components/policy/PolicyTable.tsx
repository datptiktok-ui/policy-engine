import { Policy } from '@/types/policy';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import { ChevronRight, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PolicyTableProps {
  policies: Policy[];
  onSelect: (policy: Policy) => void;
  selectedId?: string;
}

export function PolicyTable({ policies, onSelect, selectedId }: PolicyTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ID
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tên Policy
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Loại
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Asset
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Cập nhật
            </th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <tr
              key={policy.id}
              onClick={() => onSelect(policy)}
              className={`
                border-b border-border/50 cursor-pointer transition-colors
                hover:bg-accent/50
                ${selectedId === policy.id ? 'bg-primary/5 border-l-2 border-l-primary' : ''}
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="py-3 px-4">
                <span className="font-mono text-sm text-muted-foreground">{policy.id}</span>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium text-foreground">{policy.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{policy.description}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <TypeBadge type={policy.type} />
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={policy.status} />
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-foreground">{policy.assetCategory}</span>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-foreground flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    {formatDistanceToNow(new Date(policy.updatedAt), { addSuffix: true })}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    {policy.createdBy}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
