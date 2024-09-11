'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Define the layout for YouTube Live with chat toggle
export const LiveStreamPage: React.FC = () => {
  // State to track chat visibility
  const [isChatVisible, setChatVisible] = useState(false)

  // Function to toggle the chat visibility
  const toggleChat = () => setChatVisible(!isChatVisible)

  return (
    <div className="flex flex-col md:flex-row h-svh sticky">
      {/* Video Section */}
      <div className="relative">
        <iframe
          className={`w-full h-60 md:h-full transition-all duration-300 ${
            isChatVisible ? 'md:w-2/3' : 'md:w-full'
          }`}
          src="https://www.youtube.com/embed/jNf8Zpy_EHc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Chat Toggle Button */}
        <Button
          className="relative bottom-4 right-4 md:hidden"
          onClick={toggleChat}
        >
          {isChatVisible ? 'Hide Chat' : 'Show Chat'}
        </Button>
      </div>

      {/* Chat Section (hidden in mobile by default, shown in modal style) */}
      <div
        className={`flex-1 relative md:relative bottom-0 left-0 w-full md:w-1/3 bg-white shadow-lg h-60 md:h-full overflow-y-auto transition-all duration-300 ${
          isChatVisible ? 'block' : 'hidden md:block'
        }`}
      >
        <Card className="h-full">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Live Chat</h2>
              <Button className="md:hidden" onClick={toggleChat}>
                Close Chat
              </Button>
            </div>

            <div className="h-40 md:h-auto overflow-auto">
              {/* Placeholder for chat messages */}
              <p>Chat is now open!</p>
              {/* Add real-time chat messages here */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
