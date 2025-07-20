import React, { useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle2, Circle, StickyNote } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { PhysiologySection } from '../data/physiologyData'
import { StudyNotes } from './StudyNotes'
import { useHasNote } from '../hooks/useStudyNotes'

interface StudySectionProps {
  section: PhysiologySection
  checkedItems: Record<string, boolean>
  onItemCheck: (itemId: string, checked: boolean) => void
}

export function StudySection({ section, checkedItems, onItemCheck }: StudySectionProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedNoteItem, setSelectedNoteItem] = useState<{ id: string; text: string } | null>(null)

  const completedItems = section.items.filter(item => checkedItems[item.id]).length
  const totalItems = section.items.length
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  const isCompleted = completedItems === totalItems

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {isOpen ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <span className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                  {section.title}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge 
                  variant={isCompleted ? "default" : "secondary"}
                  className={isCompleted ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {completedItems}/{totalItems}
                </Badge>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {progress}%
                </span>
              </div>
            </CardTitle>
            <div className="mt-2">
              <Progress 
                value={progress} 
                className="h-2"
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {section.items.map((item) => (
                <StudyItem
                  key={item.id}
                  item={item}
                  isChecked={checkedItems[item.id] || false}
                  onCheck={(checked) => onItemCheck(item.id, checked)}
                  onOpenNotes={() => setSelectedNoteItem({ id: item.id, text: item.text })}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
      
      {selectedNoteItem && (
        <StudyNotes
          itemId={selectedNoteItem.id}
          itemText={selectedNoteItem.text}
          isOpen={true}
          onClose={() => setSelectedNoteItem(null)}
        />
      )}
    </Card>
  )
}

// Individual study item component
function StudyItem({ 
  item, 
  isChecked, 
  onCheck, 
  onOpenNotes 
}: { 
  item: { id: string; text: string }
  isChecked: boolean
  onCheck: (checked: boolean) => void
  onOpenNotes: () => void
}) {
  const hasNote = useHasNote(item.id)

  return (
    <div
      className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
        isChecked
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
      }`}
    >
      <Checkbox
        id={item.id}
        checked={isChecked}
        onCheckedChange={(checked) => onCheck(checked as boolean)}
        className="mt-1"
      />
      <label
        htmlFor={item.id}
        className={`flex-1 text-sm leading-relaxed cursor-pointer transition-all duration-200 ${
          isChecked
            ? 'text-green-700 dark:text-green-300 line-through opacity-75'
            : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {item.text}
      </label>
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenNotes}
        className={`p-1 h-auto ${hasNote ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-gray-600'}`}
        title={hasNote ? 'Просмотр/Редактирование заметок' : 'Добавить заметки'}
      >
        <StickyNote className={`h-4 w-4 ${hasNote ? 'fill-current' : ''}`} />
      </Button>
    </div>
  )
}