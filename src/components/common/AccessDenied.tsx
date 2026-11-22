import React from 'react';
import { ShieldAlert, ArrowLeft, KeyRound, Check } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { ROLES } from '../../utils/rbacConfig';
import type { UserRole } from '../../types/rbac';

interface AccessDeniedProps {
  requiredRole?: string;
  actionName?: string;
  onNavigateHome?: () => void;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({
  requiredRole = 'Admin',
  actionName = 'access this section',
  onNavigateHome,
}) => {
  const { role, setRole, roleDefinition } = usePermissions();

  const roleOptions: UserRole[] = ['admin', 'manager', 'viewer'];

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-3xl border border-slate-200/90 shadow-sm max-w-2xl mx-auto my-8 animate-in fade-in duration-300">
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-5 shadow-xs">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
        403 • Access Denied
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
        Permission Required
      </h2>

      <p className="text-sm text-slate-600 max-w-md leading-relaxed mb-6">
        You are currently viewing as <span className="font-semibold text-slate-900">{roleDefinition.label}</span>.
        Your role does not have authorization to {actionName}. This capability requires{' '}
        <span className="font-semibold text-indigo-600">{requiredRole}</span> privileges.
      </p>

      {/* Demo Role Switcher Bar */}
      <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 text-left">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <KeyRound className="w-4 h-4 text-indigo-600" />
          <span>Switch Role for Demonstration:</span>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Product Hub uses client-side RBAC for demo purposes. Switch to an authorized role to unlock this view:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {roleOptions.map((r) => {
            const def = ROLES[r];
            const isSelected = role === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{def.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {onNavigateHome && (
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      )}
    </div>
  );
};
