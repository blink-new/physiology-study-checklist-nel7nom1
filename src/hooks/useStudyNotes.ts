import { useState, useEffect } from 'react'

// Hook to check if an item has notes
export function useHasNote(itemId: string) {
  const [hasNote, setHasNote] = useState(false)

  useEffect(() => {
    const savedNote = localStorage.getItem(`physiology-note-${itemId}`)
    setHasNote(!!savedNote)
  }, [itemId])

  return hasNote
}

// Hook to get all notes count
export function useNotesCount() {
  const [notesCount, setNotesCount] = useState(0)

  useEffect(() => {
    const updateNotesCount = () => {
      let count = 0
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('physiology-note-')) {
          count++
        }
      }
      setNotesCount(count)
    }

    updateNotesCount()
    
    // Listen for storage changes
    window.addEventListener('storage', updateNotesCount)
    
    return () => {
      window.removeEventListener('storage', updateNotesCount)
    }
  }, [])

  return notesCount
}