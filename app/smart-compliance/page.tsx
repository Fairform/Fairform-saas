'use client'

import { useState } from 'react'
import { 
  ArrowRight, 
  Brain,
  Search,
  FileText,
  Shield,
  Heart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Zap,
  Download,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Info,
  Lightbulb,
  Target,
  Sparkles
} from 'lucide-react'

export default function SmartCompliancePage() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
  const [agentStatus, setAgentStatus] = useState<{[key: string]: 'idle' | 'running' | 'complete'}>({})

  const smartAgents = [
    {
      id: 'gap-analysis',
      name: 'Gap Analysis Agent',
      description: 'Identifies compliance gaps in your current policies and procedures',
      icon: <Search className="w-8 h-8" />,
      gradient: 'from-blue-400 to-blue-600',
      category: 'Analysis',
      estimatedTime: '5-10 minutes',
      lastRun: '2 days ago',
      results: {
        gaps: 7,
        priority: 'High',
        completed: true
      },
      capabilities: [
        'Document structure analysis',
        'Regulatory requirement mapping',
        'Risk priority scoring',
        'Actionable recommendations'
      ],
      outputs: [
        'Gap analysis report',
        'Priority matrix',
        'Recommendation roadmap'
      ]
    },
    {
      id: 'policy-generator',
      name: 'Policy Generator Agent',
      description: 'Creates comprehensive policy documents tailored to your industry',
      icon: <FileText className="w-8 h-8" />,
      gradient: 'from-green-400 to-green-600',
      category: 'Generation',
      estimatedTime: '2-5 minutes',
      lastRun: 'Never',
      results: null,
      capabilities: [
        'Industry-specific content generation',
        'Legal compliance checking',
        'Brand integration',
        'Multi-format output'
      ],
      outputs: [
        'Policy documents (PDF, Word)',
        'Implementation guidelines',
        'Staff training materials'
      ]
    },
    {
      id: 'audit-reviewer',
      name: 'Audit Reviewer Agent',
      description: 'Reviews and optimizes existing compliance documents for audit readiness',
      icon: <Shield className="w-8 h-8" />,
      gradient: 'from-purple-400 to-purple-600',
      category: 'Review',
      estimatedTime: '3-7 minutes',
      lastRun: '1 week ago',
      results: {
        score: 87,
        issues: 3,
        completed: true
      },
      capabilities: [
        'Document quality assessment',
        'Regulatory compliance verification',
        'Improvement suggestions',
        'Version comparison'
      ],
      outputs: [
        'Audit readiness score',
        'Issue identification report',
        'Optimization recommendations'
      ]
    },
    {
      id: 'ndis-specialist',
      name: 'NDIS Specialist Agent',
      description: 'Specialized compliance agent for NDIS service providers',
      icon: <Heart className="w-8 h-8" />,
      gradient: 'from-orange-400 to-orange-600',
      category: 'Industry',
      estimatedTime: '4-8 minutes',
      lastRun: '3 days ago',
      results: {
        compliance: 95,
        updates: 2,
        completed: true
      },
      capabilities: [
        'NDIS Practice Standards alignment',
        'Quality & Safeguards compliance',
        'Participant-centered approach',
        'Commission reporting readiness'
      ],
      outputs: [
        'NDIS compliance report',
        'Practice standards checklist',
        'Commission-ready documentation'
      ]
    },
    {
      id: 'whs-expert',
      name: 'WHS Expert Agent',
      description: 'Workplace health and safety documentation and compliance checking',
      icon: <Shield className="w-8 h-8" />,
      gradient: 'from-red-400 to-red-600',
      category: 'Safety',
      estimatedTime: '4-6 minutes',
      lastRun: '5 days ago',
      results: {
        risks: 4,
        controls: 12,
        completed: true
      },
      capabilities: [
        'Hazard identification',
        'Risk assessment creation',
        'Control measure design',
        'Safe Work Australia compliance'
      ],
      outputs: [
        'WHS management system',
        'Risk assessment templates',
        'Safety procedure documents'
      ]
    },
    {
      id: 'training-designer',
      name: 'Training Designer Agent',
      description: 'Creates staff training and induction materials for compliance',
      icon: <Brain className="w-8 h-8" />,
      gradient: 'from-indigo-400 to-indigo-600',
      category: 'Training',
      estimatedTime: '6-12 minutes',
      lastRun: '1 week ago',
      results: {
        modules: 8,
        completion: 78,
        completed: true
      },
      capabilities: [
        'Interactive training content',
        'Competency assessments',
        'Progress tracking',
        'Compliance certification'
      ],
      outputs: [
        'Training modules',
        'Assessment quizzes',
        'Certification tracking'
      ]
    }
  ]

  const runAgent = (agentId: string) => {
    setActiveAgent(agentId)
const runAgent = async (agentId: string) => {
  setActiveAgent(agentId);
  setAgentStatus(prev => ({ ...prev, [agentId]: 'running' }));
  if (agentId === 'policy-generator') {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'dummy',
          documentType: 'policy',
          industry: 'general',
          businessInfo: {
            name: 'Acme Corp',
            address: '123 Example St',
            industry: 'General',
          },
          format: 'docx',
        }),
      });
      const data = await response.json();
      console.log('Generated document', data);
    } catch (error) {
      console.error('Error generating document', error);
    }
  } else {
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  setAgentStatus(prev => ({ ...prev, [agentId]: 'complete' }));
  setActiveAgent(null);
}; }

  const getStatusIcon = (agentId: string) => {
    const status = agentStatus[agentId] || 'idle'
    switch (status) {
      case 'running':
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Play className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = (agentId: string) => {
    const status = agentStatus[agentId] || 'idle'
    switch (status) {
      case 'running':
        return 'Running...'
      case 'complete':
        return 'Complete'
      default:
        return 'Ready'
    }
  }

  const recentActivity = [
    {
      agent: 'Gap Analysis Agent',
      action: 'Completed analysis',
      time: '2 hours ago',
      status: 'success',
      details: 'Found 3 high-priority gaps'
    },
    {
      agent: 'NDIS Specialist Agent',
      action: 'Generated compliance report',
      time: '1 day ago',
      status: 'success',
      details: '95% compliance score achieved'
    },
    {
      agent: 'WHS Expert Agent',
      action: 'Updated risk assessments',
      time: '2 days ago',
      status: 'warning',
      details: '2 new risks identified'
    },
    {
      agent: 'Policy Generator Agent',
      action: 'Created new policy pack',
      time: '3 days ago',
      status: 'success',
      details: 'NDIS service agreements generated'
    }
  ]

  const complianceScore = 87
  const totalAgents = smartAgents.length
  const activeAgentsCount = Object.values(agentStatus).filter(status => status === 'running').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="section-container !py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-text-primary">Smart Compliance</h1>
              </div>
              <p className="text-text-secondary">AI-powered compliance agents working for your business</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">{complianceScore}%</div>
              <div className="text-sm text-text-secondary">Compliance Score</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-container">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-text-primary">{totalAgents}</div>
                    <div className="text-sm text-text-secondary">Available Agents</div>
                  </div>
                  <Brain className="w-8 h-8 text-primary-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-text-primary">{activeAgentsCount}</div>
                    <div className="text-sm text-text-secondary">Currently Running</div>
                  </div>
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-text-primary">24</div>
                    <div className="text-sm text-text-secondary">Tasks Completed</div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>

            {/* Agents Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-primary">Your AI Agents</h2>
                <button className="flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200">
                  <Settings className="w-4 h-4" />
                  Manage Agents
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {smartAgents.map((agent) => (
                  <div key={agent.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                    {/* Agent Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${agent.gradient} rounded-xl flex items-center justify-center text-white`}>
                            {agent.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-text-primary">{agent.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                {agent.category}
                              </span>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(agent.id)}
                                <span className="text-xs text-text-secondary">
                                  {getStatusText(agent.id)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-text-secondary text-sm">{agent.description}</p>
                    </div>

                    {/* Agent Details */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {/* Capabilities */}
                        <div>
                          <h4 className="font-semibold text-text-primary mb-2 text-sm">Capabilities:</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {agent.capabilities.slice(0, 4).map((capability, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                                <span className="text-xs text-text-secondary">{capability}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Results */}
                        {agent.results && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="font-semibold text-text-primary mb-2 text-sm">Last Results:</h4>
                            <div className="text-xs text-text-secondary">
                              {Object.entries(agent.results).map(([key, value], index) => (
                                <span key={index} className="inline-block mr-3">
                                  <strong>{key}:</strong> {value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => runAgent(agent.id)}
                            disabled={agentStatus[agent.id] === 'running'}
                            className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            {agentStatus[agent.id] === 'running' ? (
                              <>
                                <Clock className="w-4 h-4 animate-spin" />
                                Running...
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                Run Agent
                              </>
                            )}
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <Info className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Compliance Overview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary-500" />
                Compliance Overview
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Overall Score</span>
                    <span className="font-medium text-text-primary">{complianceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${complianceScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      WHS Policies
                    </span>
                    <span className="text-green-600 font-medium">✓ Complete</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Staff Training
                    </span>
                    <span className="text-green-600 font-medium">✓ Complete</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Risk Assessments
                    </span>
                    <span className="text-yellow-600 font-medium">⚠ In Progress</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Privacy Policy
                    </span>
                    <span className="text-red-600 font-medium">⚠ Needs Update</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-500" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text-primary">{activity.agent}</div>
                      <div className="text-xs text-text-secondary">{activity.action}</div>
                      <div className="text-xs text-text-light">{activity.time}</div>
                      {activity.details && (
                        <div className="text-xs text-primary-600 mt-1">{activity.details}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                Pro Tips
              </h3>
              
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Run Gap Analysis weekly to stay ahead of compliance issues</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Use Training Designer to keep your team up-to-date</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Schedule monthly audit reviews for best results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
