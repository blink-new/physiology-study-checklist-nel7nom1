import React, { useState, useEffect } from 'react'
import { Target, Calendar, Trophy, Plus, Edit3, Trash2, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface StudyGoal {
  id: string
  title: string
  description: string
  targetDate: string
  targetTopics: number
  currentProgress: number
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: string
}

interface StudyGoalsProps {
  completedItems: number
  totalItems: number
}

export function StudyGoals({ completedItems, totalItems }: StudyGoalsProps) {
  const [goals, setGoals] = useState<StudyGoal[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetDate: '',
    targetTopics: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  })

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('physiology-study-goals')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('physiology-study-goals', JSON.stringify(goals))
  }, [goals])

  // Update goal progress based on completed items
  useEffect(() => {
    setGoals(prevGoals => 
      prevGoals.map(goal => ({
        ...goal,
        currentProgress: Math.min(completedItems, goal.targetTopics),
        completed: completedItems >= goal.targetTopics
      }))
    )
  }, [completedItems])

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      targetDate: '',
      targetTopics: '',
      priority: 'medium'
    })
    setEditingGoal(null)
    setIsDialogOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const goalData: StudyGoal = {
      id: editingGoal?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      targetDate: formData.targetDate,
      targetTopics: parseInt(formData.targetTopics),
      currentProgress: editingGoal?.currentProgress || Math.min(completedItems, parseInt(formData.targetTopics)),
      priority: formData.priority,
      completed: editingGoal?.completed || completedItems >= parseInt(formData.targetTopics),
      createdAt: editingGoal?.createdAt || new Date().toISOString()
    }

    if (editingGoal) {
      setGoals(prev => prev.map(goal => goal.id === editingGoal.id ? goalData : goal))
    } else {
      setGoals(prev => [...prev, goalData])
    }

    resetForm()
  }

  const handleEdit = (goal: StudyGoal) => {
    setEditingGoal(goal)
    setFormData({
      title: goal.title,
      description: goal.description,
      targetDate: goal.targetDate,
      targetTopics: goal.targetTopics.toString(),
      priority: goal.priority
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getDaysUntilTarget = (targetDate: string) => {
    const target = new Date(targetDate)
    const today = new Date()
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const activeGoals = goals.filter(goal => !goal.completed)
  const completedGoals = goals.filter(goal => goal.completed)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Цели изучения</h2>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingGoal(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Новая цель
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingGoal ? 'Редактировать цель' : 'Создать новую цель'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Название цели</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Например: Изучить сердечно-сосудистую систему"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Описание</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Подробное описание цели..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Целевая дата</label>
                <Input
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetDate: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Количество тем</label>
                <Input
                  type="number"
                  value={formData.targetTopics}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetTopics: e.target.value }))}
                  placeholder="Например: 20"
                  min="1"
                  max={totalItems}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Приоритет</label>
                <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setFormData(prev => ({ ...prev, priority: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingGoal ? 'Сохранить' : 'Создать цель'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Отмена
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Активные цели ({activeGoals.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGoals.map((goal) => {
              const progress = (goal.currentProgress / goal.targetTopics) * 100
              const daysLeft = getDaysUntilTarget(goal.targetDate)
              
              return (
                <Card key={goal.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {goal.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge className={getPriorityColor(goal.priority)}>
                          {goal.priority === 'high' ? 'Высокий' : 
                           goal.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(goal)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(goal.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс</span>
                        <span className="font-medium">
                          {goal.currentProgress}/{goal.targetTopics} тем
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round(progress)}% завершено
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {new Date(goal.targetDate).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      <span className={`font-medium ${
                        daysLeft < 0 ? 'text-red-600' : 
                        daysLeft <= 7 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {daysLeft < 0 ? `Просрочено на ${Math.abs(daysLeft)} дн.` :
                         daysLeft === 0 ? 'Сегодня!' :
                         `${daysLeft} дн. осталось`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <span>Достигнутые цели ({completedGoals.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedGoals.map((goal) => (
              <Card key={goal.id} className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>{goal.title}</span>
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {goal.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(goal.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      ✅ Цель достигнута!
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {goal.targetTopics} тем изучено
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {goals.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Пока нет целей
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Создайте свою первую цель изучения, чтобы отслеживать прогресс и оставаться мотивированным
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Создать первую цель
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}