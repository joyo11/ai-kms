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
  "training": {
    title: "Training Materials & Process",
    content: `Our training process follows a comprehensive approach designed to maximize learning outcomes. We utilize the ADDIE methodology (Analysis, Design, Development, Implementation, Evaluation) to ensure systematic and effective training delivery.

Our training services include:
• Custom LMS development and implementation
• E-learning course creation and deployment
• Onboarding program design
• Technical and vocational training
• Capacity building workshops
• Digital skills development

Each training program is tailored to meet specific organizational needs and includes pre-assessment, interactive learning modules, practical exercises, and post-training evaluation.`,
    source: "Sara Learning Training Materials & Process Documentation"
  },
  "proposals": {
    title: "Proposal Development Process",
    content: `Our proposal development follows a systematic 12-stage process:

1. Tender Identification - Daily monitoring of donor portals
2. Relevance Review - Strategic assessment of opportunities
3. ToRs Review - Scope definition and resource planning
4. Proposal Drafting - Technical content development
5. Internal Review - Quality assurance and feedback
6. Proposal Revision - Incorporation of feedback
7. Budget Development - Cost estimation and alignment
8. Team Formation - Expert selection and confirmation
9. Final Review - Complete package verification
10. Submission - Portal upload and documentation
11. Tender Steering - Process monitoring and guidance
12. Monitoring & Evaluation - Results tracking and assessment

Each stage has clear ownership and deliverables to ensure successful outcomes.`,
    source: "Sara Learning Proposal Development Documentation"
  },
  "templates": {
    title: "Templates & Resources",
    content: `We maintain standardized templates for various proposal types:

• Technical proposal templates
• Financial proposal formats
• Team composition templates
• Work plan and timeline templates
• Risk matrix templates
• Monitoring and evaluation frameworks
• Annex and supporting document templates

Our training templates include:
• Course outline templates
• Learning objective frameworks
• Assessment and evaluation templates
• Participant feedback forms
• Training schedule templates
• Resource requirement checklists
• Post-training evaluation frameworks

These templates ensure consistency and quality across all programs.`,
    source: "Sara Learning Templates & Resources"
  },
  "company": {
    title: "Company Information",
    content: `SARA LEARNING GLOBAL is a US-based social enterprise with global operations across 7 divisions. Our mission is to transform the way we learn through innovative, technology-driven educational solutions.

We specialize in:
• End-to-end training solutions
• SCORM-compliant e-learning development
• Multi-language content creation
• Custom LMS implementation
• Capacity building and skills development
• Digital transformation consulting

Key past projects and achievements:
• UNEP Partnership (2021-present): Serving 40,000+ users, upgraded 38 courses to interactive format
• Pakistan BNIP Project (2023): Trained 600+ youth in digital skills, developed 4 comprehensive courses
• Skilling Symposiums: Hosted Pakistan and Nepal events reaching 1,500+ participants with international experts

Our approach combines cutting-edge technology with proven pedagogical methodologies to deliver impactful learning experiences.`,
    source: "Sara Learning Company Profile"
  }
}

// Quick response patterns for common queries
const quickResponses = {
  "training": knowledgeBase.training,
  "proposal": knowledgeBase.proposals,
  "template": knowledgeBase.templates,
  "company": knowledgeBase.company,
  "sara": knowledgeBase.company,
  "lms": {
    title: "LMS & E-Learning Services",
    content: `We provide comprehensive Learning Management System (LMS) services including:

• Custom LMS platform development
• SCORM-compliant course creation
• Multi-language content support
• Interactive learning modules
• Progress tracking and analytics
• Mobile-responsive design
• Integration with existing systems

Our LMS solutions are designed to be scalable, user-friendly, and accessible across all devices. We support various content formats including videos, interactive simulations, assessments, and collaborative learning tools.`,
    source: "Sara Learning Training Materials & Process Documentation"
  },
  "addie": {
    title: "ADDIE Methodology",
    content: `We use the ADDIE methodology (Analysis, Design, Development, Implementation, Evaluation) for systematic training development:

• Analysis: Identify learning needs, target audience, and objectives
• Design: Create learning objectives, content structure, and assessment strategies
• Development: Build learning materials, activities, and assessments
• Implementation: Deliver training through appropriate channels
• Evaluation: Assess effectiveness and gather feedback for improvement

This systematic approach ensures our training programs are effective, engaging, and aligned with organizational goals.`,
    source: "Sara Learning Training Materials & Process Documentation"
  }
}

export default function SARAAIKMS() {
  const getTimeString = (date: Date) =>
    date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi, I'm SARA AI-KMS. I am your intelligent knowledge assistant. All information I provide is sourced directly from our official internal documentation. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      timeString: getTimeString(new Date()),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [feedback, setFeedback] = useState<{ [id: string]: 'up' | 'down' | null }>({})
  const [interactionCount, setInteractionCount] = useState(0)

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
    if (input.includes("train") || input.includes("learning") || input.includes("course") || input.includes("education")) {
      return knowledgeBase.training
    }
    if (input.includes("proposal") || input.includes("tender") || input.includes("bid") || input.includes("submission")) {
      return knowledgeBase.proposals
    }
    if (input.includes("template") || input.includes("format") || input.includes("resource")) {
      return knowledgeBase.templates
    }
    if (input.includes("company") || input.includes("about") || input.includes("who") || input.includes("what")) {
      return knowledgeBase.company
    }
    if (input.includes("lms") || input.includes("platform") || input.includes("system")) {
      return quickResponses.lms
    }
    if (input.includes("addie") || input.includes("methodology") || input.includes("process")) {
      return quickResponses.addie
    }

    // Default response for unclear queries
    return {
      title: "General Information",
      content: `I understand you're asking about "${userInput}". Let me provide you with an overview of our key services and capabilities based on our internal documentation.

${knowledgeBase.training.content.substring(0, 200)}...

${knowledgeBase.proposals.content.substring(0, 200)}...

For more specific information, please try asking about:
• Training processes and methodologies
• Proposal development and tendering
• Templates and resources
• Company information and past projects
• LMS and e-learning services`,
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
    { label: "Tell me about our training process", icon: BookOpen },
    { label: "How do we develop proposals?", icon: FileText },
    { label: "What templates do we have?", icon: Settings },
    { label: "Tell me about SARA Learning", icon: Briefcase },
    { label: "What is the ADDIE methodology?", icon: Sparkles },
    { label: "How do we handle LMS development?", icon: BookOpen },
    { label: "Who is in the team, what are their responsibilities, and what is the timeline?", icon: Users },
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
              <h1 className="text-xl font-bold text-white">SARA AI-KMS</h1>
              <p className="text-sm text-slate-400">Knowledge Management System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">SARA Learning</p>
            <p className="text-xs text-emerald-400">AI-Powered Knowledge Assistant</p>
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
                  <div className="text-center text-emerald-300 text-sm mb-2">Thank you for exploring SARA AI-KMS! If you need more details, just pick a topic or ask for help.</div>
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
                      <p className="text-xs text-slate-500 mt-1">
                        {message.timeString}
                      </p>
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
                  placeholder="Ask SARA AI about training, proposals, templates, company info..."
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
              <p className="text-xs text-slate-500 mt-2">Press Enter to send • Powered by SARA Learning AI-KMS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
