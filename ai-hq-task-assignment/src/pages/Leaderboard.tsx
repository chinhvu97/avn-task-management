import { useState } from 'react';
import { Trophy, Medal, Award, ChevronRight, Calendar } from 'lucide-react';
import { mockLeaderboard, mockStoreLeaderboard, calculatePoints } from 'shared-data';

export default function Leaderboard() {
  const [selectedLevel, setSelectedLevel] = useState<'store' | 'regional' | 'global'>('store');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Map staff IDs to store names (using actual store names from shared data)
  const storeNameMap: Record<string, string> = {
    // Ocean Park Hawaii Building
    'DEMO-001': 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    'DEMO-002': 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    'DEMO-003': 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    'DEMO-004': 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    'DEMO-005': 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    'DEMO-006': 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    'DEMO-007': 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    'DEMO-008': 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    // Sky Oasis
    'SKY-001': 'AEON MAXVALU SKY OASIS',
    'SKY-002': 'AEON MAXVALU SKY OASIS',
    'SKY-003': 'AEON MAXVALU SKY OASIS',
    'SKY-004': 'AEON MAXVALU SKY OASIS',
    'SKY-005': 'AEON MAXVALU SKY OASIS',
    'SKY-006': 'AEON MAXVALU SKY OASIS',
    // Ecopark Rừng Cọ
    'RC-001': 'AEON MAXVALU ECOPARK RỪNG CỌ',
    'RC-002': 'AEON MAXVALU ECOPARK RỪNG CỌ',
    'RC-003': 'AEON MAXVALU ECOPARK RỪNG CỌ',
    'RC-004': 'AEON MAXVALU ECOPARK RỪNG CỌ',
    'RC-005': 'AEON MAXVALU ECOPARK RỪNG CỌ',
    'RC-006': 'AEON MAXVALU ECOPARK RỪNG CỌ',
    'RC-007': 'AEON MAXVALU ECOPARK RỪNG CỌ',
    // Ecopark
    'EP-001': 'AEON MAXVALU ECOPARK',
    'EP-002': 'AEON MAXVALU ECOPARK',
    'EP-003': 'AEON MAXVALU ECOPARK',
    'EP-004': 'AEON MAXVALU ECOPARK',
    'EP-005': 'AEON MAXVALU ECOPARK',
    'EP-006': 'AEON MAXVALU ECOPARK',
  };

  // Create extended leaderboard with display data
  const leaderboardData = mockLeaderboard.map(entry => ({
    rank: entry.rank,
    name: entry.staffName,
    store: storeNameMap[entry.staffId] || 'Unknown Store',
    tasksCompleted: entry.tasksCompleted,
    completionRate: entry.completionRate,
    totalHours: entry.totalHours,
    efficiency: entry.efficiency,
    points: calculatePoints(entry),
  }));

  const storeLeaderboard = mockStoreLeaderboard;

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' };
    if (rank === 2) return { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-50' };
    if (rank === 3) return { icon: Award, color: 'text-orange-600', bg: 'bg-orange-50' };
    return { icon: null, color: 'text-gray-600', bg: 'bg-white' };
  };

  const topThree = leaderboardData.slice(0, 3);
  const remainingStaff = leaderboardData.slice(3);

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Analytics</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Leaderboard</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Leaderboard</h1>
          <p className="text-gray-500">Top performers across stores, regions, and globally</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md">
            <Calendar className="w-4 h-4 text-gray-600" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border-none outline-none text-sm bg-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Level Selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-1 mb-6 inline-flex">
        <button
          onClick={() => setSelectedLevel('store')}
          className={`px-6 py-2 rounded-md ${selectedLevel === 'store' ? 'bg-pink-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Store Level
        </button>
        <button
          onClick={() => setSelectedLevel('regional')}
          className={`px-6 py-2 rounded-md ${selectedLevel === 'regional' ? 'bg-pink-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Regional Level
        </button>
        <button
          onClick={() => setSelectedLevel('global')}
          className={`px-6 py-2 rounded-md ${selectedLevel === 'global' ? 'bg-pink-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Global Level
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* 1st Place */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <Trophy className="w-10 h-10 text-yellow-500 mb-4" />
            <div className="font-bold text-gray-800 text-center text-lg mb-2">{topThree[0]?.name}</div>
            <div className="text-sm text-gray-600 mb-3">{topThree[0]?.store}</div>
            <div className="text-3xl font-bold text-yellow-600 mb-1">{topThree[0]?.points}</div>
            <div className="text-xs text-gray-600 mb-4">points</div>
            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div>
                <div className="text-xl font-bold text-gray-800">{topThree[0]?.tasksCompleted}</div>
                <div className="text-xs text-gray-600">Tasks</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">{topThree[0]?.completionRate}%</div>
                <div className="text-xs text-gray-600">Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd Place */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <Medal className="w-10 h-10 text-gray-400 mb-4" />
            <div className="font-semibold text-gray-800 text-center mb-2">{topThree[1]?.name}</div>
            <div className="text-sm text-gray-500 mb-3">{topThree[1]?.store}</div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{topThree[1]?.points}</div>
            <div className="text-xs text-gray-500 mb-4">points</div>
            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div>
                <div className="text-lg font-semibold text-gray-800">{topThree[1]?.tasksCompleted}</div>
                <div className="text-xs text-gray-500">Tasks</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-600">{topThree[1]?.completionRate}%</div>
                <div className="text-xs text-gray-500">Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <Award className="w-10 h-10 text-orange-600 mb-4" />
            <div className="font-semibold text-gray-800 text-center mb-2">{topThree[2]?.name}</div>
            <div className="text-sm text-gray-500 mb-3">{topThree[2]?.store}</div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{topThree[2]?.points}</div>
            <div className="text-xs text-gray-500 mb-4">points</div>
            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div>
                <div className="text-lg font-semibold text-gray-800">{topThree[2]?.tasksCompleted}</div>
                <div className="text-xs text-gray-500">Tasks</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-600">{topThree[2]?.completionRate}%</div>
                <div className="text-xs text-gray-500">Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Staff Rankings */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Staff Rankings</h2>
            <p className="text-sm text-gray-500">Individual performance rankings</p>
          </div>
          <div className="divide-y divide-gray-200">
            {remainingStaff.map((person) => {
              const badge = getRankBadge(person.rank);
              return (
                <div key={person.rank} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-8 text-center font-bold text-gray-600">#{person.rank}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{person.name}</div>
                      <div className="text-xs text-gray-500">{person.store}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-800">{person.tasksCompleted}</div>
                      <div className="text-xs text-gray-500">tasks</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{person.completionRate}%</div>
                      <div className="text-xs text-gray-500">rate</div>
                    </div>
                    <div className="text-right w-20">
                      <div className="text-lg font-bold text-pink-600">{person.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Store Rankings */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Store Rankings</h2>
            <p className="text-sm text-gray-500">Store-wide performance comparison</p>
          </div>
          <div className="divide-y divide-gray-200">
            {storeLeaderboard.map((store) => {
              const badge = getRankBadge(store.rank);
              const BadgeIcon = badge.icon;
              return (
                <div key={store.rank} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${badge.bg} rounded-full flex items-center justify-center`}>
                        {BadgeIcon ? (
                          <BadgeIcon className={`w-5 h-5 ${badge.color}`} />
                        ) : (
                          <span className="font-bold text-gray-600">#{store.rank}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{store.storeName}</div>
                        <div className="text-xs text-gray-500">{store.tasksCompleted} tasks completed</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Completion Rate</span>
                        <span className="text-xs font-medium text-green-600">{store.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${store.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Efficiency</span>
                        <span className="text-xs font-medium text-blue-600">{store.efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${store.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
