export type PolicyStatus = 'Draft' | 'Active' | 'Archived';
export type PolicyType = 'Preventive' | 'Condition';
export type ScheduleFrequency = 'Daily' | 'Weekly' | 'Monthly';
export type TriggerOperator = 'AND' | 'OR';

export interface ChecklistItem {
  id: string;
  description: string;
  required: boolean;
}

export interface PreventiveConfig {
  frequency: ScheduleFrequency;
  interval: number;
  startDate: string;
  checklistTemplate: ChecklistItem[];
  autoGenerateWO: boolean;
}

export interface TriggerCondition {
  id: string;
  metric: string;
  operator: '>' | '<' | '>=' | '<=' | '==';
  threshold: number;
  unit: string;
}

export interface ConditionConfig {
  triggers: TriggerCondition[];
  triggerOperator: TriggerOperator;
  debounceMinutes: number;
  runningHoursThreshold?: number;
}

export interface SLAConfig {
  responseTimeHours: number;
  resolutionTimeHours: number;
  escalationLevels: {
    level: number;
    afterHours: number;
    notifyRoles: string[];
  }[];
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'Created' | 'Updated' | 'StatusChanged' | 'Deleted';
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  type: PolicyType;
  status: PolicyStatus;
  assetCategory: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  preventiveConfig?: PreventiveConfig;
  conditionConfig?: ConditionConfig;
  slaConfig: SLAConfig;
  auditTrail: AuditEntry[];
}
