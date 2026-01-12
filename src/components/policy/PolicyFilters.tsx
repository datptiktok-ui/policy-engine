import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PolicyStatus, PolicyType } from '@/types/policy';
import { Search, Filter, Plus, Calendar, Activity, CheckCircle, FileEdit, Archive } from 'lucide-react';

interface PolicyFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: PolicyType | 'All';
  onTypeChange: (type: PolicyType | 'All') => void;
  selectedStatus: PolicyStatus | 'All';
  onStatusChange: (status: PolicyStatus | 'All') => void;
  onCreateNew: () => void;
}

export function PolicyFilters({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  onCreateNew,
}: PolicyFiltersProps) {
  const typeFilters: { value: PolicyType | 'All'; label: string; icon: typeof Filter }[] = [
    { value: 'All', label: 'Tất cả', icon: Filter },
    { value: 'Preventive', label: 'PM Calendar', icon: Calendar },
    { value: 'Condition', label: 'Condition-based', icon: Activity },
  ];

  const statusFilters: { value: PolicyStatus | 'All'; label: string; icon: typeof Filter }[] = [
    { value: 'All', label: 'Tất cả', icon: Filter },
    { value: 'Active', label: 'Active', icon: CheckCircle },
    { value: 'Draft', label: 'Draft', icon: FileEdit },
    { value: 'Archived', label: 'Archived', icon: Archive },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm policy..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50 border-border focus:bg-card"
          />
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Tạo Policy mới
        </Button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Loại:</span>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
            {typeFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.value}
                  onClick={() => onTypeChange(filter.value)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                    ${selectedType === filter.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Trạng thái:</span>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
            {statusFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.value}
                  onClick={() => onStatusChange(filter.value)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                    ${selectedStatus === filter.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
