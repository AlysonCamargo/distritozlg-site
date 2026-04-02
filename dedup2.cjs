const fs = require('fs');

let content = fs.readFileSync('src/data/products.ts', 'utf-8');

const regex = /name:\s*['"](.*?)['"]/g;

const suffixesPool = [
  "Premium", "Classic", "Vintage", "Urban", "Concept", "Edition", 
  "Signature", "Sport", "Authentic", "Pro", "Minimal", "Exclusive", "Elite", 
  "Series", "Advanced", "Performance", "Core", "Comfort", "Fit", "Dynamic", 
  "Limited", "Basic", "Style", "Design", "Aesthetic", "Heritage", "Collection", "Iconic"
];

const nameCounts = {};
const assignedNames = new Set();

const newContent = content.replace(regex, (match, nameGroup) => {
  if (["Todos", "Dryfit", "Malha Egípcia", "Oversized", "Calça Cargo", "Regatas",
       "Caneladas", "Shorts Moletom", "Shorts Dry fit", "Surf", "Promoções", "Peruana",
       "Time Nacional", "Street", "Cintos"].includes(nameGroup)) {
    return match; // Pula as categorias
  }

  // Remove potential roman numerals
  let baseName = nameGroup.replace(/\s+(II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX|XXI|XXII|XXIII|XXIV|XXV|XXVI|XXVII|XXVIII|XXIX|XXX|XXXI|XXXII)$/, '').trim();
  
  if (!nameCounts[baseName]) {
    nameCounts[baseName] = 0;
  }
  
  let finalName = baseName;
  
  if (nameCounts[baseName] === 0 && !assignedNames.has(baseName)) {
    nameCounts[baseName]++;
    assignedNames.add(baseName);
    return `name: '${baseName}'`;
  }
  
  nameCounts[baseName]++;

  let assigned = false;
  for (let suffix of suffixesPool) {
    let testName = `${baseName} ${suffix}`;
    
    if (baseName.endsWith(suffix) || baseName.includes(` ${suffix} `)) {
        continue;
    }

    if (!assignedNames.has(testName)) {
      finalName = testName;
      assignedNames.add(finalName);
      assigned = true;
      break;
    }
  }

  if (!assigned) {
      finalName = `${baseName} Variant ${nameCounts[baseName]}`;
      assignedNames.add(finalName);
  }

  return `name: '${finalName}'`;
});

fs.writeFileSync('src/data/products.ts', newContent, 'utf-8');
console.log('Unique custom names applied.');
