import React, { useState, useEffect, useCallback } from 'react'
import { Search, Timer, Trophy, Moon, Sun, Download, BookOpen, HelpCircle, Keyboard } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Progress } from './components/ui/progress'
import { Badge } from './components/ui/badge'
import { Switch } from './components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip'
import { StudySection } from './components/StudySection'
import { ProgressDashboard } from './components/ProgressDashboard'
import { StudyTimer } from './components/StudyTimer'
import { QuickStats } from './components/QuickStats'
import { physiologyData } from './data/physiologyData'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [studyStreak, setStudyStreak] = useState(0)
  const [totalStudyTime, setTotalStudyTime] = useState(0)

  // Load saved data from localStorage
  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('physiology-checklist')
    const savedDarkMode = localStorage.getItem('physiology-dark-mode')
    const savedStreak = localStorage.getItem('physiology-streak')
    const savedStudyTime = localStorage.getItem('physiology-study-time')

    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems))
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
    if (savedStreak) {
      setStudyStreak(parseInt(savedStreak))
    }
    if (savedStudyTime) {
      setTotalStudyTime(parseInt(savedStudyTime))
    }
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('physiology-checklist', JSON.stringify(checkedItems))
  }, [checkedItems])

  useEffect(() => {
    localStorage.setItem('physiology-dark-mode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('physiology-streak', studyStreak.toString())
  }, [studyStreak])

  useEffect(() => {
    localStorage.setItem('physiology-study-time', totalStudyTime.toString())
  }, [totalStudyTime])

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: checked
    }))
  }

  const getTotalItems = useCallback(() => {
    return physiologyData.reduce((total, section) => total + section.items.length, 0)
  }, [])

  const getCompletedItems = useCallback(() => {
    return Object.values(checkedItems).filter(Boolean).length
  }, [checkedItems])

  const getOverallProgress = useCallback(() => {
    const total = getTotalItems()
    const completed = getCompletedItems()
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }, [getTotalItems, getCompletedItems])

  const filteredSections = physiologyData.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0)

  const exportProgress = useCallback(() => {
    const progress = {
      totalItems: getTotalItems(),
      completedItems: getCompletedItems(),
      progress: getOverallProgress(),
      studyStreak,
      totalStudyTime,
      exportDate: new Date().toISOString(),
      sections: physiologyData.map(section => ({
        title: section.title,
        completed: section.items.filter(item => checkedItems[item.id]).length,
        total: section.items.length,
        completionRate: Math.round((section.items.filter(item => checkedItems[item.id]).length / section.items.length) * 100)
      }))
    }

    const dataStr = JSON.stringify(progress, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `physiology-study-progress-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [getTotalItems, getCompletedItems, getOverallProgress, studyStreak, totalStudyTime, checkedItems])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        const searchInput = document.querySelector('input[placeholder="Search topics..."]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }
      
      // Ctrl/Cmd + E to export progress
      if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        event.preventDefault()
        exportProgress()
      }
      
      // Ctrl/Cmd + D to toggle dark mode
      if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault()
        setDarkMode(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [exportProgress])

  return (
    <TooltipProvider>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className="bg-blue-700 dark:bg-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Physiology Study Checklist</h1>
                <p className="text-blue-100 dark:text-slate-300">Comprehensive exam preparation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Moon className="h-4 w-4" />
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Keyboard className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <div className="space-y-2 text-sm">
                    <div className="font-semibold">Keyboard Shortcuts:</div>
                    <div>⌘/Ctrl + K - Focus search</div>
                    <div>⌘/Ctrl + E - Export progress</div>
                    <div>⌘/Ctrl + D - Toggle dark mode</div>
                  </div>
                </TooltipContent>
              </Tooltip>
              
              <Button
                variant="outline"
                size="sm"
                onClick={exportProgress}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="checklist" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="checklist">Study Checklist</TabsTrigger>
            <TabsTrigger value="timer">Study Timer</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ProgressDashboard
              totalItems={getTotalItems()}
              completedItems={getCompletedItems()}
              overallProgress={getOverallProgress()}
              studyStreak={studyStreak}
              totalStudyTime={totalStudyTime}
              sections={physiologyData}
              checkedItems={checkedItems}
            />
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            {/* Quick Stats and Search */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <QuickStats
                  totalItems={getTotalItems()}
                  completedItems={getCompletedItems()}
                  overallProgress={getOverallProgress()}
                  studyStreak={studyStreak}
                  totalStudyTime={totalStudyTime}
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                {/* Search and Stats Bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="text-sm">
                      <Trophy className="h-4 w-4 mr-1" />
                      {studyStreak} day streak
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {getCompletedItems()}/{getTotalItems()} completed
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Overall Progress
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {getOverallProgress()}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={getOverallProgress()} className="h-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {getCompletedItems()} of {getTotalItems()} topics completed
                </p>
              </CardContent>
            </Card>

            {/* Study Sections */}
            <div className="space-y-4">
              {filteredSections.map((section) => (
                <StudySection
                  key={section.id}
                  section={section}
                  checkedItems={checkedItems}
                  onItemCheck={handleItemCheck}
                />
              ))}
            </div>

            {filteredSections.length === 0 && searchTerm && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No topics found matching "{searchTerm}"
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="timer">
            <StudyTimer
              onStudyComplete={(minutes) => {
                setTotalStudyTime(prev => prev + minutes)
                setStudyStreak(prev => prev + 1)
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </TooltipProvider>
  )
}

export default App