'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { Bot, Zap, FileText, Users } from 'lucide-react'

export default function DashboardPage() {
  const [documents] = useState([
    {
      id: '1',
      business_name: 'Sunshine NDIS Services',
      industry: 'NDIS',
      doc_type: 'NDIS Compliance Pack',
      status: 'completed',
      created_at: '2024-01-15T00:00:00Z',
      download_url: '#',
      agent: 'NDIS Specialist',
      documents_count: 12
    },
    {
      id: '2', 
      business_name: 'BuildSafe Construction',
      industry: 'Construction',
      doc_type: 'WHS Policy Suite',
      status: 'processing',
      created_at: '2024-01-14T00:00:00Z',
      agent: 'Construction Expert',
      documents_count: 15
    },
    {
      id: '3',
      business_name: 'Little Learners Childcare',
      industry: 'Childcare',
      doc_type: 'NQF Compliance Pack',
      status: 'completed',
      created_at: '2024-01-13T00:00:00Z',
      download_url: '#',
      agent: 'Childcare Specialist',
      documents_count: 10
    }
  ])

  const recentActivity = [
    {
      id: 1,
      action: 'Generated WHS Policy Suite',
      agent: 'Construction Expert',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      action: 'Updated NDIS Compliance Pack',
      agent: 'NDIS Specialist', 
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Created Childcare Policies',
      agent: 'Childcare Specialist',
      time: '2 days ago',
      status: 'completed'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-400 animate-spin" />
      case 'failed':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'failed':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const stats = {
    total: documents.length,
    completed: documents.filter(d => d.status === 'completed').length,
    processing: documents.filter(d => d.status === 'processing').length,
    documents_generated: documents.reduce((acc, doc) => acc + doc.documents_count, 0)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <header className="border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-semibold text-white">FairForm</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="text-white border-b-2 border-blue-500 pb-4">Dashboard</Link>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">AI Agents</Link>
                <Link href="/documents" className="text-gray-300 hover:text-white transition-colors">Documents</Link>
                <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <CogIcon className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, John 👋
            </h1>
            <p className="text-gray-400">
              Here's what's happening with your compliance documents today.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Link href="/products" className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <Bot className="w-5 h-5" />
              <span>Deploy AI Agent</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-400">↗ 12%</span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Documents Generated</p>
                <p className="text-3xl font-bold text-white">{stats.documents_generated}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-400">↗ 23%</span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Avg Generation Time</p>
                <p className="text-3xl font-bold text-white">58s</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-400">↗ 5%</span>
              <span className="text-gray-400 ml-2">faster</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Active Agents</p>
                <p className="text-3xl font-bold text-white">6</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-400">+2</span>
              <span className="text-gray-400 ml-2">this month</span>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-800 rounded-xl border border-gray-700"
            >
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
                  <Link href="/documents" className="text-blue-400 hover:text-blue-300 text-sm">
                    View all
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-400 mb-2">No projects yet</h3>
                    <p className="text-gray-500 mb-6">
                      Deploy your first AI agent to start generating compliance documents
                    </p>
                    <Link href="/products" className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      <Bot className="w-5 h-5" />
                      <span>Deploy AI Agent</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((document) => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {getStatusIcon(document.status)}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">
                              {document.business_name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-400">
                              <span>{document.agent}</span>
                              <span>•</span>
                              <span>{document.documents_count} documents</span>
                              <span>•</span>
                              <span>{new Date(document.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(document.status)}`}>
                            {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                          </span>
                          
                          {document.status === 'completed' && document.download_url && (
                            <button className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-gray-600 transition-colors">
                              <ArrowDownTrayIcon className="h-5 w-5" />
                            </button>
                          )}
                          
                          <button className="text-gray-400 hover:text-gray-300 p-2 rounded-lg hover:bg-gray-600 transition-colors">
                            <EllipsisVerticalIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/products/ndis"
                  className="flex items-center space-x-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <div className="text-2xl">🏥</div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-blue-400 transition-colors">NDIS Policies</div>
                    <div className="text-xs text-gray-400">Disability services compliance</div>
                  </div>
                </Link>
                
                <Link
                  href="/products/construction"
                  className="flex items-center space-x-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <div className="text-2xl">🏗️</div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-blue-400 transition-colors">Construction Safety</div>
                    <div className="text-xs text-gray-400">WHS and safety policies</div>
                  </div>
                </Link>
                
                <Link
                  href="/products/childcare"
                  className="flex items-center space-x-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <div className="text-2xl">👶</div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-blue-400 transition-colors">Childcare Policies</div>
                    <div className="text-xs text-gray-400">NQF compliance documents</div>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.agent} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}