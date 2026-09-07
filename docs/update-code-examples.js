#!/usr/bin/env node

/**
 * Script to update all markdown files to add JS/TS tabs and descriptive filenames
 * 
 * This script:
 * 1. Adds Tabs/TabItem imports if missing
 * 2. Wraps code blocks in Tabs with TS/JS options
 * 3. Adds descriptive titles to code blocks
 * 
 * Run with: node update-code-examples.js
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

// Map of common component names to descriptive filenames
const filenameMap = {
  'Button': 'ButtonExample',
  'Input': 'InputExample',
  'Select': 'SelectExample',
  'Modal': 'ModalExample',
  'DataTable': 'DataTableExample',
  'Table': 'TableExample',
  'ContextMenu': 'ContextMenuExample',
  'Menu': 'MenuExample',
  'Pagination': 'PaginationExample',
  'Group': 'GroupExample',
  'FormElement': 'FormElementExample',
  'Label': 'LabelExample',
  'ErrorBoundary': 'ErrorBoundaryExample',
  'WindowBoundary': 'WindowBoundaryExample',
  'AsyncSelect': 'AsyncSelectExample',
};

function generateFilename(content, index) {
  // Try to extract component name from imports
  const importMatch = content.match(/import.*from.*["']@kousta-ui\/(components|table)["']/);
  if (importMatch) {
    const componentMatch = importMatch[0].match(/\{([^}]+)\}/);
    if (componentMatch) {
      const components = componentMatch[1].split(',').map(c => c.trim());
      for (const comp of components) {
        if (filenameMap[comp]) {
          return filenameMap[comp];
        }
      }
    }
  }
  
  // Fallback to generic names
  return `Example${index > 0 ? index + 1 : ''}`;
}

function updateMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if Tabs are already imported
  const hasTabsImport = content.includes("import Tabs from '@theme/Tabs'");
  
  // Add Tabs import if missing and file has code blocks
  if (!hasTabsImport && (content.includes('```tsx') || content.includes('```ts') || content.includes('```jsx') || content.includes('```js'))) {
    // Find the last import statement
    const importMatch = content.match(/(import.*from.*;\n)+/);
    if (importMatch) {
      const lastImport = importMatch[0].trim().split('\n').pop();
      const insertPos = content.indexOf(lastImport) + lastImport.length;
      content = content.slice(0, insertPos) + 
        "\nimport Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem';" +
        content.slice(insertPos);
      modified = true;
    }
  }
  
  // This is a complex transformation - for now, we'll do it manually for key files
  // The script serves as a reference for the pattern
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// Main execution
function main() {
  const files = [];
  
  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  walkDir(docsDir);
  
  console.log(`Found ${files.length} markdown files`);
  console.log('Note: This script provides the pattern. Manual updates may be needed for complex cases.');
}

if (require.main === module) {
  main();
}

module.exports = { updateMarkdownFile, generateFilename };
