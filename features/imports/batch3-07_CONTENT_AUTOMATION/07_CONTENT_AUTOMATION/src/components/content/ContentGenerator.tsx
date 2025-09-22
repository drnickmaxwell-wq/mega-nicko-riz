'use client'

import React, { useState } from 'react'
import { Wand2, FileText, Mail, Image, Calendar, Settings } from 'lucide-react'
import { generateContent } from '@/lib/ai/content-generator'
import { DENTAL_TOPICS } from '@/lib/templates/dental-topics'
import { CONTENT_FORMATS } from '@/lib/templates/content-formats'

interface ContentGeneratorProps {
  contentType?: 'blog' | 'newsletter' | 'social' | 'email'
  topics?: string[]
  onGenerate?: (content: GeneratedContent) => void
  className?: string
}

interface GeneratedContent {
  id: string
  type: string
  title: string
  content: string
  excerpt: string
  keywords: string[]
  seoScore: number
  readabilityScore: number
  wordCount: number
  estimatedReadTime: number
  metadata: {
    author: string
    category: string
    tags: string[]
    publishDate?: string
  }
}

interface GenerationSettings {
  tone: 'professional' | 'friendly' | 'educational' | 'promotional'
  length: 'short' | 'medium' | 'long'
  seoFocus: boolean
  includeImages: boolean
  targetAudience: 'patients' | 'professionals' | 'general'
  keywords: string[]
}

export function ContentGenerator({
  contentType = 'blog',
  topics = [],
  onGenerate,
  className = ''
}: ContentGeneratorProps) {
  const [selectedTopic, setSelectedTopic] = useState('')
  const [customTopic, setCustomTopic] = useState('')
  const [settings, setSettings] = useState<GenerationSettings>({
    tone: 'professional',
    length: 'medium',
    seoFocus: true,
    includeImages: true,
    targetAudience: 'patients',
    keywords: []
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const availableTopics = topics.length > 0 ? topics : DENTAL_TOPICS
  const contentFormat = CONTENT_FORMATS[contentType]

  const handleGenerate = async () => {
    const topic = customTopic || selectedTopic
    if (!topic) return

    setIsGenerating(true)
    try {
      const content = await generateContent({
        topic,
        contentType,
        settings,
        format: contentFormat
      })

      setGeneratedContent(content)
      onGenerate?.(content)
    } catch (error) {
      console.error('Content generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeywordAdd = (keyword: string) => {
    if (keyword && !settings.keywords.includes(keyword)) {
      setSettings(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword]
      }))
    }
  }

  const handleKeywordRemove = (keyword: string) => {
    setSettings(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI Content Generator</h2>
            <p className="text-sm text-gray-600">
              Create {contentFormat.name.toLowerCase()} with AI assistance
            </p>
          </div>
        </div>

        {/* Content Type Selector */}
        <div className="flex gap-2 mt-4">
          {(['blog', 'newsletter', 'social', 'email'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTopic('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                contentType === type
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Form */}
      <div className="p-6 space-y-6">
        
        {/* Topic Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Topic
          </label>
          
          {/* Predefined Topics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {availableTopics.slice(0, 6).map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic)
                  setCustomTopic('')
                }}
                className={`p-3 text-left text-sm rounded-lg border transition-colors ${
                  selectedTopic === topic
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Custom Topic Input */}
          <input
            type="text"
            placeholder="Or enter a custom topic..."
            value={customTopic}
            onChange={(e) => {
              setCustomTopic(e.target.value)
              setSelectedTopic('')
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          />
        </div>

        {/* Basic Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tone
            </label>
            <select
              value={settings.tone}
              onChange={(e) => setSettings(prev => ({ ...prev, tone: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="educational">Educational</option>
              <option value="promotional">Promotional</option>
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length
            </label>
            <select
              value={settings.length}
              onChange={(e) => setSettings(prev => ({ ...prev, length: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50"
            >
              <option value="short">Short ({contentFormat.wordCounts.short} words)</option>
              <option value="medium">Medium ({contentFormat.wordCounts.medium} words)</option>
              <option value="long">Long ({contentFormat.wordCounts.long} words)</option>
            </select>
          </div>
        </div>

        {/* Advanced Settings Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Settings className="w-4 h-4" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
        </button>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            
            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <div className="flex gap-2">
                {(['patients', 'professionals', 'general'] as const).map((audience) => (
                  <button
                    key={audience}
                    onClick={() => setSettings(prev => ({ ...prev, targetAudience: audience }))}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      settings.targetAudience === audience
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {audience.charAt(0).toUpperCase() + audience.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Keywords
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {settings.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      onClick={() => handleKeywordRemove(keyword)}
                      className="hover:text-primary/70"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add keyword and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleKeywordAdd((e.target as HTMLInputElement).value)
                    ;(e.target as HTMLInputElement).value = ''
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.seoFocus}
                  onChange={(e) => setSettings(prev => ({ ...prev, seoFocus: e.target.checked }))}
                  className="rounded border-gray-300 text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-gray-700">Optimize for SEO</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.includeImages}
                  onChange={(e) => setSettings(prev => ({ ...prev, includeImages: e.target.checked }))}
                  className="rounded border-gray-300 text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-gray-700">Include image suggestions</span>
              </label>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!selectedTopic && !customTopic || isGenerating}
          className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Generate {contentFormat.name}
            </>
          )}
        </button>
      </div>

      {/* Generated Content Preview */}
      {generatedContent && (
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Generated Content</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>SEO Score: {generatedContent.seoScore}%</span>
              <span>Readability: {generatedContent.readabilityScore}%</span>
              <span>{generatedContent.wordCount} words</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-2">{generatedContent.title}</h4>
            <p className="text-gray-600 mb-3">{generatedContent.excerpt}</p>
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: generatedContent.content.substring(0, 500) + '...' }} />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Edit Content
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Send for Review
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

