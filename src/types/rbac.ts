export type UserRole = 'admin' | 'manager' | 'viewer';

export type Permission =
  | 'view_dashboard'
  | 'view_products'
  | 'view_categories'
  | 'add_product'
  | 'edit_product'
  | 'delete_product'
  | 'manage_categories'
  | 'access_team'
  | 'manage_roles';

export type RolePermissions = Record<UserRole, Permission[]>;

export interface RoleDefinition {
  role: UserRole;
  label: string;
  badgeLabel: string;
  description: string;
  badgeClass: string;
  pillClass: string;
  permissions: Permission[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: 'active' | 'invited' | 'offline';
  department: string;
}
