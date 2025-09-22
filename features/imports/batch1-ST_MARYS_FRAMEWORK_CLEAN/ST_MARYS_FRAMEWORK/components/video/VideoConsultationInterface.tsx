'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Video, VideoOff, Mic, MicOff, Phone, Settings, Users, MessageSquare, Share } from 'lucide-react'

export function VideoConsultationInterface() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')
  const [showSettings, setShowSettings] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock connection process
  const handleConnect = async () => {
    setConnectionStatus('connecting')
    
    // Simulate connection delay
    setTimeout(() => {
      setConnectionStatus('connected')
      setIsConnected(true)
    }, 3000)
  }

  const handleDisconnect = () => {
    setConnectionStatus('disconnected')
    setIsConnected(false)
  }

  // Initialize user media (camera/microphone)
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing media devices:', error)
      }
    }

    if (isConnected) {
      initializeMedia()
    }
  }, [isConnected])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Video Consultation</h2>
            <p className="text-sm text-foreground-secondary">
              {connectionStatus === 'connecting' && 'Connecting to consultation room...'}
              {connectionStatus === 'connected' && 'Connected - Consultation in progress'}
              {connectionStatus === 'disconnected' && 'Ready to start consultation'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' :
              connectionStatus === 'connecting' ? 'bg-yellow-500' :
              'bg-gray-400'
            }`} />
            <span className="text-sm text-foreground-secondary capitalize">
              {connectionStatus}
            </span>
          </div>
        </div>
      </div>
      
      {/* Video Area */}
      <div className="relative bg-gray-900 aspect-video">
        
        {!isConnected ? (
          // Pre-connection state
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Ready for Consultation</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Click "Start Consultation" to connect with your dental professional. 
                Make sure your camera and microphone are working properly.
              </p>
              
              <button
                onClick={handleConnect}
                disabled={connectionStatus === 'connecting'}
                className="btn-primary"
              >
                {connectionStatus === 'connecting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  'Start Consultation'
                )}
              </button>
            </div>
          </div>
        ) : (
          // Connected state
          <>
            {/* Local video (user) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                You
              </div>
            </div>
            
            {/* Remote video (dentist) - placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Waiting for dentist to join...</p>
                <p className="text-sm text-gray-300 mt-2">
                  Your consultation will begin shortly
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Controls */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-center space-x-4">
          
          {/* Video Toggle */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-3 rounded-full transition-colors ${
              isVideoOn 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
            title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
          
          {/* Audio Toggle */}
          <button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`p-3 rounded-full transition-colors ${
              isAudioOn 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
            title={isAudioOn ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          
          {/* End Call */}
          {isConnected && (
            <button
              onClick={handleDisconnect}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="End consultation"
            >
              <Phone className="w-5 h-5 rotate-[135deg]" />
            </button>
          )}
          
          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {/* Chat */}
          <button
            className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
            title="Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          
          {/* Share Screen */}
          <button
            className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
            title="Share screen"
          >
            <Share className="w-5 h-5" />
          </button>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-3">Video Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Camera
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>Default Camera</option>
                  <option>External Camera</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Microphone
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>Default Microphone</option>
                  <option>External Microphone</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Quality
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>Auto</option>
                  <option>High (720p)</option>
                  <option>Medium (480p)</option>
                  <option>Low (360p)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Status Bar */}
      <div className="bg-gray-100 px-6 py-2 text-xs text-gray-600 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>🔒 Encrypted connection</span>
          <span>📍 UK servers</span>
          <span>⏱️ Session time: 00:00</span>
        </div>
        <div>
          <span>Quality: HD</span>
        </div>
      </div>
    </div>
  )
}

