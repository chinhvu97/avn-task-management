import { ChevronRight, Store, Plus } from 'lucide-react';

export default function StoreList() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Store Management</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Store Management</h1>
          <p className="text-gray-500">Manage stores across all regions</p>
        </div>
        <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Store
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-800 mb-2">Store Management</h3>
        <p className="text-gray-500">This page will show store list and management features</p>
      </div>
    </div>
  );
}
