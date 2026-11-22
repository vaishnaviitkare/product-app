import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'purple' | 'amber' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
}

const colorMap = {
  primary: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/10',
  secondary: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/10',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10',
  warning: 'bg-amber-50 text-amber-800 border-amber-200 ring-amber-500/10',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/10',
  amber: 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/10',
  slate: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/10',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ring-1 ring-inset ${colorMap[variant]} ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
};
