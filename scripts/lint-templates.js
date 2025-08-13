#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { glob } = require('glob')

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates', 'blocks')
const EM_DASH_REGEX = /—/g

async function lintTemplates() {
  console.log('🔍 Linting template files for em-dashes...')
  
  try {
    const templateFiles = await glob('**/*.mdx', { cwd: TEMPLATES_DIR })
    let hasErrors = false
    
    for (const file of templateFiles) {
      const filePath = path.join(TEMPLATES_DIR, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      
      const matches = content.match(EM_DASH_REGEX)
      if (matches) {
        console.error(`❌ Found ${matches.length} em-dash(es) in: ${file}`)
        
        const lines = content.split('\n')
        lines.forEach((line, index) => {
          if (line.includes('—')) {
            console.error(`   Line ${index + 1}: ${line.trim()}`)
          }
        })
        
        hasErrors = true
      } else {
        console.log(`✅ ${file}`)
      }
    }
    
    if (hasErrors) {
      console.error('\n❌ Template linting failed! Please replace em-dashes (—) with hyphens (-)')
      process.exit(1)
    } else {
      console.log('\n✅ All templates passed linting!')
    }
    
  } catch (error) {
    console.error('Error during template linting:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  lintTemplates()
}

module.exports = { lintTemplates }
