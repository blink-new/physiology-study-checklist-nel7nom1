import React from 'react'
import { TrendingUp, Target, Clock, StickyNote, Calendar, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { useNotesCount } from '../hooks/useStudyNotes'

interface QuickStatsProps {
  totalItems: number
  completedItems: number
  overallProgress: number
  studyStreak: number
  totalStudyTime: number
}

export function QuickStats({
  totalItems,
  completedItems,
  overallProgress,
  studyStreak,
  totalStudyTime
}: QuickStatsProps) {
  const notesCount = useNotesCount()
  
  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getMotivationalMessage = () => {
    if (overallProgress >= 100) return "🎉 Physiology Master!"
    if (overallProgress >= 75) return "🔥 Almost there!"
    if (overallProgress >= 50) return "💪 Great progress!"
    if (overallProgress >= 25) return "🌟 Keep going!"
    return "🚀 Let's start studying!"
  }

  const getProgressColor = () => {
    if (overallProgress >= 75) return "text-green-600"
    if (overallProgress >= 50) return "text-blue-600"
    if (overallProgress >= 25) return "text-yellow-600"
    return "text-gray-600"
  }

  const estimatedTimeRemaining = Math.max(0, Math.round((totalItems - completedItems) * 2))
  const averageSessionTime = totalStudyTime > 0 && studyStreak > 0 ? Math.round(totalStudyTime / studyStreak) : 0

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            Study Overview
          </span>
          <Badge variant="secondary" className={`${getProgressColor()} font-bold`}>
            {overallProgress}%
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Motivational Message */}
        <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getMotivationalMessage()}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium">{completedItems}/{totalItems} topics</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="h-4 w-4 text-orange-600 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Streak</span>
            </div>
            <div className="text-lg font-bold text-orange-600">{studyStreak}</div>
            <div className="text-xs text-gray-500">days</div>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Study Time</span>
            </div>
            <div className="text-lg font-bold text-green-600">{formatStudyTime(totalStudyTime)}</div>
            <div className="text-xs text-gray-500">total</div>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <StickyNote className="h-4 w-4 text-yellow-600 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Notes</span>
            </div>
            <div className="text-lg font-bold text-yellow-600">{notesCount}</div>
            <div className="text-xs text-gray-500">topics</div>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Est. Left</span>
            </div>
            <div className="text-lg font-bold text-purple-600">{formatStudyTime(estimatedTimeRemaining)}</div>
            <div className="text-xs text-gray-500">to finish</div>
          </div>
        </div>

        {/* Additional Insights */}
        {averageSessionTime > 0 && (
          <div className="bg-white/40 dark:bg-slate-800/40 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">Avg. Session</span>
              </div>
              <span className="font-medium text-blue-600">{formatStudyTime(averageSessionTime)}</span>
            </div>
          </div>
        )}

        {/* Next Milestone */}
        {overallProgress < 100 && (
          <div className="bg-white/40 dark:bg-slate-800/40 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Target className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">Next Milestone</span>
              </div>
              <span className="font-medium text-indigo-600">
                {overallProgress < 25 ? '25%' : 
                 overallProgress < 50 ? '50%' : 
                 overallProgress < 75 ? '75%' : '100%'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}