// libs/shared/ui/icons/src/lib/icon-color-map.ts
// AegisX Platform — Complete Icon Color Mapping (52 icons)

export const ICON_COLOR_MAP = {
  // Platform Management
  'users':              { hex: '#2563eb', tailwind: 'text-blue-600',    bg: 'bg-blue-50',    category: 'platform' },
  'rbac':               { hex: '#9333ea', tailwind: 'text-purple-600',  bg: 'bg-purple-50',  category: 'platform' },
  'organization':       { hex: '#059669', tailwind: 'text-emerald-600', bg: 'bg-emerald-50', category: 'platform' },
  'settings':           { hex: '#475569', tailwind: 'text-slate-600',   bg: 'bg-slate-50',   category: 'platform' },
  'audit-log':          { hex: '#a16207', tailwind: 'text-yellow-700',  bg: 'bg-yellow-50',  category: 'platform' },
  'monitoring':         { hex: '#059669', tailwind: 'text-emerald-600', bg: 'bg-emerald-50', category: 'platform' },
  'integration':        { hex: '#4f46e5', tailwind: 'text-indigo-600',  bg: 'bg-indigo-50',  category: 'platform' },
  'multi-site':         { hex: '#0d9488', tailwind: 'text-teal-600',    bg: 'bg-teal-50',    category: 'platform' },

  // Hospital App Modules
  'registration':       { hex: '#2563eb', tailwind: 'text-blue-600',    bg: 'bg-blue-50',    category: 'clinical' },
  'opd':                { hex: '#059669', tailwind: 'text-emerald-600', bg: 'bg-emerald-50', category: 'clinical' },
  'ipd':                { hex: '#4f46e5', tailwind: 'text-indigo-600',  bg: 'bg-indigo-50',  category: 'clinical' },
  'emergency':          { hex: '#dc2626', tailwind: 'text-red-600',     bg: 'bg-red-50',     category: 'clinical' },
  'laboratory':         { hex: '#0891b2', tailwind: 'text-cyan-600',    bg: 'bg-cyan-50',    category: 'diagnostics' },
  'radiology':          { hex: '#475569', tailwind: 'text-slate-600',   bg: 'bg-slate-50',   category: 'diagnostics' },
  'pharmacy':           { hex: '#2563eb', tailwind: 'text-blue-600',    bg: 'bg-blue-50',    category: 'clinical' },
  'surgery':            { hex: '#ea580c', tailwind: 'text-orange-600',  bg: 'bg-orange-50',  category: 'clinical' },
  'med-records':        { hex: '#9333ea', tailwind: 'text-purple-600',  bg: 'bg-purple-50',  category: 'clinical' },
  'billing':            { hex: '#ca8a04', tailwind: 'text-yellow-600',  bg: 'bg-yellow-50',  category: 'finance' },
  'blood-bank':         { hex: '#dc2626', tailwind: 'text-red-600',     bg: 'bg-red-50',     category: 'clinical' },
  'dental':             { hex: '#0284c7', tailwind: 'text-sky-600',     bg: 'bg-sky-50',     category: 'clinical' },
  'rehab':              { hex: '#0d9488', tailwind: 'text-teal-600',    bg: 'bg-teal-50',    category: 'clinical' },
  'nutrition':          { hex: '#ea580c', tailwind: 'text-orange-600',  bg: 'bg-orange-50',  category: 'clinical' },
  'referral':           { hex: '#4f46e5', tailwind: 'text-indigo-600',  bg: 'bg-indigo-50',  category: 'clinical' },
  'nursing':            { hex: '#db2777', tailwind: 'text-pink-600',    bg: 'bg-pink-50',    category: 'clinical' },
  'infection-control':  { hex: '#dc2626', tailwind: 'text-red-600',     bg: 'bg-red-50',     category: 'clinical' },
  'discharge':          { hex: '#059669', tailwind: 'text-emerald-600', bg: 'bg-emerald-50', category: 'clinical' },
  'telehealth':         { hex: '#0891b2', tailwind: 'text-cyan-600',    bg: 'bg-cyan-50',    category: 'clinical' },
  'appointment':        { hex: '#16a34a', tailwind: 'text-green-600',   bg: 'bg-green-50',   category: 'clinical' },
  'queue':              { hex: '#2563eb', tailwind: 'text-blue-600',    bg: 'bg-blue-50',    category: 'clinical' },
  'kiosk':              { hex: '#475569', tailwind: 'text-slate-600',   bg: 'bg-slate-50',   category: 'clinical' },
  'nhso-claims':        { hex: '#059669', tailwind: 'text-emerald-600', bg: 'bg-emerald-50', category: 'finance' },

  // Platform Tools
  'report-builder':     { hex: '#4f46e5', tailwind: 'text-indigo-600',  bg: 'bg-indigo-50',  category: 'tools' },
  'migration':          { hex: '#0891b2', tailwind: 'text-cyan-600',    bg: 'bg-cyan-50',    category: 'tools' },
  'notifications':      { hex: '#d97706', tailwind: 'text-amber-600',   bg: 'bg-amber-50',   category: 'tools' },
  'help-center':        { hex: '#64748b', tailwind: 'text-slate-500',   bg: 'bg-slate-50',   category: 'tools' },

  // Drug Inventory Module
  'drug-master':        { hex: '#2563eb', tailwind: 'text-blue-600',    bg: 'bg-blue-50',    category: 'inventory' },
  'tmt-catalog':        { hex: '#059669', tailwind: 'text-emerald-600', bg: 'bg-emerald-50', category: 'inventory' },
  'supplier':           { hex: '#16a34a', tailwind: 'text-green-600',   bg: 'bg-green-50',   category: 'inventory' },
  'lot-tracking':       { hex: '#7c3aed', tailwind: 'text-violet-600',  bg: 'bg-violet-50',  category: 'inventory' },
  'purchase-requisition': { hex: '#6366f1', tailwind: 'text-indigo-500', bg: 'bg-indigo-50', category: 'inventory' },
  'purchase-order':     { hex: '#3b82f6', tailwind: 'text-blue-500',    bg: 'bg-blue-50',    category: 'inventory' },
  'budget-ledger':      { hex: '#ca8a04', tailwind: 'text-yellow-600',  bg: 'bg-yellow-50',  category: 'inventory' },
  'goods-receive':      { hex: '#10b981', tailwind: 'text-emerald-500', bg: 'bg-emerald-50', category: 'inventory' },
  'bin-location':       { hex: '#7c3aed', tailwind: 'text-violet-600',  bg: 'bg-violet-50',  category: 'inventory' },
  'stock-overview':     { hex: '#2563eb', tailwind: 'text-blue-600',    bg: 'bg-blue-50',    category: 'inventory' },
  'stock-count':        { hex: '#ea580c', tailwind: 'text-orange-600',  bg: 'bg-orange-50',  category: 'inventory' },
  'transfer':           { hex: '#2563eb', tailwind: 'text-blue-600',    bg: 'bg-blue-50',    category: 'inventory' },
  'drug-return':        { hex: '#dc2626', tailwind: 'text-red-600',     bg: 'bg-red-50',     category: 'inventory' },
  'zone-picking':       { hex: '#6366f1', tailwind: 'text-indigo-500',  bg: 'bg-indigo-50',  category: 'inventory' },
  'wave-picking':       { hex: '#0891b2', tailwind: 'text-cyan-600',    bg: 'bg-cyan-50',    category: 'inventory' },
  'delivery':           { hex: '#059669', tailwind: 'text-emerald-600', bg: 'bg-emerald-50', category: 'inventory' },
  'dispensing':         { hex: '#d97706', tailwind: 'text-amber-600',   bg: 'bg-amber-50',   category: 'inventory' },
  'auth-lock':          { hex: '#dc2626', tailwind: 'text-red-600',     bg: 'bg-red-50',     category: 'inventory' },
  'fefo-expiry':        { hex: '#ef4444', tailwind: 'text-red-500',     bg: 'bg-red-50',     category: 'inventory' },
  'drug-interaction':   { hex: '#dc2626', tailwind: 'text-red-600',     bg: 'bg-red-50',     category: 'inventory' },
  'barcode-scan':       { hex: '#475569', tailwind: 'text-slate-600',   bg: 'bg-slate-50',   category: 'inventory' },
  'dashboard':          { hex: '#4f46e5', tailwind: 'text-indigo-600',  bg: 'bg-indigo-50',  category: 'inventory' },
  'alert':              { hex: '#d97706', tailwind: 'text-amber-600',   bg: 'bg-amber-50',   category: 'inventory' },
  'ven-abc':            { hex: '#0d9488', tailwind: 'text-teal-600',    bg: 'bg-teal-50',    category: 'inventory' },

  // Inventory module apps
  'app-inventory':      { hex: '#4f46e5', tailwind: 'text-indigo-600',  bg: 'bg-indigo-50',  category: 'inventory' },
  'inv-budget':         { hex: '#065f46', tailwind: 'text-emerald-700', bg: 'bg-emerald-50', category: 'inventory' },
  'inv-procurement':    { hex: '#1e3a5f', tailwind: 'text-blue-800',    bg: 'bg-blue-50',    category: 'inventory' },
  'inv-warehouse':      { hex: '#4338ca', tailwind: 'text-indigo-700',  bg: 'bg-indigo-50',  category: 'inventory' },
  'inv-substore':       { hex: '#7c2d12', tailwind: 'text-orange-800',  bg: 'bg-orange-50',  category: 'inventory' },

  // Clinical (additional)
  'icu':                { hex: '#991b1b', tailwind: 'text-red-700',     bg: 'bg-red-50',     category: 'clinical' },
  'hemodialysis':       { hex: '#1e3a5f', tailwind: 'text-blue-800',    bg: 'bg-blue-50',    category: 'clinical' },
  'home-health':        { hex: '#059669', tailwind: 'text-emerald-600', bg: 'bg-emerald-50', category: 'clinical' },
  'maternal':           { hex: '#db2777', tailwind: 'text-pink-600',    bg: 'bg-pink-50',    category: 'clinical' },
  'occupational-health':{ hex: '#0d9488', tailwind: 'text-teal-600',    bg: 'bg-teal-50',    category: 'clinical' },
  'ot-manage':          { hex: '#7f1d1d', tailwind: 'text-red-800',     bg: 'bg-red-50',     category: 'clinical' },
  'pathology':          { hex: '#155e75', tailwind: 'text-cyan-700',    bg: 'bg-cyan-50',    category: 'diagnostics' },
  'special-clinic':     { hex: '#4338ca', tailwind: 'text-indigo-700',  bg: 'bg-indigo-50',  category: 'clinical' },
  'thai-med':           { hex: '#065f46', tailwind: 'text-emerald-700', bg: 'bg-emerald-50', category: 'clinical' },
  'checkup':            { hex: '#166534', tailwind: 'text-green-700',   bg: 'bg-green-50',   category: 'clinical' },
  'cssd':               { hex: '#0891b2', tailwind: 'text-cyan-600',    bg: 'bg-cyan-50',    category: 'clinical' },
  'forensic':           { hex: '#334155', tailwind: 'text-slate-700',   bg: 'bg-slate-50',   category: 'clinical' },

  // Finance / back-office
  'cgd':                { hex: '#a16207', tailwind: 'text-yellow-700',  bg: 'bg-yellow-50',  category: 'back-office' },
  'cost-center':        { hex: '#ca8a04', tailwind: 'text-yellow-600',  bg: 'bg-yellow-50',  category: 'back-office' },
  'revenue':            { hex: '#15803d', tailwind: 'text-green-700',   bg: 'bg-green-50',   category: 'finance' },

  // Facilities & support
  'facilities':         { hex: '#475569', tailwind: 'text-slate-600',   bg: 'bg-slate-50',   category: 'facilities' },
  'cafeteria':          { hex: '#ea580c', tailwind: 'text-orange-600',  bg: 'bg-orange-50',  category: 'facilities' },
  'laundry':            { hex: '#0284c7', tailwind: 'text-sky-600',     bg: 'bg-sky-50',     category: 'facilities' },
  'meeting-room':       { hex: '#7c3aed', tailwind: 'text-violet-600',  bg: 'bg-violet-50',  category: 'facilities' },
  'vehicle':            { hex: '#1d4ed8', tailwind: 'text-blue-700',    bg: 'bg-blue-50',    category: 'facilities' },
  'waste':              { hex: '#65a30d', tailwind: 'text-lime-600',    bg: 'bg-lime-50',    category: 'facilities' },
  'staff-housing':      { hex: '#9a3412', tailwind: 'text-orange-800',  bg: 'bg-orange-50',  category: 'facilities' },
  'security':           { hex: '#1f2937', tailwind: 'text-gray-800',    bg: 'bg-gray-50',    category: 'facilities' },

  // HR
  'duty-schedule':      { hex: '#7e22ce', tailwind: 'text-purple-700',  bg: 'bg-purple-50',  category: 'hr' },
  'leave':              { hex: '#0891b2', tailwind: 'text-cyan-600',    bg: 'bg-cyan-50',    category: 'hr' },
  'social-security':    { hex: '#1e40af', tailwind: 'text-blue-700',    bg: 'bg-blue-50',    category: 'hr' },
  'training':           { hex: '#7c3aed', tailwind: 'text-violet-600',  bg: 'bg-violet-50',  category: 'hr' },
  'social-work':        { hex: '#db2777', tailwind: 'text-pink-600',    bg: 'bg-pink-50',    category: 'hr' },

  // Compliance & quality
  'complaint':          { hex: '#dc2626', tailwind: 'text-red-600',     bg: 'bg-red-50',     category: 'compliance' },
  'internal-audit':     { hex: '#a16207', tailwind: 'text-yellow-700',  bg: 'bg-yellow-50',  category: 'compliance' },
  'quality-ha':         { hex: '#0d9488', tailwind: 'text-teal-600',    bg: 'bg-teal-50',    category: 'compliance' },
  'risk-mgmt':          { hex: '#b91c1c', tailwind: 'text-red-700',     bg: 'bg-red-50',     category: 'compliance' },

  // Thai healthcare integration
  'thai-43files':       { hex: '#1e3a5f', tailwind: 'text-blue-800',    bg: 'bg-blue-50',    category: 'thai-integration' },
  'thai-dmsic':         { hex: '#155e75', tailwind: 'text-cyan-700',    bg: 'bg-cyan-50',    category: 'thai-integration' },
  'thai-drg':           { hex: '#7e22ce', tailwind: 'text-purple-700',  bg: 'bg-purple-50',  category: 'thai-integration' },
  'thai-e-referral':    { hex: '#4f46e5', tailwind: 'text-indigo-600',  bg: 'bg-indigo-50',  category: 'thai-integration' },
  'thai-icd10':         { hex: '#0e7490', tailwind: 'text-cyan-700',    bg: 'bg-cyan-50',    category: 'thai-integration' },
  'thai-moph':          { hex: '#1e3a5f', tailwind: 'text-blue-800',    bg: 'bg-blue-50',    category: 'thai-integration' },

  // Platform / analytics extras
  'api-integration':    { hex: '#4f46e5', tailwind: 'text-indigo-600',  bg: 'bg-indigo-50',  category: 'platform' },
  'dashboard-bi':       { hex: '#7e22ce', tailwind: 'text-purple-700',  bg: 'bg-purple-50',  category: 'analytics' },
} as const;

export type IconName = keyof typeof ICON_COLOR_MAP;
export type IconCategory =
  | 'platform'
  | 'clinical'
  | 'diagnostics'
  | 'finance'
  | 'back-office'
  | 'tools'
  | 'inventory'
  | 'facilities'
  | 'hr'
  | 'compliance'
  | 'thai-integration'
  | 'analytics';

export function getIconClasses(icon: IconName, size: 'sm' | 'md' | 'lg' = 'md'): string {
  const { tailwind, bg } = ICON_COLOR_MAP[icon];
  const s = { sm: 'w-8 h-8 rounded-md', md: 'w-10 h-10 rounded-lg', lg: 'w-12 h-12 rounded-xl' };
  return `inline-flex items-center justify-center ${s[size]} ${bg} ${tailwind}`;
}

export function getIconsByCategory(category: IconCategory): IconName[] {
  return (Object.keys(ICON_COLOR_MAP) as IconName[]).filter(n => ICON_COLOR_MAP[n].category === category);
}
