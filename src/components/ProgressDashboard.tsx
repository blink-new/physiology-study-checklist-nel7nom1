import React from 'react'
import { Trophy, Clock, Target, BookOpen, TrendingUp, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { PhysiologySection } from '../data/physiologyData'

interface ProgressDashboardProps {
  totalItems: number
  completedItems: number
  overallProgress: number
  studyStreak: number
  totalStudyTime: number
  sections: PhysiologySection[]
  checkedItems: Record<string, boolean>
}

export function ProgressDashboard({
  totalItems,
  completedItems,
  overallProgress,
  studyStreak,
  totalStudyTime,
  sections,
  checkedItems
}: ProgressDashboardProps) {
  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}ч ${mins}м`
    }
    return `${mins}м`
  }

  const getAchievements = () => {
    const achievements = []
    
    if (completedItems >= 10) achievements.push({ name: 'Первые шаги', icon: '🎯', description: 'Изучено 10 тем' })
    if (completedItems >= 25) achievements.push({ name: 'Четверть пути', icon: '🏆', description: 'Изучено 25 тем' })
    if (completedItems >= 50) achievements.push({ name: 'Половина пути', icon: '🌟', description: 'Изучено 50 тем' })
    if (overallProgress >= 100) achievements.push({ name: 'Мастер физиологии', icon: '👑', description: 'Изучены все темы' })
    if (studyStreak >= 7) achievements.push({ name: 'Недельный воин', icon: '🔥', description: '7 дней подряд' })
    if (studyStreak >= 30) achievements.push({ name: 'Месячный мастер', icon: '💎', description: '30 дней подряд' })
    if (totalStudyTime >= 60) achievements.push({ name: 'Энтузиаст', icon: '📚', description: '1+ час изучения' })
    if (totalStudyTime >= 300) achievements.push({ name: 'Преданный ученик', icon: '🎓', description: '5+ часов изучения' })
    
    return achievements
  }

  const getSectionProgress = () => {
    return sections.map(section => {
      const completed = section.items.filter(item => checkedItems[item.id]).length
      const total = section.items.length
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0
      
      return {
        title: section.title,
        completed,
        total,
        progress
      }
    }).sort((a, b) => b.progress - a.progress)
  }

  const achievements = getAchievements()
  const sectionProgress = getSectionProgress()
  const estimatedTimeRemaining = Math.max(0, Math.round((totalItems - completedItems) * 2)) // 2 minutes per topic estimate

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общий прогресс</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallProgress}%</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {completedItems} из {totalItems} тем
            </p>
            <Progress value={overallProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Серия изучения</CardTitle>
            <Trophy className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{studyStreak}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {studyStreak === 1 ? 'день' : studyStreak < 5 ? 'дня' : 'дней'} подряд
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Время изучения</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatStudyTime(totalStudyTime)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              общее время
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Осталось времени</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatStudyTime(estimatedTimeRemaining)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              до завершения всех тем
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span>Достижения</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <div className="font-semibold text-yellow-800 dark:text-yellow-200">
                      {achievement.name}
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400">
                      {achievement.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <span>Прогресс по разделам</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectionProgress.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {section.title}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={section.progress === 100 ? "default" : "secondary"}
                      className={section.progress === 100 ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {section.completed}/{section.total}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {section.progress}%
                    </span>
                  </div>
                </div>
                <Progress value={section.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}