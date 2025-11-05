import { Shield, Building, Network, Globe } from 'lucide-react';
import { useRole, getCurrentStore } from '../contexts/RoleContext';

/**
 * RoleIndicator Component
 *
 * Shows current user role with colored accent and context information
 * Different colors for each role: Blue (HQ), Orange (AM), Purple (SI), Pink (Store Manager)
 */
export function RoleIndicator() {
  const { profile } = useRole();
  const currentStore = getCurrentStore(profile);

  // Role-specific styling configuration
  const roleConfig = {
    'hq': {
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconBgColor: 'bg-blue-500',
      textColor: 'text-blue-700',
      icon: Shield,
      label: 'HQ Manager',
      description: `System-wide access • ${profile.stores.length} stores`,
    },
    'store-manager': {
      color: 'pink',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-600',
      iconBgColor: 'bg-pink-600',
      textColor: 'text-pink-700',
      icon: Building,
      label: 'Store Manager',
      description: currentStore?.name || 'Store access',
    },
    'si': {
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
      iconBgColor: 'bg-purple-500',
      textColor: 'text-purple-700',
      icon: Network,
      label: 'Store Inspection',
      description: `Managing ${profile.stores.length} stores`,
    },
    'am': {
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500',
      iconBgColor: 'bg-orange-500',
      textColor: 'text-orange-700',
      icon: Globe,
      label: 'Area Manager',
      description: `Regional oversight • ${profile.stores.length} stores`,
    },
  };

  const config = roleConfig[profile.role];
  const Icon = config.icon;

  return (
    <div className={`border-l-4 ${config.borderColor} ${config.bgColor} p-4 rounded-r mb-6 transition-all duration-200`}>
      <div className="flex items-center gap-3">
        <div className={`${config.iconBgColor} p-2 rounded-lg shadow-sm`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className={`font-semibold ${config.textColor} text-sm`}>
            {config.label}
          </div>
          <div className="text-xs text-gray-600 mt-0.5">
            {config.description}
          </div>
        </div>

        {/* Role badge */}
        <div className={`px-3 py-1 ${config.bgColor} ${config.borderColor} border rounded-full`}>
          <span className={`text-xs font-medium ${config.textColor}`}>
            {profile.name}
          </span>
        </div>
      </div>
    </div>
  );
}
