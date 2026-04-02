const fs = require('fs');

let content = fs.readFileSync('src/data/products.ts', 'utf-8');

const regex = /name:\s*['"](.*?)['"]/g;

const nameCounts = {};

const newContent = content.replace(regex, (match, nameGroup) => {
  if (nameGroup === 'Todos' || nameGroup === 'Dryfit' || nameGroup === 'Malha Egípcia' || 
      nameGroup === 'Oversized' || nameGroup === 'Calça Cargo' || nameGroup === 'Regatas' ||
      nameGroup === 'Caneladas' || nameGroup === 'Shorts Moletom' || nameGroup === 'Shorts Dry fit' ||
      nameGroup === 'Surf' || nameGroup === 'Promoções' || nameGroup === 'Peruana' ||
      nameGroup === 'Time Nacional' || nameGroup === 'Street' || nameGroup === 'Cintos') {
    return match; // Pula as categorias
  }

  let baseName = nameGroup;
  
  // Limpa sufixos romanos caso a gente já tenha rodado antes algo assim, mas não rodamos,
  // ou se houver um final duplicado 
  // Na verdade, usamos exatamente o nome atual como base.

  if (!nameCounts[baseName]) {
    nameCounts[baseName] = 0;
  }
  nameCounts[baseName]++;

  let currentCount = nameCounts[baseName];

  // Seenas for o primeiro, deixa o nome original
  let finalName = baseName;

  if (currentCount > 1) {
    // Arrays de numerais romanos
    const numerals = ["", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX", "XXXI", "XXXII", "XXXIII"];
    // Adiciona o algarismo romano
    let suffix = numerals[currentCount - 1] || currentCount.toString();
    finalName = `${baseName} ${suffix}`;
  }

  return `name: '${finalName}'`;
});

fs.writeFileSync('src/data/products.ts', newContent, 'utf-8');
console.log('Uniqueness resolved.');
