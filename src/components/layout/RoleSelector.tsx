import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  UserCog,
  Eye,
  ChevronDown,
  Check,
  Lock,
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { ROLES } from '../../utils/rbacConfig';
import type { UserRole } from '../../types/rbac';

interface RoleSelectorProps {
  variant?: 'navbar' | 'compact' | 'prominent';
  className?: string;
  onRoleChangeNotice?: (roleName: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  variant = 'navbar',
  className = '',
  onRoleChangeNotice,
}) => {
  const { role, setRole, roleDefinition } = usePermissions();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const rolesList: {
    key: UserRole;
    icon: React.ElementType;
    badgeStyle: string;
    canSummary: string;
  }[] = [
    {
      key: 'admin',
      icon: ShieldCheck,
      badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      canSummary: 'Full Access • Add, Edit, Delete, Team & Categories',
    },
    {
      key: 'manager',
      icon: UserCog,
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      canSummary: 'Add & Edit • Cannot Delete or Manage Team',
    },
    {
      key: 'viewer',
      icon: Eye,
      badgeStyle: 'bg-slate-100 text-slate-700 border-slate-200',
      canSummary: 'Read-only • Browse, Search & Filter Only',
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsOpen(false);
    if (onRoleChangeNotice) {
      onRoleChangeNotice(ROLES[selectedRole].label);
    }
  };

  const getRoleIcon = (roleKey: UserRole) => {
    switch (roleKey) {
      case 'admin':
        return ShieldCheck;
      case 'manager':
        return UserCog;
      case 'viewer':
      default:
        return Eye;
    }
  };

  const ActiveIcon = getRoleIcon(role);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Current Role: ${roleDefinition.label}. Click to switch role.`}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25 ${
          role === 'admin'
            ? 'bg-indigo-50/90 text-indigo-800 border-indigo-200 hover:bg-indigo-100/90'
            : role === 'manager'
            ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200 hover:bg-emerald-100/90'
            : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
        } ${variant === 'prominent' ? 'px-3.5 py-2 text-sm shadow-sm' : ''}`}
      >
        <span className="flex items-center gap-1.5">
          <ActiveIcon
            className={`w-3.5 h-3.5 ${
              role === 'admin'
                ? 'text-indigo-600'
                : role === 'manager'
                ? 'text-emerald-600'
                : 'text-slate-500'
            }`}
          />
          <span className="text-slate-500 font-medium">Role:</span>
          <span className="font-bold">{roleDefinition.label}</span>
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-700' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl bg-white shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right focus:outline-hidden"
        >
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                Select Active Role (RBAC)
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Switch roles to instantly simulate permissions across the app
            </p>
          </div>

          {/* Role Items List */}
          <div className="p-2 space-y-1">
            {rolesList.map((item) => {
              const def = ROLES[item.key];
              const Icon = item.icon;
              const isSelected = role === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelectRole(item.key)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/70 border border-indigo-200/80 shadow-2xs'
                      : 'hover:bg-slate-50/90 border border-transparent'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${item.badgeStyle}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          {def.label}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-600 text-white">
                            Active
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      )}
                    </div>

                    <p className="text-[11px] font-medium text-slate-600 mt-0.5">
                      {item.canSummary}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                      {def.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            <span>Frontend demo: real production apps require server verification.</span>
          </div>
        </div>
      )}
    </div>
  );
};
