import { Policy } from '@/types/policy';

export const mockPolicies: Policy[] = [
  {
    id: 'POL-001',
    name: 'Monthly Pump Inspection',
    description: 'Regular preventive maintenance for all centrifugal pumps',
    type: 'Preventive',
    status: 'Active',
    assetCategory: 'Pumps',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
    createdBy: 'Nguyen Van A',
    preventiveConfig: {
      frequency: 'Monthly',
      interval: 1,
      startDate: '2024-01-01',
      autoGenerateWO: true,
      checklistTemplate: [
        { id: '1', description: 'Check bearing temperature', required: true },
        { id: '2', description: 'Inspect seal condition', required: true },
        { id: '3', description: 'Verify vibration levels', required: true },
        { id: '4', description: 'Clean strainer', required: false },
      ],
    },
    slaConfig: {
      responseTimeHours: 4,
      resolutionTimeHours: 24,
      escalationLevels: [
        { level: 1, afterHours: 4, notifyRoles: ['Supervisor'] },
        { level: 2, afterHours: 8, notifyRoles: ['Manager', 'IOC'] },
      ],
    },
    auditTrail: [
      {
        id: 'AUD-001',
        timestamp: '2024-03-10T14:30:00Z',
        userId: 'USR-002',
        userName: 'Tran Thi B',
        action: 'Updated',
        changes: [
          { field: 'SLA Response Time', oldValue: '2 hours', newValue: '4 hours' },
        ],
      },
      {
        id: 'AUD-002',
        timestamp: '2024-01-15T08:00:00Z',
        userId: 'USR-001',
        userName: 'Nguyen Van A',
        action: 'Created',
        changes: [],
      },
    ],
  },
  {
    id: 'POL-002',
    name: 'High Temperature Alert - Compressors',
    description: 'Condition-based monitoring for compressor temperature anomalies',
    type: 'Condition',
    status: 'Active',
    assetCategory: 'Compressors',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
    createdBy: 'Le Van C',
    conditionConfig: {
      triggers: [
        { id: 'T1', metric: 'Temperature', operator: '>', threshold: 85, unit: '°C' },
        { id: 'T2', metric: 'Vibration', operator: '>', threshold: 12, unit: 'mm/s' },
      ],
      triggerOperator: 'OR',
      debounceMinutes: 15,
      runningHoursThreshold: 5000,
    },
    slaConfig: {
      responseTimeHours: 1,
      resolutionTimeHours: 8,
      escalationLevels: [
        { level: 1, afterHours: 1, notifyRoles: ['Technician', 'Supervisor'] },
        { level: 2, afterHours: 4, notifyRoles: ['Manager', 'IOC', 'Safety'] },
      ],
    },
    auditTrail: [
      {
        id: 'AUD-003',
        timestamp: '2024-02-01T10:00:00Z',
        userId: 'USR-003',
        userName: 'Le Van C',
        action: 'Created',
        changes: [],
      },
    ],
  },
  {
    id: 'POL-003',
    name: 'Weekly Generator Check',
    description: 'Routine weekly inspection for backup generators',
    type: 'Preventive',
    status: 'Draft',
    assetCategory: 'Generators',
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-05T11:00:00Z',
    createdBy: 'Pham Thi D',
    preventiveConfig: {
      frequency: 'Weekly',
      interval: 1,
      startDate: '2024-03-11',
      autoGenerateWO: true,
      checklistTemplate: [
        { id: '1', description: 'Check fuel level', required: true },
        { id: '2', description: 'Test start sequence', required: true },
        { id: '3', description: 'Inspect battery terminals', required: true },
      ],
    },
    slaConfig: {
      responseTimeHours: 8,
      resolutionTimeHours: 48,
      escalationLevels: [
        { level: 1, afterHours: 8, notifyRoles: ['Supervisor'] },
      ],
    },
    auditTrail: [
      {
        id: 'AUD-004',
        timestamp: '2024-03-05T11:00:00Z',
        userId: 'USR-004',
        userName: 'Pham Thi D',
        action: 'Updated',
        changes: [
          { field: 'Status', oldValue: 'Active', newValue: 'Draft' },
        ],
      },
    ],
  },
  {
    id: 'POL-004',
    name: 'Oil Pressure Monitoring - Turbines',
    description: 'Real-time monitoring of oil pressure in gas turbines',
    type: 'Condition',
    status: 'Active',
    assetCategory: 'Turbines',
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-02-28T16:00:00Z',
    createdBy: 'Hoang Van E',
    conditionConfig: {
      triggers: [
        { id: 'T1', metric: 'Oil Pressure', operator: '<', threshold: 2.5, unit: 'bar' },
      ],
      triggerOperator: 'AND',
      debounceMinutes: 5,
    },
    slaConfig: {
      responseTimeHours: 0.5,
      resolutionTimeHours: 4,
      escalationLevels: [
        { level: 1, afterHours: 0.5, notifyRoles: ['Operator', 'IOC'] },
        { level: 2, afterHours: 2, notifyRoles: ['Manager', 'Safety', 'Engineering'] },
      ],
    },
    auditTrail: [
      {
        id: 'AUD-005',
        timestamp: '2024-02-28T16:00:00Z',
        userId: 'USR-005',
        userName: 'Hoang Van E',
        action: 'Updated',
        changes: [
          { field: 'Debounce Window', oldValue: '10 minutes', newValue: '5 minutes' },
        ],
      },
    ],
  },
  {
    id: 'POL-005',
    name: 'Quarterly Valve Inspection',
    description: 'Comprehensive valve inspection and testing program',
    type: 'Preventive',
    status: 'Archived',
    assetCategory: 'Valves',
    createdAt: '2023-06-01T08:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'Nguyen Van A',
    preventiveConfig: {
      frequency: 'Monthly',
      interval: 3,
      startDate: '2023-07-01',
      autoGenerateWO: true,
      checklistTemplate: [
        { id: '1', description: 'Visual inspection', required: true },
        { id: '2', description: 'Leak test', required: true },
        { id: '3', description: 'Actuator function test', required: true },
        { id: '4', description: 'Lubricate stem', required: false },
      ],
    },
    slaConfig: {
      responseTimeHours: 24,
      resolutionTimeHours: 72,
      escalationLevels: [
        { level: 1, afterHours: 24, notifyRoles: ['Supervisor'] },
      ],
    },
    auditTrail: [
      {
        id: 'AUD-006',
        timestamp: '2024-01-01T00:00:00Z',
        userId: 'USR-001',
        userName: 'Nguyen Van A',
        action: 'StatusChanged',
        changes: [
          { field: 'Status', oldValue: 'Active', newValue: 'Archived' },
        ],
      },
    ],
  },
];
