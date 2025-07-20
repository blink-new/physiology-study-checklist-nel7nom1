import React, { useState, useEffect } from 'react'
import { StickyNote, Save, X, Edit3 } from 'lucide-react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface StudyNotesProps {
  itemId: string
  itemText: string
  isOpen: boolean
  onClose: () => void
}

export function StudyNotes({ itemId, itemText, isOpen, onClose }: StudyNotesProps) {
  const [note, setNote] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [hasNote, setHasNote] = useState(false)

  useEffect(() => {
    const savedNote = localStorage.getItem(`physiology-note-${itemId}`)
    if (savedNote) {
      setNote(savedNote)
      setHasNote(true)
    }
  }, [itemId])

  const handleSave = () => {
    if (note.trim()) {
      localStorage.setItem(`physiology-note-${itemId}`, note.trim())
      setHasNote(true)
    } else {
      localStorage.removeItem(`physiology-note-${itemId}`)
      setHasNote(false)
    }
    setIsEditing(false)
  }

  const handleDelete = () => {
    localStorage.removeItem(`physiology-note-${itemId}`)
    setNote('')
    setHasNote(false)
    setIsEditing(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="flex-1 pr-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <StickyNote className="h-5 w-5 text-yellow-600" />
              <span>Заметки по теме</span>
              {hasNote && <Badge variant="secondary" className="text-xs">Есть заметка</Badge>}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
              {itemText}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!isEditing && !hasNote ? (
            <div className="text-center py-8">
              <StickyNote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Пока нет заметок по этой теме
              </p>
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Добавить заметку
              </Button>
            </div>
          ) : !isEditing ? (
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                  {note}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Редактировать
                </Button>
                <Button onClick={handleDelete} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  Удалить заметку
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Добавьте свои заметки, ключевые моменты, мнемоники или вопросы по этой теме..."
                className="min-h-[200px] resize-none"
                autoFocus
              />
              <div className="flex space-x-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить заметку
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Отмена
                </Button>
                {hasNote && (
                  <Button onClick={handleDelete} variant="outline" className="text-red-600 hover:text-red-700">
                    Удалить заметку
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

