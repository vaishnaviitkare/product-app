import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  UserCog,
  Eye,
  Check,
  X as XIcon,
  Lock,
  Mail,
} from 'lucide-react';
import { usePermissions } from '../hooks/usePermissions';
import { AccessDenied } from '../components/common/AccessDenied';
import type { UserRole, TeamMember } from '../types/rbac';

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'usr-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@company.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    department: 'Operations & Engineering',
  },
  {
    id: 'usr-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    department: 'Catalog Management',
  },
  {
    id: 'usr-3',
    name: 'Marcus Taylor',
    email: 'marcus.t@company.com',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    department: 'Merchandising',
  },
  {
    id: 'usr-4',
    name: 'Emily Watson',
    email: 'emily.w@company.com',
    role: 'viewer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    department: 'Analytics & Reporting',
  },
];

const PERMISSIONS_MATRIX = [
  {
    feature: 'View Dashboard & Catalog',
    description: 'Inspect products, categories, metrics & overview cards',
    admin: true,
    manager: true,
    viewer: true,
  },
  {
    feature: 'Search, Filter & Sort',
    description: 'Query products by title, category, price, rating',
    admin: true,
    manager: true,
    viewer: true,
  },
  {
    feature: 'Create / Add Products',
    description: 'Add new products via Zod-validated form to inventory',
    admin: true,
    manager: true,
    viewer: false,
  },
  {
    feature: 'Edit Existing Products',
    description: 'Modify title, price, description, images & stock',
    admin: true,
    manager: true,
    viewer: false,
  },
  {
    feature: 'Delete Products',
    description: 'Permanently remove products from catalog & storage',
    admin: true,
    manager: false,
    viewer: false,
  },
  {
    feature: 'Manage Categories',
    description: 'Create, edit, and organize product categories',
    admin: true,
    manager: false,
    viewer: false,
  },
  {
    feature: 'Access Team & Access',
    description: 'View and manage team member roles and permissions',
    admin: true,
    manager: false,
    viewer: false,
  },
  {
    feature: 'System Configuration',
    description: 'Reset dataset, restore API defaults & purge cache',
    admin: true,
    manager: false,
    viewer: false,
  },
];

interface TeamPageProps {
  onNavigateHome: () => void;
  onRoleNotice?: (msg: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigateHome, onRoleNotice }) => {
  const { canAccessTeam} = usePermissions();
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);

  // Guard: if not authorized, render AccessDenied view
  if (!canAccessTeam) {
    return (
      <AccessDenied
        requiredRole="Admin"
        actionName="view or manage Team & Access settings"
        onNavigateHome={onNavigateHome}
      />
    );
  }

  const handleMemberRoleChange = (memberId: string, newRole: UserRole) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
    if (onRoleNotice) {
      onRoleNotice(`Updated team member role to ${newRole.toUpperCase()}`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Exclusive
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Team & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage team members, inspect role permissions matrix, and review RBAC authorization rules.
          </p>
        </div>
      </div>

      {/* Security Architecture Callout */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 text-amber-900 flex items-start gap-3.5 shadow-2xs">
        <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0 mt-0.5">
          <Lock className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="font-semibold block text-amber-950 mb-0.5">
            Architecture Notice: Frontend-Only RBAC Simulation
          </strong>
          This application simulates Role-Based Access Control on the client side for demonstration.
          In a production environment, authorization checks must also be enforced by the backend API
          using cryptographically signed tokens (e.g. JWT claims, RBAC middleware, or OAuth scopes).
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Role Permissions Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Overview of authorized capabilities across all defined user roles
            </p>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/80">
                <th scope="col" className="py-3.5 px-4 rounded-l-xl">Feature / Capability</th>
                <th scope="col" className="py-3.5 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </div>
                </th>
                <th scope="col" className="py-3.5 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    <UserCog className="w-3.5 h-3.5" />
                    Manager
                  </div>
                </th>
                <th scope="col" className="py-3.5 px-4 text-center rounded-r-xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    <Eye className="w-3.5 h-3.5" />
                    Viewer
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {PERMISSIONS_MATRIX.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block text-xs sm:text-sm">
                      {item.feature}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.description}
                    </span>
                  </td>

                  {/* Admin */}
                  <td className="py-3.5 px-4 text-center">
                    {item.admin ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400">
                        <XIcon className="w-4 h-4" />
                      </span>
                    )}
                  </td>

                  {/* Manager */}
                  <td className="py-3.5 px-4 text-center">
                    {item.manager ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50 text-rose-500">
                        <XIcon className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    )}
                  </td>

                  {/* Viewer */}
                  <td className="py-3.5 px-4 text-center">
                    {item.viewer ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50 text-rose-500">
                        <XIcon className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Team Members
              </h2>
              <p className="text-xs text-slate-500">
                Assign roles and verify permission propagation for personnel
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {team.map((member) => (
            <div
              key={member.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {member.email}
                    </span>
                    <span>•</span>
                    <span>{member.department}</span>
                  </div>
                </div>
              </div>

              {/* Role selector dropdown for team member */}
              <div className="flex items-center gap-2 sm:self-center">
                <label htmlFor={`role-select-${member.id}`} className="text-xs text-slate-400 font-medium">
                  Role:
                </label>
                <select
                  id={`role-select-${member.id}`}
                  value={member.role}
                  onChange={(e) =>
                    handleMemberRoleChange(member.id, e.target.value as UserRole)
                  }
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25 transition-all cursor-pointer capitalize"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
