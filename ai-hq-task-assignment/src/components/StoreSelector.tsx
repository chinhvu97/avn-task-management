import { Building2, ChevronDown } from 'lucide-react';
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { useState, useRef, useEffect } from 'react';

/**
 * StoreSelector Component
 *
 * Shows current store for single-store roles (locked display)
 * Shows dropdown selector for multi-store roles (HQ, SI, AM)
 */
export function StoreSelector() {
  const { profile, setCurrentStore } = useRole();
  const currentStore = getCurrentStore(profile);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Single-store role: Show locked display (no dropdown)
  if (profile.role === 'store-manager') {
    return (
      <div className="bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Building2 className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{currentStore?.name || 'Store'}</span>
        </div>
      </div>
    );
  }

  // Multi-store role: Show dropdown selector
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white px-4 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 hover:shadow-sm transition-all flex items-center gap-2 min-w-[300px] text-left"
      >
        <Building2 className="w-4 h-4 text-gray-600 flex-shrink-0" />
        <span className="text-sm font-medium text-gray-700 flex-1 truncate">
          {currentStore?.name || 'Select Store'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {profile.stores.map((store) => (
            <button
              key={store.id}
              onClick={() => {
                setCurrentStore(store.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 ${
                currentStore?.id === store.id ? 'bg-blue-50 hover:bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className={`w-4 h-4 flex-shrink-0 ${
                  currentStore?.id === store.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm truncate ${
                    currentStore?.id === store.id ? 'text-blue-700' : 'text-gray-800'
                  }`}>
                    {store.name}
                  </div>
                  {store.city && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {store.city} • {store.region}
                    </div>
                  )}
                </div>
                {currentStore?.id === store.id && (
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
