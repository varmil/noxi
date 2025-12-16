#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')

/**
 * 重複インポートを検知するスクリプト
 */
function checkDuplicateImports() {
  const files = glob.sync('**/*.ts', {
    cwd: path.join(__dirname, '..'),
    ignore: ['node_modules/**', 'dist/**', '**/*.d.ts']
  })

  let hasErrors = false

  files.forEach(file => {
    const filePath = path.join(__dirname, '..', file)
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')

    lines.forEach((line, index) => {
      // import文の行を検索
      if (
        line.trim().startsWith('import') &&
        line.includes('{') &&
        line.includes('}')
      ) {
        // {}内の要素を抽出
        const match = line.match(/\{([^}]+)\}/)
        if (match) {
          const imports = match[1]
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0)

          // 重複をチェック
          const duplicates = imports.filter(
            (item, index) => imports.indexOf(item) !== index
          )

          if (duplicates.length > 0) {
            console.error(`❌ 重複インポートを検出: ${file}:${index + 1}`)
            console.error(`   重複項目: ${duplicates.join(', ')}`)
            console.error(`   行: ${line.trim()}`)
            console.error('')
            hasErrors = true
          }
        }
      }
    })
  })

  if (hasErrors) {
    console.error('重複インポートが見つかりました。修正してください。')
    process.exit(1)
  } else {
    console.log('✅ 重複インポートは見つかりませんでした。')
  }
}

checkDuplicateImports()
