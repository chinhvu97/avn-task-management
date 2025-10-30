import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  LayoutDashboard,
  ListTodo,
  Users,
  Clock,
  BarChart3,
  Store,
  Settings,
  Bell,
  ChevronRight,
  ChevronLeft,
  Building2,
  UserCog
} from 'lucide-react';
import { useRole, hasPermission, getCurrentStore, UserRole } from '../contexts/RoleContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { profile, switchRole, setCurrentStore } = useRole();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showStoreSwitcher, setShowStoreSwitcher] = useState(false);

  const currentStore = getCurrentStore(profile);
  const hasMultipleStores = profile.stores.length > 1;

  const roleSwitcherRef = useRef<HTMLDivElement>(null);
  const storeSwitcherRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleSwitcherRef.current && !roleSwitcherRef.current.contains(event.target as Node)) {
        setShowRoleSwitcher(false);
      }
      if (storeSwitcherRef.current && !storeSwitcherRef.current.contains(event.target as Node)) {
        setShowStoreSwitcher(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter navigation based on role permissions
  const allNavigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      permission: 'dashboard',
    },
    {
      name: 'Task Management',
      icon: ListTodo,
      permission: 'task-assignment',
      children: [
        { name: 'AI Task Assignment', href: '/task-assignment', permission: 'task-assignment' },
        { name: 'Task Monitoring', href: '/task-monitoring', permission: 'task-monitoring' },
        // Template creation is HQ-only (uses 'settings' permission as proxy for HQ)
        { name: 'DWS Templates', href: '/dws-templates', permission: 'settings' },
        { name: 'WS Templates', href: '/ws-templates', permission: 'settings' },
      ]
    },
    {
      name: 'Staff Management',
      href: '/staff',
      icon: Users,
      permission: 'staff',
    },
    {
      name: 'Shift Management',
      icon: Clock,
      permission: 'shifts',
      children: [
        { name: 'Shift Schedule', href: '/shift-schedule', permission: 'shifts' },
        { name: 'Leave Requests', href: '/leave-requests', permission: 'leave-requests' },
        { name: 'Attendance', href: '/attendance', permission: 'attendance' },
      ]
    },
    {
      name: 'Analytics',
      icon: BarChart3,
      permission: 'performance',
      children: [
        { name: 'Performance', href: '/performance', permission: 'performance' },
        { name: 'Leaderboard', href: '/leaderboard', permission: 'leaderboard' },
      ]
    },
    {
      name: 'Store Management',
      icon: Store,
      permission: 'stores',
      children: [
        { name: 'Store List', href: '/stores', permission: 'stores' },
      ]
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      permission: 'settings',
    },
  ];

  // Filter navigation items based on current role
  const navigation = allNavigation.filter(item => {
    if (!item.permission) return true;
    const hasAccess = hasPermission(profile.role, item.permission);
    if (hasAccess && item.children) {
      // Filter children too
      item.children = item.children.filter(child =>
        !child.permission || hasPermission(profile.role, child.permission)
      );
    }
    return hasAccess;
  });

  const [expandedSections, setExpandedSections] = useState<string[]>(['Task Management', 'Shift Management', 'Analytics', 'Store Management']);

  const toggleSection = (name: string) => {
    setExpandedSections(prev =>
      prev.includes(name)
        ? prev.filter(s => s !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col overflow-hidden relative`}
        style={{ position: 'fixed', top: 0, left: 0, height: '100vh' }}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="bg-pink-600 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">RetailFlow</div>
                <div className="text-xs text-gray-500">Manager</div>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="bg-pink-600 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.name)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 mb-1"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedSections.includes(item.name) ? 'rotate-90' : ''}`} />
                    )}
                  </button>
                  {expandedSections.includes(item.name) && !sidebarCollapsed && (
                    <div className="ml-8 mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`block px-3 py-2 rounded-lg text-sm mb-1 ${
                            location.pathname === child.href
                              ? 'bg-pink-50 text-pink-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 ${
                    location.pathname === item.href
                      ? 'bg-pink-50 text-pink-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-4 left-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-50 text-gray-600"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarCollapsed ? '4rem' : '16rem' }}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          {/* Store Selector (for multi-store roles) */}
          <div className="flex items-center gap-3">
            {hasMultipleStores && currentStore && (
              <div className="relative" ref={storeSwitcherRef}>
                <button
                  onClick={() => setShowStoreSwitcher(!showStoreSwitcher)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Building2 className="w-4 h-4 text-gray-600" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Current Store</div>
                    <div className="text-sm font-medium text-gray-800">{currentStore.name}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${showStoreSwitcher ? 'rotate-90' : ''}`} />
                </button>
                {showStoreSwitcher && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-2 border-b border-gray-200">
                      <div className="text-xs font-medium text-gray-500 px-2 py-1">
                        Your Stores ({profile.stores.length})
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {profile.stores.map(store => (
                        <button
                          key={store.id}
                          onClick={() => {
                            setCurrentStore(store.id);
                            setShowStoreSwitcher(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                            store.id === currentStore.id ? 'bg-pink-50' : ''
                          }`}
                        >
                          <div className="font-medium text-gray-800">{store.name}</div>
                          <div className="text-xs text-gray-500">{store.code} • {store.city}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side: Role Switcher + Notifications + Profile */}
          <div className="flex items-center gap-4">
            {/* Demo Role Switcher */}
            <div className="relative" ref={roleSwitcherRef}>
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="flex items-center gap-2 px-3 py-2 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 transition-colors"
              >
                <UserCog className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-pink-600">Demo: Switch Role</span>
                <ChevronRight className={`w-4 h-4 text-pink-600 transition-transform ${showRoleSwitcher ? 'rotate-90' : ''}`} />
              </button>
              {showRoleSwitcher && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2 border-b border-gray-200">
                    <div className="text-xs font-medium text-gray-500 px-2 py-1">Select Demo Role</div>
                  </div>
                  {[
                    { role: 'hq' as UserRole, label: 'HQ Manager', desc: 'Create task templates, system settings' },
                    { role: 'store-manager' as UserRole, label: 'Store Manager', desc: 'Assign tasks, manage 1 store' },
                    { role: 'si' as UserRole, label: 'SI (Store Inspection)', desc: 'Manage 2-3 stores, cross-store staff' },
                    { role: 'am' as UserRole, label: 'AM (Area Manager)', desc: 'Regional oversight, staff allocation' },
                  ].map(({ role, label, desc }) => (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setShowRoleSwitcher(false);
                        setShowStoreSwitcher(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 ${
                        profile.role === role ? 'bg-pink-50' : ''
                      }`}
                    >
                      <div className="font-medium text-gray-800">{label}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-2 rounded-lg hover:bg-gray-50 relative">
              <Bell className="w-5 h-5 text-gray-800" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 p-2 rounded-lg">
              <div className="w-8 h-8 bg-indigo-500 rounded-full overflow-hidden">
                <span className="flex items-center justify-center h-full text-white text-sm font-medium">
                  {profile.avatar}
                </span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-800">{profile.name}</div>
                <div className="text-xs text-gray-500">{profile.roleLabel}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
