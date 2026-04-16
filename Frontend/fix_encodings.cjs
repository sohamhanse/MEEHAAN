const fs = require('fs');
const file = 'src/pages/solutions/CaFlowPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/â€”|â”€/g, '—')
                 .replace(/â†“/g, '↓')
                 .replace(/â†/g, '←')
                 .replace(/â‚¹/g, '₹')
                 .replace(/Â·/g, '·')
                 .replace(/â€“/g, '–');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed encodings in CaFlowPage.jsx');
