import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Play, Pause, Square, RotateCcw, Coffee, Brain } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface StudyTimerProps {
  onStudyComplete: (minutes: number) => void
}

export function StudyTimer({ onStudyComplete }: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionType, setSessionType] = useState('25') // 25, 45, 60 minutes
  const [completedSessions, setCompletedSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const sessionDurations = useMemo(() => ({
    '25': 25 * 60,
    '45': 45 * 60,
    '60': 60 * 60
  }), [])

  const breakDuration = 5 * 60 // 5 minutes break

  const playNotificationSound = () => {
    // Simple notification sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (error) {
      console.log('Audio notification not available')
    }
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false)
      
      if (isBreak) {
        // Break finished, start new study session
        setIsBreak(false)
        setTimeLeft(sessionDurations[sessionType as keyof typeof sessionDurations])
        // Play notification sound (if available)
        playNotificationSound()
      } else {
        // Study session finished
        const sessionMinutes = parseInt(sessionType)
        onStudyComplete(sessionMinutes)
        setCompletedSessions(prev => prev + 1)
        
        // Start break
        setIsBreak(true)
        setTimeLeft(breakDuration)
        setIsRunning(true) // Auto-start break
        
        // Play notification sound (if available)
        playNotificationSound()
      }
    }
  }, [timeLeft, isBreak, sessionType, onStudyComplete, sessionDurations, breakDuration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStop = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(sessionDurations[sessionType as keyof typeof sessionDurations])
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(sessionDurations[sessionType as keyof typeof sessionDurations])
  }

  const handleSessionTypeChange = (value: string) => {
    setSessionType(value)
    if (!isRunning) {
      setTimeLeft(sessionDurations[value as keyof typeof sessionDurations])
      setIsBreak(false)
    }
  }

  const totalTime = isBreak ? breakDuration : sessionDurations[sessionType as keyof typeof sessionDurations]
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            {isBreak ? (
              <>
                <Coffee className="h-6 w-6 text-orange-500" />
                <span>Время перерыва</span>
              </>
            ) : (
              <>
                <Brain className="h-6 w-6 text-green-500" />
                <span>Учебная сессия</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className={`text-6xl font-mono font-bold ${
              isBreak ? 'text-orange-500' : 'text-green-600'
            }`}>
              {formatTime(timeLeft)}
            </div>
            <div className="mt-2">
              <Progress 
                value={progress} 
                className={`h-3 ${isBreak ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-600'}`}
              />
            </div>
          </div>

          {/* Session Type Selector */}
          {!isRunning && !isBreak && (
            <div className="flex items-center justify-center space-x-4">
              <label className="text-sm font-medium">Длительность сессии:</label>
              <Select value={sessionType} onValueChange={handleSessionTypeChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            {!isRunning ? (
              <Button onClick={handleStart} size="lg" className="px-8">
                <Play className="h-5 w-5 mr-2" />
                Старт
              </Button>
            ) : (
              <Button onClick={handlePause} size="lg" variant="outline" className="px-8">
                <Pause className="h-5 w-5 mr-2" />
                Пауза
              </Button>
            )}
            
            <Button onClick={handleStop} size="lg" variant="outline">
              <Square className="h-5 w-5 mr-2" />
              Стоп
            </Button>
            
            <Button onClick={handleReset} size="lg" variant="outline">
              <RotateCcw className="h-5 w-5 mr-2" />
              Сброс
            </Button>
          </div>

          {/* Status */}
          <div className="text-center space-y-2">
            <Badge 
              variant={isBreak ? "secondary" : "default"}
              className={`text-sm ${
                isBreak 
                  ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
              }`}
            >
              {isBreak ? 'Время перерыва - Отдыхайте!' : `${sessionType}-минутная учебная сессия`}
            </Badge>
            
            {completedSessions > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Завершено сессий сегодня: {completedSessions}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Study Tips */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">Советы по изучению</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600 dark:text-green-400">Во время учебных сессий:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Сосредоточьтесь на одной теме</li>
                <li>• Делайте заметки по ключевым понятиям</li>
                <li>• Используйте активное воспроизведение</li>
                <li>• Устраните отвлекающие факторы</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600 dark:text-orange-400">Во время перерывов:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Отойдите от рабочего места</li>
                <li>• Сделайте лёгкую растяжку</li>
                <li>• Попейте воды и перекусите</li>
                <li>• По возможности избегайте экранов</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}