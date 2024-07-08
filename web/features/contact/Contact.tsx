'use client'
import { useRef, FormEvent } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'

export default function Contact() {
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendGTMEvent({ event: 'message submit', value: inputRef.current?.value })
    inputRef.current!.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Message:</span>
        <textarea ref={inputRef} />
      </label>
      <button type="submit">submit</button>
    </form>
  )
}
