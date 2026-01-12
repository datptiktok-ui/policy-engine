import { Policy } from '@/types/policy';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Edit2, 
  Trash2, 
  Calendar, 
  Activity, 
  Bell, 
  History,
  PlayCircle,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users
} from 'lucide-react';
import { format } from 'date-fns';

interface PolicyDetailProps {
  policy: Policy;
  onClose: () => void;
}

export function PolicyDetail({ policy, onClose }: PolicyDetailProps) {
  return (
    <div className="h-full flex flex-col bg-card border-l border-border animate-slide-in-right">
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-border">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-muted-foreground">{policy.id}</span>
            <StatusBadge status={policy.status} />
            <TypeBadge type={policy.type} />
          </div>
          <h2 className="text-xl font-semibold text-foreground">{policy.name}</h2>
          <p className="text-sm text-muted-foreground">{policy.description}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="config" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-6 py-0 h-auto">
          <TabsTrigger 
            value="config" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            {policy.type === 'Preventive' ? (
              <><Calendar className="w-4 h-4 mr-2" /> Cấu hình PM</>
            ) : (
              <><Activity className="w-4 h-4 mr-2" /> Điều kiện Trigger</>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="sla"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            <Bell className="w-4 h-4 mr-2" /> SLA & Thông báo
          </TabsTrigger>
          <TabsTrigger 
            value="audit"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            <History className="w-4 h-4 mr-2" /> Lịch sử thay đổi
          </TabsTrigger>
          <TabsTrigger 
            value="simulation"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            <PlayCircle className="w-4 h-4 mr-2" /> Simulation
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-6">
          <TabsContent value="config" className="mt-0 space-y-6">
            {policy.type === 'Preventive' && policy.preventiveConfig && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Lịch trình</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {policy.preventiveConfig.frequency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mỗi {policy.preventiveConfig.interval} {policy.preventiveConfig.frequency.toLowerCase()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Ngày bắt đầu</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {format(new Date(policy.preventiveConfig.startDate), 'dd/MM/yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Auto-generate WO: {policy.preventiveConfig.autoGenerateWO ? 'Có' : 'Không'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Checklist Template
                  </h4>
                  <div className="space-y-2">
                    {policy.preventiveConfig.checklistTemplate.map((item, index) => (
                      <div 
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
                      >
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-sm text-foreground">{item.description}</span>
                        {item.required && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive">
                            Bắt buộc
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {policy.type === 'Condition' && policy.conditionConfig && (
              <>
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-status-draft" />
                    Điều kiện Trigger ({policy.conditionConfig.triggerOperator})
                  </h4>
                  <div className="space-y-2">
                    {policy.conditionConfig.triggers.map((trigger, index) => (
                      <div 
                        key={trigger.id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                      >
                        <span className="w-8 h-8 rounded-lg bg-policy-condition/20 text-policy-condition text-sm font-medium flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <span className="font-mono text-sm">
                            <span className="text-foreground">{trigger.metric}</span>
                            <span className="text-muted-foreground mx-2">{trigger.operator}</span>
                            <span className="text-primary font-semibold">{trigger.threshold}</span>
                            <span className="text-muted-foreground ml-1">{trigger.unit}</span>
                          </span>
                        </div>
                        {index < policy.conditionConfig!.triggers.length - 1 && (
                          <span className="px-2 py-0.5 rounded bg-accent text-xs font-medium text-muted-foreground">
                            {policy.conditionConfig!.triggerOperator}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Debounce Window</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {policy.conditionConfig.debounceMinutes} phút
                    </p>
                  </div>
                  {policy.conditionConfig.runningHoursThreshold && (
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm font-medium">Running Hours Threshold</span>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        {policy.conditionConfig.runningHoursThreshold.toLocaleString()} giờ
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="sla" className="mt-0 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Response Time</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {policy.slaConfig.responseTimeHours} <span className="text-sm font-normal text-muted-foreground">giờ</span>
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Resolution Time</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {policy.slaConfig.resolutionTimeHours} <span className="text-sm font-normal text-muted-foreground">giờ</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-status-draft" />
                Quy trình Escalation
              </h4>
              <div className="space-y-3">
                {policy.slaConfig.escalationLevels.map((level) => (
                  <div 
                    key={level.level}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-status-draft/20 text-status-draft font-bold flex items-center justify-center">
                      L{level.level}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Sau {level.afterHours} giờ
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {level.notifyRoles.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-0 space-y-4">
            <div className="space-y-4">
              {policy.auditTrail.map((entry) => (
                <div 
                  key={entry.id}
                  className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-medium flex items-center justify-center text-sm">
                    {entry.userName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{entry.userName}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-muted-foreground">
                        {entry.action}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(entry.timestamp), 'dd/MM/yyyy HH:mm')}
                    </p>
                    {entry.changes.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {entry.changes.map((change, i) => (
                          <p key={i} className="text-sm">
                            <span className="text-muted-foreground">{change.field}:</span>{' '}
                            <span className="text-destructive line-through">{change.oldValue}</span>
                            {' → '}
                            <span className="text-status-active">{change.newValue}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="simulation" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                <PlayCircle className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Policy Simulation</h4>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                Kiểm tra policy trên dữ liệu telemetry lịch sử để xem trước các Work Order sẽ được tạo
              </p>
              <Button className="gap-2">
                <PlayCircle className="w-4 h-4" />
                Chạy Simulation
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Actions */}
      <div className="flex items-center gap-3 p-6 border-t border-border">
        <Button variant="outline" className="flex-1 gap-2">
          <Edit2 className="w-4 h-4" />
          Chỉnh sửa
        </Button>
        <Button variant="outline" className="text-destructive hover:text-destructive gap-2">
          <Trash2 className="w-4 h-4" />
          Xóa
        </Button>
      </div>
    </div>
  );
}
