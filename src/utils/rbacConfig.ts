import type { UserRole, Permission, RolePermissions, RoleDefinition } from '../types/rbac';

export const ROLE_PERMISSIONS: RolePermissions = {
  admin: [
    'view_dashboard',
    'view_products',
    'view_categories',
    'add_product',
    'edit_product',
    'delete_product',
    'manage_categories',
    'access_team',
    'manage_roles',
  ],
  manager: [
    'view_dashboard',
    'view_products',
    'view_categories',
    'add_product',
    'edit_product',
  ],
  viewer: [
    'view_dashboard',
    'view_products',
    'view_categories',
  ],
};

export const ROLES: Record<UserRole, RoleDefinition> = {
  admin: {
    role: 'admin',
    label: 'Admin',
    badgeLabel: 'Administrator',
    description: 'Complete unrestricted access: add, edit, delete products, manage categories, and manage team access.',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/10',
    pillClass: 'bg-indigo-600 text-white',
    permissions: ROLE_PERMISSIONS.admin,
  },
  manager: {
    role: 'manager',
    label: 'Manager',
    badgeLabel: 'Catalog Manager',
    description: 'Inventory management: can create and edit products. Cannot delete products or manage team permissions.',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10',
    pillClass: 'bg-emerald-600 text-white',
    permissions: ROLE_PERMISSIONS.manager,
  },
  viewer: {
    role: 'viewer',
    label: 'Viewer',
    badgeLabel: 'Read-only Viewer',
    description: 'Read-only access: can browse dashboard, search, filter, and inspect product details.',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/10',
    pillClass: 'bg-slate-600 text-white',
    permissions: ROLE_PERMISSIONS.viewer,
  },
};

const ROLE_STORAGE_KEY = 'product_hub_user_role';

export function getStoredRole(): UserRole {
  try {
    const saved = localStorage.getItem(ROLE_STORAGE_KEY);
    if (saved === 'admin' || saved === 'manager' || saved === 'viewer') {
      return saved;
    }
  } catch (err) {
    console.error('Failed to read role from localStorage:', err);
  }
  return 'admin';
}

export function saveStoredRole(role: UserRole): void {
  try {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  } catch (err) {
    console.error('Failed to save role to localStorage:', err);
  }
}

export function checkPermission(role: UserRole, permission: Permission): boolean {
  const allowed = ROLE_PERMISSIONS[role];
  return Boolean(allowed && allowed.includes(permission));
}
