"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles, FileText, BookOpen, Settings, Briefcase, Loader2, ThumbsUp, ThumbsDown, Users } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  timeString: string
  sources?: string[]
}

// Knowledge base from the 4 internal documents
const knowledgeBase = {
  "userGuides": {
    title: "User Guides",
    content: `Step-by-step instructions for using our platform. Includes account setup, navigation, and troubleshooting basics.`,
    source: "Sara Learning User Guides"
  },
  "referenceGuides": {
    title: "Reference Guides",
    content: `Quick access to key features, terminology, and FAQs for our system.`,
    source: "Sara Learning Reference Guides"
  },
  "resources": {
    title: "Resources",
    content: `Downloadable templates, video tutorials, and help articles to support your learning.`,
    source: "Sara Learning Resources"
  }
}

// Quick response patterns for common queries
const quickResponses = {
  "user guide": knowledgeBase.userGuides,
  "user guides": knowledgeBase.userGuides,
  "reference guide": knowledgeBase.referenceGuides,
  "reference guides": knowledgeBase.referenceGuides,
  "resources": knowledgeBase.resources
}

export default function SARAAIKMS() {
  const getTimeString = (date: Date) =>
    date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    setMessages([{
      id: "1",
      content: "Hi, I'm APS AI-POWERED CONTENT ACCESS SYSTEM. I am your intelligent knowledge assistant. All information I provide is sourced directly from our official internal documentation. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      timeString: getTimeString(new Date()),
    }]);
  }, []);
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [feedback, setFeedback] = useState<{ [id: string]: 'up' | 'down' | null }>({})
  const [interactionCount, setInteractionCount] = useState(0)
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const findRelevantResponse = (userInput: string): { title: string; content: string; source: string } => {
    const input = userInput.toLowerCase()
    // Check for exact matches first
    for (const [key, response] of Object.entries(quickResponses)) {
      if (input.includes(key)) {
        return response
      }
    }
    // Check for keyword matches
    if (input.includes("user guide")) {
      return knowledgeBase.userGuides
    }
    if (input.includes("reference guide")) {
      return knowledgeBase.referenceGuides
    }
    if (input.includes("resource")) {
      return knowledgeBase.resources
    }
    // Default response for unclear queries
    return {
      title: "General Information",
      content: `Please select one of the available topics: user guides, reference guides, or resources.`,
      source: "Sara Learning Internal Documentation"
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return
    setInteractionCount((c) => c + 1)

    const now = new Date()
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: now,
      timeString: getTimeString(now),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate processing time
    setTimeout(() => {
      const response = findRelevantResponse(input.trim())
      const nowAI = new Date()
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `${response.title}\n\n${response.content}`,
        sender: "ai",
        timestamp: nowAI,
        timeString: getTimeString(nowAI),
        sources: [response.source]
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQueries = [
    { label: "User Guides", icon: FileText },
    { label: "Reference Guides", icon: FileText },
    { label: "Resources", icon: FileText },
  ]

  const followUpOptions = [
    { label: "Show templates", key: "template" },
    { label: "Learn more", key: "training" }
  ]

  const handleFollowUp = (key: string) => {
    if (key === "main") {
      setInput("")
      return
    }
    setInput(key === "template" ? "What templates do we have?" : "Tell me more about training")
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedback((prev) => ({ ...prev, [id]: type }))
    // Here you could also log feedback for analytics
  }

  // Helper to format bot responses with bold headers and bullets
  const formatBotContent = (content: string) => {
    // Simple formatting: bold first line, bullets for lines starting with •
    const lines = content.split('\n')
    return (
      <>
        {lines.map((line, idx) => {
          if (idx === 0 && line.trim() !== "") return <div key={idx}><b>{line}</b></div>
          if (line.trim().startsWith("•")) return <div key={idx} className="pl-4">• {line.trim().slice(1)}</div>
          if (line.trim().startsWith("1.")) return <div key={idx} className="font-semibold mt-2">{line}</div>
          return <div key={idx}>{line}</div>
        })}
      </>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">APS AI-POWERED CONTENT ACCESS SYSTEM</h1>
              <p className="text-sm text-slate-400">Knowledge Management System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">APS</p>
            <p className="text-xs text-emerald-400">AI-Powered Content Access Assistant</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 h-0">
        {/* Sidebar (left) */}
        <div className="w-80 min-w-[16rem] max-w-xs flex-shrink-0 flex flex-col space-y-4 p-4 bg-slate-900/80 border-r border-slate-800">
          <Card className="p-4 bg-slate-800/50 border-slate-700">
            <h3 className="font-semibold text-white mb-2">Knowledge Base</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Documents</span>
                <span className="text-emerald-400">4 Loaded</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Topics</span>
                <span className="text-emerald-400">6 Categories</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1"></div>
                  Active
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-slate-800/50 border-slate-700">
            <h3 className="font-semibold text-white mb-2">Available Topics</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center text-slate-300">
                <BookOpen className="w-3 h-3 mr-2 text-emerald-400" />
                Training & LMS
              </div>
              <div className="flex items-center text-slate-300">
                <FileText className="w-3 h-3 mr-2 text-emerald-400" />
                Proposal Development
              </div>
              <div className="flex items-center text-slate-300">
                <Settings className="w-3 h-3 mr-2 text-emerald-400" />
                Templates & Resources
              </div>
              <div className="flex items-center text-slate-300">
                <Briefcase className="w-3 h-3 mr-2 text-emerald-400" />
                Company Information
              </div>
            </div>
          </Card>
        </div>

        {/* Chat Area (right, robust minimal layout) */}
        <div className="flex-1 flex flex-col h-full bg-slate-900/80">
          {/* Chat messages area, scrollable */}
          <div className="flex-1 flex flex-col h-0 min-h-0">
            <div className="flex-1 overflow-y-auto p-0 bg-slate-800/30">
              <div className="space-y-4 pt-4 px-4">
                {/* Personalized greeting after 3+ interactions */}
                {interactionCount >= 3 && (
                  <div className="text-center text-emerald-300 text-sm mb-2">Thank you for exploring APS AI-POWERED CONTENT ACCESS SYSTEM! If you need more details, just pick a topic or ask for help.</div>
                )}
                {messages.map((message, idx) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback
                        className={
                          message.sender === "ai"
                            ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white"
                            : "bg-slate-600 text-white"
                        }
                      >
                        {message.sender === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[80%] ${message.sender === "user" ? "text-right" : ""}`}>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.sender === "ai"
                            ? "bg-slate-700/50 text-white border border-slate-600/50"
                            : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-line">
                          {message.sender === "ai" ? formatBotContent(message.content) : message.content}
                        </div>
                        {message.sources && (
                          <div className="mt-3 pt-2 border-t border-slate-600/50">
                            <p className="text-xs text-emerald-400">
                              <strong>Source:</strong> {message.sources.join(", ")}
                            </p>
                          </div>
                        )}
                        {/* Feedback buttons for bot replies */}
                        {message.sender === "ai" && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              size="icon"
                              variant={feedback[message.id] === 'up' ? "default" : "ghost"}
                              className="rounded-full"
                              onClick={() => handleFeedback(message.id, 'up')}
                              disabled={!!feedback[message.id]}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant={feedback[message.id] === 'down' ? "destructive" : "ghost"}
                              className="rounded-full"
                              onClick={() => handleFeedback(message.id, 'down')}
                              disabled={!!feedback[message.id]}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                            {feedback[message.id] && (
                              <span className="text-xs text-slate-400 ml-2">Thank you for your feedback!</span>
                            )}
                          </div>
                        )}
                        {/* Follow-up buttons after bot reply */}
                        {message.sender === "ai" && idx === messages.length - 1 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {suggestedQueries.map((q, i) => (
                              <Button
                                key={q.label}
                                variant="secondary"
                                className="rounded-full px-4 py-1 text-xs flex items-center"
                                onClick={() => { if (!isLoading) { setInput(q.label); setTimeout(() => handleSendMessage(), 100) } }}
                                disabled={isLoading}
                              >
                                <q.icon className="w-4 h-4 mr-1 text-emerald-400" />
                                {q.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      {hasMounted && (
                        <p className="text-xs text-slate-500 mt-1">
                          {message.timeString}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                        <span className="text-sm text-slate-300">SARA AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Always scroll to this element */}
                <div ref={bottomRef} />
              </div>
            </div>
          </div>
          {/* Sticky input bar at the bottom */}
          <div className="border-t border-slate-700 bg-slate-800/50">
            <div className="p-4">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask APS AI-POWERED CONTENT ACCESS SYSTEM about User Guides, Reference Guides, or Resources..."
                  className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Press Enter to send • Powered by APS AI-POWERED CONTENT ACCESS SYSTEM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
