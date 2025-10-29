import { useState } from 'react';
import { Trophy, TrendingUp, Medal, Award, ChevronRight, Calendar } from 'lucide-react';
import imgSarahJohnson from "figma:asset/95d7a9441ece29d0959b696f896ad7aa18c44dda.png";
import imgMikeChen from "figma:asset/8f8739691b761475875d05de592ee9166a999b67.png";
import imgEmilyRodriguez from "figma:asset/4afc0e5a544bfde91b9b95c54aae40d325105d17.png";

export default function Leaderboard() {
  const [selectedLevel, setSelectedLevel] = useState<'store' | 'regional' | 'global'>('store');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const leaderboardData = [
    {
      rank: 1,
      name: 'Emily Rodriguez',
      avatar: imgEmilyRodriguez,
      store: 'Store #02 - Hanoi',
      tasksCompleted: 312,
      completionRate: 96,
      totalHours: 184,
      efficiency: 98,
      points: 2450,
    },
    {
      rank: 2,
      name: 'David Park',
      avatar: null,
      store: 'Store #05 - Da Nang',
      tasksCompleted: 289,
      completionRate: 93,
      totalHours: 176,
      efficiency: 95,
      points: 2280,
    },
    {
      rank: 3,
      name: 'Sarah Johnson',
      avatar: imgSarahJohnson,
      store: 'Store #01 - Hanoi',
      tasksCompleted: 245,
      completionRate: 94,
      totalHours: 168,
      efficiency: 92,
      points: 2150,
    },
    {
      rank: 4,
      name: 'Lisa Wong',
      avatar: null,
      store: 'Store #04 - HCMC',
      tasksCompleted: 221,
      completionRate: 91,
      totalHours: 160,
      efficiency: 89,
      points: 1980,
    },
    {
      rank: 5,
      name: 'Mike Chen',
      avatar: imgMikeChen,
      store: 'Store #01 - Hanoi',
      tasksCompleted: 198,
      completionRate: 88,
      totalHours: 152,
      efficiency: 87,
      points: 1750,
    },
    {
      rank: 6,
      name: 'John Smith',
      avatar: null,
      store: 'Store #03 - HCMC',
      tasksCompleted: 167,
      completionRate: 82,
      totalHours: 144,
      efficiency: 84,
      points: 1520,
    },
  ];

  const storeLeaderboard = [
    { rank: 1, name: 'Store #03 - HCMC', tasksCompleted: 1240, completionRate: 93, efficiency: 95 },
    { rank: 2, name: 'Store #02 - Hanoi', tasksCompleted: 1185, completionRate: 91, efficiency: 92 },
    { rank: 3, name: 'Store #05 - Da Nang', tasksCompleted: 1142, completionRate: 89, efficiency: 90 },
    { rank: 4, name: 'Store #01 - Hanoi', tasksCompleted: 1098, completionRate: 87, efficiency: 88 },
    { rank: 5, name: 'Store #04 - HCMC', tasksCompleted: 1045, completionRate: 84, efficiency: 85 },
  ];

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
        {/* 2nd Place */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="absolute -top-3 -right-3 bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              {topThree[1]?.avatar ? (
                <img src={topThree[1].avatar} alt={topThree[1].name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-300" />
              ) : (
                <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center border-4 border-gray-300">
                  <span className="text-white text-xl font-bold">
                    {topThree[1]?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            <div className="font-semibold text-gray-800 text-center">{topThree[1]?.name}</div>
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

        {/* 1st Place */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <Trophy className="w-10 h-10 text-yellow-500 mb-2" />
            <div className="relative mb-4">
              <div className="absolute -top-3 -right-3 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              {topThree[0]?.avatar ? (
                <img src={topThree[0].avatar} alt={topThree[0].name} className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400" />
              ) : (
                <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-yellow-400">
                  <span className="text-white text-2xl font-bold">
                    {topThree[0]?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            <div className="font-bold text-gray-800 text-center text-lg">{topThree[0]?.name}</div>
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

        {/* 3rd Place */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="absolute -top-3 -right-3 bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              {topThree[2]?.avatar ? (
                <img src={topThree[2].avatar} alt={topThree[2].name} className="w-20 h-20 rounded-full object-cover border-4 border-orange-300" />
              ) : (
                <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center border-4 border-orange-300">
                  <span className="text-white text-xl font-bold">
                    {topThree[2]?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            <div className="font-semibold text-gray-800 text-center">{topThree[2]?.name}</div>
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
                    <div className="flex items-center gap-3 flex-1">
                      {person.avatar ? (
                        <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{person.name}</div>
                        <div className="text-xs text-gray-500">{person.store}</div>
                      </div>
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
                        <div className="font-medium text-gray-800">{store.name}</div>
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
