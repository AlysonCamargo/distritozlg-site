const fs = require('fs');

const data = fs.readFileSync('C:/Users/Administrador/Desktop/distritozlg-site/data.txt', 'utf-8');
const lines = data.split('\n');

const getImageUrl = (url) => {
  if (!url) return '';
  url = url.trim();
  if (url.includes('open?id=')) {
    return url.replace('https://drive.google.com/open?id=', 'https://lh3.googleusercontent.com/d/');
  }
  return url;
};

const mapCategory = (cat) => {
  cat = cat.trim().toLowerCase();
  if (cat === 'oversized') return 'oversized';
  if (cat === 'malha egipcia') return 'malha egipcia';
  if (cat === 'camiseta de time nacional') return 'time nacional';
  if (cat === 'camiseta street') return 'street';
  if (cat === 'regata canelada' || cat === 'camiseta canelada' || cat === 'caneladas') return 'caneladas';
  if (cat === 'shorts dry fit' || cat === 'shorts dry') return 'shorts dry fit';
  if (cat === 'cintos') return 'cintos';
  return cat;
};

let startId = 174;
let result = '';

lines.forEach(line => {
  if (!line.trim()) return;
  const parts = line.split('\t');
  
  const name = parts[1].trim();
  let priceStr = parts[2].trim();
  if (priceStr.includes(',')) priceStr = priceStr.replace(',', '.');
  const price = parseFloat(priceStr);
  
  const frontLink = parts[3];
  const backLink = parts[4] || frontLink;

  const frontUrl = getImageUrl(frontLink);
  const backUrl = getImageUrl(backLink);
  
  const rawCategory = parts[5] || '';
  const sizes = parts[6] ? parts[6].trim() : '';

  const category = mapCategory(rawCategory);

  result += `  {
    id: ${startId++},
    name: '${name.replace(/'/g, "\\'")}',
    price: ${price},
    image: '${frontUrl}',
    imageFront: '${frontUrl}',
    imageBack: '${backUrl}',
    category: '${category}',
    size: '${sizes}',
    isNew: true,
    isSale: false
  },
`;
});

fs.writeFileSync('C:/Users/Administrador/Desktop/distritozlg-site/output.txt', result);
console.log("Successfully generated");
