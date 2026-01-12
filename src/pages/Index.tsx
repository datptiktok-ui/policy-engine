import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { PolicyFilters } from '@/components/policy/PolicyFilters';
import { PolicyTable } from '@/components/policy/PolicyTable';
import { PolicyDetail } from '@/components/policy/PolicyDetail';
import { StatsCards } from '@/components/policy/StatsCards';
import { mockPolicies } from '@/data/mockPolicies';
import { Policy, PolicyStatus, PolicyType } from '@/types/policy';
import { toast } from 'sonner';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PolicyType | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<PolicyStatus | 'All'>('All');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const filteredPolicies = useMemo(() => {
    return mockPolicies.filter((policy) => {
      const matchesSearch = 
        policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'All' || policy.type === selectedType;
      const matchesStatus = selectedStatus === 'All' || policy.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, selectedType, selectedStatus]);

  const handleCreateNew = () => {
    toast.info('Tính năng tạo policy mới sẽ được triển khai sớm!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all ${selectedPolicy ? 'pr-0' : ''}`}>
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Stats */}
            <StatsCards policies={mockPolicies} />

            {/* Filters */}
            <PolicyFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onCreateNew={handleCreateNew}
            />

            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Hiển thị <span className="font-medium text-foreground">{filteredPolicies.length}</span> trong tổng số{' '}
                <span className="font-medium text-foreground">{mockPolicies.length}</span> policy
              </p>
            </div>

            {/* Table */}
            <PolicyTable
              policies={filteredPolicies}
              onSelect={setSelectedPolicy}
              selectedId={selectedPolicy?.id}
            />
          </div>
        </main>

        {/* Detail Panel */}
        {selectedPolicy && (
          <aside className="w-[520px] flex-shrink-0 border-l border-border">
            <PolicyDetail
              policy={selectedPolicy}
              onClose={() => setSelectedPolicy(null)}
            />
          </aside>
        )}
      </div>
    </div>
  );
};

export default Index;
