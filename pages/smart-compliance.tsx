// pages/smart-compliance.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { supabase } from '../lib/supabase'
import { AgentType, Agent } from '../types'
import { MessageSquare, Send, Bot, User } from 'lucide-react'

const AGENTS: Agent[] = [
  {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    description: 'Identify and evaluate workplace risks and hazards',
    expertise: ['Risk Management', 'WHS Compliance', 'Safety Audits'],
    avatar: '🛡️',
    status: 'online'
  },
  {
    id: 'incident-management',
    name: 'Incident Management',
    description: 'Handle workplace incidents and emergency procedures',
    expertise: ['Incident Response', 'Emergency Planning', 'Investigation'],
    avatar: '🚨',
    status: 'online'
  },
  {
    id: 'hr-compliance',
    name: 'HR Compliance',
    description: 'Navigate employment law and HR policies',
    expertise: ['Employment Law', 'HR Policies', 'Fair Work Act'],
    avatar: '👥',
    status: 'online'
  },
  {
    id: 'ndis-auditor',
    name: 'NDIS Auditor',
    description: 'NDIS practice standards and quality auditing',
    expertise: ['NDIS Standards', 'Quality Audits', 'Compliance Reviews'],
    avatar: '♿',
    status: 'online'
  },
  {
    id: 'whs-officer',
    name: 'WHS Officer',
    description: 'Workplace health and safety compliance',
    expertise: ['WHS Legislation', 'Safety Training', 'Risk Controls'],
    avatar: '⚠️',
    status: 'online'
  },
  {
    id: 'privacy-officer',
    name: 'Privacy Officer',
    description: 'Data protection and privacy compliance',
    expertise: ['Privacy Act', 'Data Security', 'GDPR Compliance'],
    avatar: '🔒',
    status: 'online'
  },
  {
    id: 'quality-assurance',
    name: 'Quality Assurance',
    description: 'Quality management and continuous improvement',
    expertise: ['ISO Standards', 'Quality Systems', 'Process Improvement'],
    avatar: '✅',
    status: 'online'
  },
  {
    id: 'finance-compliance',
    name: 'Finance Compliance',
    description: 'Financial regulations and reporting requirements',
    expertise: ['Financial Reporting', 'Tax Compliance', 'Audit Requirements'],
    avatar: '💰',
    status: 'online'
  }
]

interface ChatMessage {
  id: string
  type: 'user' | 'agent'
  content: string
  timestamp: Date
  agentName?: string
}

export default function SmartCompliance() {
  const [user, setUser] = useState(null)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)
      
      // Load user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('auth_user_id', session.user.id)
        .single()
      
      setUserProfile(profile)
    }
    getUser()
  }, [router])

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent)
    setMessages([
      {
        id: '1',
        type: 'agent',
        content: `Hello! I'm your ${agent.name} specialist. I can help you with ${agent.expertise.join(', ').toLowerCase()}. What would you like to know?`,
        timestamp: new Date(),
        agentName: agent.name
      }
    ])
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedAgent || loading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)

    try {
      const response = await fetch('/api/agent/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentType: selectedAgent.name,
          userQuestion: inputMessage.trim(),
          businessName: userProfile?.business_name,
          industry: userProfile?.industry,
          userId: userProfile?.id
        }),
      })

      const data = await response.json()

      if (data.success) {
        const agentMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'agent',
          content: data.responseText,
          timestamp: new Date(),
          agentName: selectedAgent.name
        }
        setMessages(prev => [...prev, agentMessage])
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        agentName: selectedAgent.name
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Smart Compliance - Fairform</title>
        <meta name="description" content="Chat with AI compliance experts" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-gray-900">Smart Compliance</h1>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-primary-600 hover:text-primary-700"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8 h-[calc(100vh-12rem)]">
            {/* Agent Selection */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose an Expert</h2>
              <div className="space-y-3 max-h-full overflow-y-auto">
                {AGENTS.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => handleAgentSelect(agent)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedAgent?.id === agent.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{agent.avatar}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{agent.name}</h3>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                          <span className="text-xs text-gray-500">{agent.status}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.expertise.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              {selectedAgent ? (
                <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <span className="text-2xl mr-3">{selectedAgent.avatar}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedAgent.name}</h3>
                      <p className="text-sm text-gray-600">{selectedAgent.description}</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            {message.type === 'user' ? (
                              <User className="h-4 w-4 mr-1" />
                            ) : (
                              <Bot className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-xs opacity-75">
                              {message.type === 'user' ? 'You' : message.agentName}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                          <div className="flex items-center">
                            <Bot className="h-4 w-4 mr-1" />
                            <span className="text-xs opacity-75">{selectedAgent.name}</span>
                          </div>
                          <div className="flex space-x-1 mt-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Ask ${selectedAgent.name} a question...`}
                        className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        rows={2}
                        disabled={loading}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || loading}
                        className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select an Expert to Start Chatting
                    </h3>
                    <p className="text-gray-600">
                      Choose a compliance expert from the left panel to begin your conversation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}