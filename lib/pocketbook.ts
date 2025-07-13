// lib/pocketbook.ts - Enhanced LLM Client for Fairform SaaS

import { createClient } from '@supabase/supabase-js'

export interface PocketbookRequest {
  prompt: string
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
  systemPrompt?: string
  metadata?: Record<string, any>
}

export interface PocketbookResponse {
  response: string
  model: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  metadata?: Record<string, any>
  processingTime?: number
}

export interface PocketbookError {
  error: string
  code?: string
  details?: any
  timestamp: string
}

export class PocketbookClient {
  private apiUrl: string
  private apiKey?: string
  private timeout: number
  private retryAttempts: number
  private retryDelay: number
  private requestCount: number = 0
  private lastRequestTime: number = 0

  constructor(
    apiUrl?: string, 
    timeout: number = 30000,
    retryAttempts: number = 3,
    retryDelay: number = 1000
  ) {
    this.apiUrl = apiUrl || process.env.POCKETBOOK_LLM_API_URL || 'http://localhost:8000'
    this.apiKey = process.env.POCKETBOOK_API_KEY
    this.timeout = timeout
    this.retryAttempts = retryAttempts
    this.retryDelay = retryDelay
  }

  private async makeRequest(
    endpoint: string,
    payload: any,
    attempt: number = 1
  ): Promise<PocketbookResponse> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    
    try {
      const startTime = Date.now()
      this.requestCount++
      this.lastRequestTime = startTime

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Fairform-SaaS/1.0'
      }

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`
        // Or if using API key in header:
        headers['X-API-Key'] = this.apiKey
      }

      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...payload,
          client_id: 'fairform-saas',
          request_id: `req_${Date.now()}_${this.requestCount}`,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      const processingTime = Date.now() - startTime

      if (!response.ok) {
        const errorText = await response.text()
        let errorData: any
        
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { message: errorText }
        }

        // Check if we should retry
        if (this.shouldRetry(response.status, attempt)) {
          console.warn(`Pocketbook request failed (attempt ${attempt}/${this.retryAttempts}):`, {
            status: response.status,
            error: errorData,
            endpoint,
          })
          
          await this.delay(this.retryDelay * attempt)
          return this.makeRequest(endpoint, payload, attempt + 1)
        }

        throw new Error(`Pocketbook API error: ${response.status} - ${errorData.message || errorText}`)
      }

      const data: PocketbookResponse = await response.json()
      
      // Add processing time to response
      data.processingTime = processingTime

      // Log successful request (in development)
      if (process.env.NODE_ENV === 'development') {
        console.log(`Pocketbook request successful:`, {
          endpoint,
          processingTime,
          tokens: data.usage?.totalTokens,
          model: data.model,
        })
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        if (attempt < this.retryAttempts) {
          console.warn(`Pocketbook request timeout (attempt ${attempt}/${this.retryAttempts})`)
          await this.delay(this.retryDelay * attempt)
          return this.makeRequest(endpoint, payload, attempt + 1)
        }
        throw new Error('Pocketbook API request timed out after multiple attempts')
      }
      
      // Network or other errors - retry if appropriate
      if (this.shouldRetry(0, attempt)) {
        console.warn(`Pocketbook request error (attempt ${attempt}/${this.retryAttempts}):`, error.message)
        await this.delay(this.retryDelay * attempt)
        return this.makeRequest(endpoint, payload, attempt + 1)
      }
      
      console.error('Pocketbook LLM request failed:', error)
      throw error
    }
  }

  private shouldRetry(statusCode: number, attempt: number): boolean {
    if (attempt >= this.retryAttempts) return false
    
    // Retry on network errors, timeouts, and server errors
    return (
      statusCode === 0 || // Network error
      statusCode === 408 || // Request timeout
      statusCode === 429 || // Rate limited
      (statusCode >= 500 && statusCode < 600) // Server errors
    )
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async callPocketbook(request: PocketbookRequest): Promise<string> {
    const {
      prompt,
      model = 'fairform-v1',
      temperature = 0.7,
      maxTokens = 2000,
      systemPrompt,
      metadata = {},
    } = request

    try {
      const response = await this.makeRequest('/generate', {
        prompt,
        model,
        temperature,
        max_tokens: maxTokens,
        system_prompt: systemPrompt,
        metadata: {
          ...metadata,
          source: 'fairform-saas',
          timestamp: new Date().toISOString(),
        },
      })

      return response.response || ''
    } catch (error) {
      // Log error for monitoring
      console.error('Pocketbook call failed:', {
        error: error.message,
        model,
        promptLength: prompt.length,
        metadata,
      })
      throw error
    }
  }

  async generatePolicyDocument({
    industry,
    policyType,
    businessName,
    abn,
    region,
    format,
    customRequirements,
  }: {
    industry: string
    policyType: string
    businessName: string
    abn: string
    region: string
    format: 'docx' | 'pdf'
    customRequirements?: string
  }): Promise<string> {
    const systemPrompt = `You are a professional legal compliance assistant specializing in Australian business regulations. 
You create comprehensive, audit-ready policy documents that meet all regulatory requirements.

Key guidelines:
- Use formal, professional language appropriate for legal documents
- Include all mandatory sections for Australian compliance
- Reference relevant Australian legislation and standards
- Structure content clearly with proper headings and numbering
- Ensure industry-specific requirements are addressed
- Include practical implementation guidance`

    const prompt = `Generate a comprehensive, audit-ready ${policyType} policy document for the following business:

**Business Details:**
- Company Name: ${businessName}
- ABN: ${abn}
- Industry: ${industry}
- Location: ${region}, Australia
- Document Format: ${format.toUpperCase()}

**Requirements:**
Create a professional policy document that includes:

1. **PURPOSE AND SCOPE**
   - Clear statement of policy purpose
   - Scope of application within the organization
   - Legal and regulatory context for ${region}

2. **DEFINITIONS**
   - Key terms and concepts
   - Industry-specific terminology
   - Legal definitions where applicable

3. **POLICY STATEMENT**
   - Clear policy commitments
   - Organizational responsibilities
   - Alignment with ${industry} best practices

4. **ROLES AND RESPONSIBILITIES**
   - Management responsibilities
   - Employee obligations
   - Contractor and visitor requirements
   - Specific roles for ${industry} compliance

5. **PROCEDURES AND REQUIREMENTS**
   - Step-by-step implementation procedures
   - Compliance monitoring processes
   - Record-keeping requirements
   - Training and awareness programs

6. **MONITORING AND REVIEW**
   - Performance indicators
   - Audit and review schedules
   - Continuous improvement processes
   - Reporting requirements

7. **COMPLIANCE AND ENFORCEMENT**
   - Consequences of non-compliance
   - Disciplinary procedures
   - Legal obligations and penalties
   - ${region}-specific regulatory requirements

${customRequirements ? `\n**Additional Requirements:**\n${customRequirements}` : ''}

**Industry-Specific Considerations for ${industry}:**
- Include relevant regulations, codes of practice, and standards
- Address specific risks and requirements for the ${industry} sector
- Reference applicable Australian legislation (e.g., Work Health and Safety Act, Privacy Act, etc.)
- Include ${region} state-specific requirements where applicable

**Formatting Requirements:**
- Use professional document structure with numbered sections
- Include clear headings and subheadings
- Format appropriately for ${format.toUpperCase()} output
- Include document control information (version, date, review schedule)
- Add approval and authorization sections

Ensure the document is comprehensive, legally sound, and immediately implementable for a ${industry} business operating in ${region}.`

    return this.callPocketbook({
      prompt,
      systemPrompt,
      model: 'fairform-v1',
      temperature: 0.3, // Lower temperature for more consistent legal content
      maxTokens: 3000,
      metadata: {
        documentType: 'policy',
        industry,
        policyType,
        region,
        format,
      },
    })
  }

  async askComplianceAgent({
    agentType,
    userQuestion,
    businessName,
    industry,
    context,
  }: {
    agentType: string
    userQuestion: string
    businessName?: string
    industry?: string
    context?: string
  }): Promise<string> {
    const agentProfiles = {
      'Risk Assessment': {
        role: 'Senior Risk Management Consultant',
        expertise: 'workplace risk identification, hazard assessment, risk mitigation strategies, WHS compliance',
        approach: 'systematic risk analysis with practical implementation recommendations',
      },
      'Incident Management': {
        role: 'Emergency Response and Incident Management Specialist',
        expertise: 'incident response procedures, emergency planning, investigation protocols, crisis management',
        approach: 'structured incident management with focus on prevention and continuous improvement',
      },
      'HR Compliance': {
        role: 'Employment Law and HR Compliance Expert',
        expertise: 'Fair Work Act, employment contracts, workplace relations, discrimination law, performance management',
        approach: 'balanced approach considering both legal compliance and practical HR management',
      },
      'NDIS Auditor': {
        role: 'NDIS Quality and Safeguards Auditor',
        expertise: 'NDIS Practice Standards, quality auditing, compliance reviews, participant safeguarding',
        approach: 'person-centered approach with strong focus on participant rights and safety',
      },
      'WHS Officer': {
        role: 'Workplace Health and Safety Officer',
        expertise: 'WHS legislation, safety systems, hazard controls, safety training, incident prevention',
        approach: 'proactive safety management with emphasis on worker consultation and continuous improvement',
      },
      'Privacy Officer': {
        role: 'Privacy and Data Protection Officer',
        expertise: 'Privacy Act compliance, data security, information management, breach response',
        approach: 'risk-based privacy protection with practical data governance solutions',
      },
      'Quality Assurance': {
        role: 'Quality Systems and Continuous Improvement Specialist',
        expertise: 'ISO standards, quality management systems, process improvement, audit procedures',
        approach: 'systematic quality management with focus on measurable outcomes and efficiency',
      },
      'Finance Compliance': {
        role: 'Financial Compliance and Reporting Specialist',
        expertise: 'financial reporting standards, tax compliance, audit requirements, corporate governance',
        approach: 'thorough financial compliance with practical implementation guidance',
      },
    }

    const profile = agentProfiles[agentType] || {
      role: 'Compliance Specialist',
      expertise: 'general compliance matters',
      approach: 'comprehensive analysis with practical recommendations',
    }

    const businessContext = businessName && industry 
      ? `The business is ${businessName}, operating in the ${industry} industry.`
      : industry 
      ? `The business operates in the ${industry} industry.`
      : ''

    const systemPrompt = `You are a ${profile.role} with deep expertise in ${profile.expertise}. 
Your approach is characterized by ${profile.approach}.

You provide professional, accurate, and actionable advice to Australian businesses. 
Always reference relevant Australian legislation, standards, and best practices.
Provide specific, practical recommendations that businesses can implement immediately.`

    const prompt = `${businessContext} ${context ? `Additional context: ${context}` : ''}

Question: ${userQuestion}

Please provide a comprehensive response that includes:
1. Direct answer to the question
2. Relevant Australian legislation or standards
3. Practical implementation steps
4. Potential risks or considerations
5. Recommended next actions

Keep your response professional, practical, and actionable. Reference specific regulations where applicable and provide clear guidance that the business can follow.`

    return this.callPocketbook({
      prompt,
      systemPrompt,
      model: 'fairform-v1',
      temperature: 0.4, // Slightly higher for more conversational responses
      maxTokens: 1500,
      metadata: {
        agentType,
        industry,
        businessName,
        questionType: 'compliance_advice',
      },
    })
  }

  async healthCheck(): Promise<{ healthy: boolean; latency?: number; error?: string }> {
    try {
      const startTime = Date.now()
      
      const response = await fetch(`${this.apiUrl}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout for health checks
      })

      const latency = Date.now() - startTime

      if (response.ok) {
        return { healthy: true, latency }
      } else {
        return { 
          healthy: false, 
          latency, 
          error: `HTTP ${response.status}: ${response.statusText}` 
        }
      }
    } catch (error) {
      return { 
        healthy: false, 
        error: error.message || 'Health check failed' 
      }
    }
  }

  getStats() {
    return {
      requestCount: this.requestCount,
      lastRequestTime: this.lastRequestTime,
      apiUrl: this.apiUrl,
      hasApiKey: !!this.apiKey,
      timeout: this.timeout,
      retryAttempts: this.retryAttempts,
    }
  }
}

// Export singleton instance
export const pocketbook = new PocketbookClient()

// Fallback responses for when LLM is down
export const getFallbackResponse = (
  type: 'policy' | 'agent', 
  context?: any
): string => {
  if (type === 'policy') {
    return `# ${context.policyType}

## 1. PURPOSE AND SCOPE

This policy document for ${context.businessName} (ABN: ${context.abn}) establishes comprehensive guidelines for ${context.policyType.toLowerCase()} compliance in the ${context.industry} industry, operating in ${context.region}, Australia.

## 2. DEFINITIONS

**Key Terms:** Industry-standard definitions and terminology relevant to ${context.policyType.toLowerCase()} will be defined in the final document.

## 3. POLICY STATEMENT

${context.businessName} is committed to maintaining the highest standards of ${context.policyType.toLowerCase()} compliance in accordance with Australian legislation and industry best practices.

## 4. ROLES AND RESPONSIBILITIES

### Management Responsibilities
- Overall accountability for policy implementation
- Resource allocation and support
- Regular review and updates

### Employee Responsibilities
- Compliance with policy requirements
- Reporting of issues or concerns
- Participation in training programs

## 5. PROCEDURES AND REQUIREMENTS

Detailed procedures will be developed based on:
- Current Australian legislation
- Industry-specific requirements for ${context.industry}
- ${context.region} state and territory regulations
- Best practice guidelines

## 6. MONITORING AND REVIEW

- Regular audits and assessments
- Performance measurement and reporting
- Continuous improvement processes
- Annual policy review

## 7. COMPLIANCE AND ENFORCEMENT

- Clear consequences for non-compliance
- Fair and consistent enforcement
- Support and training for compliance
- Legal obligations and requirements

---

**Document Control:**
- Version: 1.0
- Date: ${new Date().toLocaleDateString()}
- Review Date: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
- Approved by: [Management Representative]

---

**Important Notice:** This is a basic template generated during a service interruption. For a comprehensive, legally reviewed policy document that meets all regulatory requirements, please regenerate this document when our AI service is restored, or consult with a qualified legal professional.

The final document should include:
- Specific regulatory references for ${context.region}
- Industry-specific compliance requirements for ${context.industry}
- Detailed implementation procedures
- Risk assessment and mitigation strategies
- Training and awareness programs
- Record-keeping requirements
- Review and update procedures`
  }
  
  const agentFallbacks = {
    'Risk Assessment': "I'm currently experiencing technical difficulties, but I can provide some general guidance: For risk assessment, focus on identifying hazards, assessing likelihood and consequences, and implementing control measures following the hierarchy of controls. Ensure compliance with your state's WHS legislation and conduct regular reviews.",
    
    'HR Compliance': "While I'm temporarily offline, here's essential HR guidance: Ensure all employment practices comply with the Fair Work Act 2009, maintain proper documentation, provide equal opportunity, and establish clear policies for performance management and workplace conduct.",
    
    'WHS Officer': "During this service interruption, remember these key WHS principles: Ensure workplace safety through hazard identification and risk control, provide adequate training and supervision, maintain safe systems of work, and consult with workers on safety matters.",
    
    'Privacy Officer': "While services are restored, consider these privacy essentials: Comply with the Privacy Act 1988, implement data security measures, obtain proper consent for data collection, and have breach response procedures in place.",
  }
  
  return agentFallbacks[context?.agentType] || 
    "I'm currently experiencing technical difficulties. Please try again in a few minutes, or contact our support team for immediate assistance with your compliance question."
}

// Utility function for prompt engineering
export const createPromptTemplate = (
  type: 'policy' | 'agent',
  variables: Record<string, string>
): string => {
  const templates = {
    policy: `Generate a {policyType} for {businessName} (ABN: {abn}) in {industry} industry, {region}...`,
    agent: `As a {agentType}, help with: {question} for {businessName} in {industry}...`,
  }
  
  let template = templates[type] || ''
  
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(new RegExp(`{${key}}`, 'g'), value)
  })
  
  return template
}

// Export for testing
export { PocketbookClient }