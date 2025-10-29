import { useState } from 'react';
import { LeaderboardEntry, Staff, Shift, Task } from '../types';
import { Trophy, Medal, Award, ChevronLeft, ChevronRight, Calendar, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface LeaderboardProps {
  staff: Staff[];
  shifts: Shift[];
  tasks: Task[];
}

type LeaderboardScope = 'store' | 'regional' | 'global';

export function Leaderboard({ staff, shifts, tasks }: LeaderboardProps) {
  const [scope, setScope] = useState<LeaderboardScope>('store');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate all days in the current month
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      days.push(day);
    }
    return days;
  };

  const displayDays = generateMonthDays();

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get rewards based on scope
  const getRewards = () => {
    const baseRewards = {
      first: { amount: 100, bonus: 'Certificate of Excellence' },
      second: { amount: 50, bonus: '' },
      third: { amount: 25, bonus: '' },
    };

    const multipliers = {
      store: 1,
      regional: 3,
      global: 5,
    };

    const multiplier = multipliers[scope];

    return {
      first: {
        amount: baseRewards.first.amount * multiplier,
        bonus: baseRewards.first.bonus
      },
      second: {
        amount: baseRewards.second.amount * multiplier,
        bonus: baseRewards.second.bonus
      },
      third: {
        amount: baseRewards.third.amount * multiplier,
        bonus: baseRewards.third.bonus
      },
    };
  };

  const rewards = getRewards();

  // Calculate days remaining in current month
  const getDaysRemaining = () => {
    const now = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0);

    // Only show days remaining if viewing current month
    if (now.getMonth() === month && now.getFullYear() === year) {
      const daysLeft = lastDay.getDate() - now.getDate();
      return daysLeft;
    }
    return null;
  };

  const daysRemaining = getDaysRemaining();

  // Calculate leaderboard from actual data
  const calculateLeaderboard = (): LeaderboardEntry[] => {
    const dateStrings = displayDays.map(d => d.toISOString().split('T')[0]);

    // Filter staff based on scope
    let filteredStaff = staff;
    if (scope === 'store') {
      // Only staff from Hawaii Building, Ocean Park
      filteredStaff = staff.filter(s => s.building === 'Hawaii Building' && s.city === 'Ocean Park');
    } else if (scope === 'regional') {
      // All staff from Ocean Park region (all buildings)
      filteredStaff = staff.filter(s => s.region === 'Ocean Park');
    }
    // For 'global', use all staff (no filtering)

    const staffStats = filteredStaff.map(staffMember => {
      // Get all tasks for this staff member in the date range
      const staffTasks = tasks.filter(t =>
        t.staffId === staffMember.id && dateStrings.includes(t.date)
      );

      // Get all shifts for this staff member in the date range
      const staffShifts = shifts.filter(s =>
        s.staffId === staffMember.id && dateStrings.includes(s.date)
      );

      // Calculate metrics
      const tasksCompleted = staffTasks.filter(t => t.status === 'Done').length;
      const totalTasks = staffTasks.length;
      const completionRate = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;

      // Calculate total hours worked
      const toMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const totalMinutes = staffShifts.reduce((sum, shift) => {
        if (!shift.actualCheckIn || !shift.actualCheckOut) return sum;
        const checkInMin = toMinutes(shift.actualCheckIn);
        const checkOutMin = toMinutes(shift.actualCheckOut);
        return sum + (checkOutMin - checkInMin);
      }, 0);

      const totalHours = Math.round(totalMinutes / 60);

      // Calculate efficiency - combination of completion rate and productivity
      // Base efficiency on completion rate, with bonus for high task-per-hour ratio
      let efficiency = 0;
      if (totalHours > 0 && totalTasks > 0) {
        const tasksPerHour = tasksCompleted / totalHours;

        // Base efficiency from completion rate (0-100)
        const baseEfficiency = completionRate;

        // Productivity bonus: if completing more than 0.8 tasks/hour, add up to 10% bonus
        // Typical good performance: 1-1.5 tasks per hour
        const productivityBonus = Math.min(10, Math.round(tasksPerHour * 5));

        efficiency = Math.min(100, baseEfficiency + productivityBonus);
      }

      return {
        staffId: staffMember.id,
        staffName: staffMember.name,
        tasksCompleted,
        completionRate,
        totalHours,
        efficiency,
        rank: 0, // Will be assigned after sorting
      };
    });

    // Sort by completion rate (primary), then tasks completed (secondary)
    staffStats.sort((a, b) => {
      if (b.completionRate !== a.completionRate) {
        return b.completionRate - a.completionRate;
      }
      return b.tasksCompleted - a.tasksCompleted;
    });

    // Assign ranks
    staffStats.forEach((stat, index) => {
      stat.rank = index + 1;
    });

    return staffStats;
  };

  const leaderboard = calculateLeaderboard();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-600" />;
    return <span className="text-gray-500">#{rank}</span>;
  };

  // Get achievement badges for staff
  const getAchievementBadges = (entry: LeaderboardEntry) => {
    const badges = [];

    // Perfect completion badge
    if (entry.completionRate === 100) {
      badges.push(
        <div key="perfect" className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs" title="Perfect completion">
          <Star className="w-3 h-3" />
        </div>
      );
    }

    // High efficiency badge
    if (entry.efficiency >= 95) {
      badges.push(
        <div key="efficient" className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs" title="High efficiency">
          <Zap className="w-3 h-3" />
        </div>
      );
    }

    return badges;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Leaderboard</h2>
          <Tabs value={scope} onValueChange={(v) => setScope(v as LeaderboardScope)}>
            <TabsList>
              <TabsTrigger value="store">Store</TabsTrigger>
              <TabsTrigger value="regional">Regional</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="px-6 py-3 border-b bg-white">
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            <Calendar className="w-4 h-4 mr-2" />
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[150px] text-center">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-800">Monthly Rewards - {scope.charAt(0).toUpperCase() + scope.slice(1)}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 font-medium">🥇 1st:</span>
                <span className="font-semibold">${rewards.first.amount}</span>
                {rewards.first.bonus && <span className="text-gray-600">+ {rewards.first.bonus}</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">🥈 2nd:</span>
                <span className="font-semibold">${rewards.second.amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-600 font-medium">🥉 3rd:</span>
                <span className="font-semibold">${rewards.third.amount}</span>
              </div>
            </div>
          </div>
          {daysRemaining !== null && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">{daysRemaining}</span> {daysRemaining === 1 ? 'day' : 'days'} remaining
            </div>
          )}
        </div>
      </div>

      {/* Top 3 Highlight */}
      <div className="px-6 py-6 bg-gradient-to-br from-blue-50 to-purple-50 border-b">
        <div className="grid grid-cols-3 gap-4">
          {leaderboard.slice(0, 3).map((entry) => {
            const rewardAmount = entry.rank === 1 ? rewards.first.amount : entry.rank === 2 ? rewards.second.amount : rewards.third.amount;
            const rewardBonus = entry.rank === 1 ? rewards.first.bonus : '';
            const achievementMsg = entry.rank === 1 ? '🏆 Champion!' : entry.rank === 2 ? '🥈 Runner-up' : '🥉 Bronze';

            // Get staff member location info
            const staffMember = staff.find(s => s.id === entry.staffId);
            const locationDisplay = scope === 'store'
              ? ''
              : scope === 'regional'
              ? staffMember?.building || ''
              : `${staffMember?.building}, ${staffMember?.city}` || '';

            return (
              <div
                key={entry.staffId}
                className={`bg-white rounded-xl p-4 text-center border-2 ${
                  entry.rank === 1
                    ? 'border-yellow-400 shadow-lg'
                    : entry.rank === 2
                    ? 'border-gray-300'
                    : 'border-orange-300'
                }`}
              >
                <div className="flex justify-center mb-2">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="font-medium mb-1">{entry.staffName}</div>
                {locationDisplay && (
                  <div className="text-xs text-gray-500 mb-1">{locationDisplay}</div>
                )}
                <div className="text-xs text-gray-600 mb-2">{achievementMsg}</div>
                <div className="text-sm text-gray-500 mb-1">
                  {entry.tasksCompleted} tasks • {entry.completionRate}% rate
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-lg font-bold text-green-600">
                    ${rewardAmount}
                  </div>
                  {rewardBonus && (
                    <div className="text-xs text-gray-600 mt-1">+ {rewardBonus}</div>
                  )}
                  {daysRemaining !== null && (
                    <div className="text-xs text-orange-600 mt-2">
                      {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} to maintain!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Staff</TableHead>
              <TableHead className="text-right">Tasks</TableHead>
              <TableHead className="text-right">Completion Rate</TableHead>
              <TableHead className="text-right">Total Hours</TableHead>
              <TableHead className="text-right">Efficiency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((entry) => (
              <TableRow
                key={entry.staffId}
                className={entry.rank <= 3 ? 'bg-gray-50' : ''}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getRankIcon(entry.rank)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span>{entry.staffName}</span>
                      {getAchievementBadges(entry)}
                    </div>
                    {scope !== 'store' && (() => {
                      const staffMember = staff.find(s => s.id === entry.staffId);
                      const locationText = scope === 'regional'
                        ? staffMember?.building
                        : `${staffMember?.building}, ${staffMember?.city}`;
                      return locationText ? (
                        <div className="text-xs text-gray-500">{locationText}</div>
                      ) : null;
                    })()}
                  </div>
                </TableCell>
                <TableCell className="text-right">{entry.tasksCompleted}</TableCell>
                <TableCell className="text-right">
                  <span className={`${
                    entry.completionRate >= 95 ? 'text-green-600' :
                    entry.completionRate >= 85 ? 'text-blue-600' :
                    'text-orange-600'
                  }`}>
                    {entry.completionRate}%
                  </span>
                </TableCell>
                <TableCell className="text-right">{entry.totalHours}h</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${entry.efficiency}%` }}
                      />
                    </div>
                    <span className="text-sm">{entry.efficiency}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
