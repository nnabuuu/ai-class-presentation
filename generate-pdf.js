// Simple script to generate PDF from HTML presentation
const { execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple HTTP server
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'interlude-capabilities.html' : req.url);
  const ext = path.extname(filePath);

  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = contentTypes[ext] || 'text/html';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 8888;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Please open Chrome and:');
  console.log('1. Navigate to http://localhost:8888/interlude-capabilities.html?print-pdf');
  console.log('2. Press Ctrl+P (Cmd+P on Mac)');
  console.log('3. Choose "Save as PDF"');
  console.log('4. Save as "interlude-capabilities.pdf"');
  console.log('\nPress Ctrl+C to stop the server when done.');
});
