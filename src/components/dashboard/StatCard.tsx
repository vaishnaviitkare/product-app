import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'indigo' | 'emerald' | 'amber' | 'purple' | 'blue';
  trend?: {
    label: string;
    positive?: boolean;
  };
}

const variantStyles = {
  indigo: {
    bgIcon: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    border: 'hover:border-indigo-200',
  },
  emerald: {
    bgIcon: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    border: 'hover:border-emerald-200',
  },
  amber: {
    bgIcon: 'bg-amber-50 text-amber-600 border-amber-100',
    border: 'hover:border-amber-200',
  },
  purple: {
    bgIcon: 'bg-purple-50 text-purple-600 border-purple-100',
    border: 'hover:border-purple-200',
  },
  blue: {
    bgIcon: 'bg-blue-50 text-blue-600 border-blue-100',
    border: 'hover:border-blue-200',
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'indigo',
  trend,
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs transition-all duration-200 ${styles.border} flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {value}
          </h3>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs shrink-0 ${styles.bgIcon}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{subtitle}</span>
          {trend && (
            <span
              className={`font-medium ${
                trend.positive ? 'text-emerald-600' : 'text-slate-500'
              }`}
            >
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
