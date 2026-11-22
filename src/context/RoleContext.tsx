import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { UserRole, Permission, RoleDefinition } from '../types/rbac';
import { ROLES, checkPermission, getStoredRole, saveStoredRole } from '../utils/rbacConfig';

export interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  roleDefinition: RoleDefinition;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  canAddProduct: boolean;
  canEditProduct: boolean;
  canDeleteProduct: boolean;
  canManageCategories: boolean;
  canAccessTeam: boolean;
  canManageRoles: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isViewer: boolean;
}

const RoleContext = createContext<RoleContextType | null>(null);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => getStoredRole());

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    saveStoredRole(newRole);
  }, []);

  const hasPermission = useCallback(
    (permission: Permission) => checkPermission(role, permission),
    [role]
  );

  const hasAnyPermission = useCallback(
    (permissions: Permission[]) => permissions.some((p) => checkPermission(role, p)),
    [role]
  );

  const hasAllPermissions = useCallback(
    (permissions: Permission[]) => permissions.every((p) => checkPermission(role, p)),
    [role]
  );

  const roleDefinition = ROLES[role];

  const value = useMemo<RoleContextType>(
    () => ({
      role,
      setRole,
      roleDefinition,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      canAddProduct: checkPermission(role, 'add_product'),
      canEditProduct: checkPermission(role, 'edit_product'),
      canDeleteProduct: checkPermission(role, 'delete_product'),
      canManageCategories: checkPermission(role, 'manage_categories'),
      canAccessTeam: checkPermission(role, 'access_team'),
      canManageRoles: checkPermission(role, 'manage_roles'),
      isAdmin: role === 'admin',
      isManager: role === 'manager',
      isViewer: role === 'viewer',
    }),
    [role, setRole, roleDefinition, hasPermission, hasAnyPermission, hasAllPermissions]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export function usePermissions(): RoleContextType {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('usePermissions must be used within a RoleProvider');
  }
  return context;
}
