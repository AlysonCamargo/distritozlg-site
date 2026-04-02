const fs = require('fs');
let content = fs.readFileSync('src/data/products.ts', 'utf-8');

const regex = /name:\s*['"](.*?)['"]/g;

const rules = [
  // Cintos
  { test: /Cinto LV/i, replace: 'Cinto Louis Vuitton Emblem Detail' },
  { test: /Cinto QUIK/i, replace: 'Cinto Quiksilver Surf Classic' },
  { test: /Cinto NIKE/i, replace: 'Cinto Nike Sport Essential' },
  { test: /Cinto OAKLEY/i, replace: 'Cinto Oakley Tactical Logo' },
  
  // Categorias específicas onde era só "Camiseta street 104"
  { test: /Camiseta street/i, replace: 'Camiseta Streetwear Essential' },
  { test: /Camiseta nacional brasil/i, replace: 'Camiseta Brasil Torcedor Classic' },
  { test: /Camiseta malha eg[íi]pcia/i, replace: 'Camiseta Malha Egípcia Premium' },
  { test: /Camiseta canelada/i, replace: 'Camiseta Canelada Minimalista' },
  { test: /Regata canelada/i, replace: 'Regata Canelada Fit' },
  { test: /Shorts dry/i, replace: 'Bermuda Dry Fit Performance' },
  
  // Nomes de marca soltos -> Camiseta
  { test: /^Adidas Bordada/i, replace: 'Camiseta Adidas Classic Bordada' },
  { test: /^Adidas Logo/i, replace: 'Camiseta Adidas Logo Minimal' },
  { test: /^Lacoste$/i, replace: 'Camiseta Lacoste Essential' },
  { test: /^Palm Angels Olho/i, replace: 'T-Shirt Palm Angels Eye Concept' },
  { test: /^Off White Pinóquio/i, replace: 'T-Shirt Off White Pinocchio Edition' },
  { test: /^Air Bordado/i, replace: 'Camiseta Air Classic Bordada' },
  { test: /^Travis Mostarda/i, replace: 'T-Shirt Travis Scott Mustard Edition' },
  { test: /^Travis Bege/i, replace: 'T-Shirt Travis Scott Beige Edition' },
  { test: /^Adidas Jerry/i, replace: 'Camiseta Adidas Jerry Edition' },
  { test: /^Neymar/i, replace: 'Camiseta Neymar Jr Exclusiva' },
  { test: /^Off White X/i, replace: 'T-Shirt Off White X Cross' },
  { test: /^Los Angeles 32/i, replace: 'Camiseta Los Angeles 32 Athletics' },
  
  // Quiksilver e Surf
  { test: /^Quiksilver Preta/i, replace: 'Camiseta Quiksilver Classic Preta' },
  { test: /^Quiksilver/i, replace: 'Camiseta Quiksilver Surf Original' },
  { test: /^Ripcurl/i, replace: 'Camiseta Rip Curl Surf Series' },
  { test: /^Hang Loose/i, replace: 'Camiseta Hang Loose Authentic' },
  { test: /^Town&Country/i, replace: 'Camiseta Town & Country Original' },
  { test: /^Mizuno/i, replace: 'Camiseta Mizuno Sport Classic' },
  
  // Outros Oversized
  { test: /^PALM ANGELS Asa/i, replace: 'T-Shirt Palm Angels Wings Edition' },
  { test: /^JORDAN Chicago/i, replace: 'T-Shirt Jordan Chicago Bulls' },
  { test: /^CASA BLANCA Tenis/i, replace: 'T-Shirt Casablanca Tennis Club' },
  { test: /^HIGH/i, replace: 'Camiseta High Company Original' },
  { test: /^SUPREME Products/i, replace: 'T-Shirt Supreme Products Classic' },
  { test: /^PALM ANGELS Dólar Rosas/i, replace: 'T-Shirt Palm Angels Money Rose' },
  { test: /^BALENCIAGA BB/i, replace: 'T-Shirt Balenciaga BB Paris' },
  
  // Dry Fit Genéricos
  { test: /^Dry Fit Nike Logo na Direita/i, replace: 'Camiseta Dry Fit Nike Sport' },
  { test: /^Dry Fit Nike Logo Central/i, replace: 'Camiseta Dry Fit Nike Central' },
  { test: /^Dry Fit Adidas Branca/i, replace: 'Camiseta Dry Fit Adidas Essential' },
  { test: /^Dry Fit Nike Bege/i, replace: 'Camiseta Dry Fit Nike Basic Bege' },
  { test: /^Dry Fit Under Armour Bege/i, replace: 'Camiseta Dry Fit Under Armour Bege' },
  { test: /^Nike Sombras/i, replace: 'Camiseta Nike Shadows Edition' },
  
  // Alguns ajeites
  { test: /^Camiseta Boss Branca Logo Medio/i, replace: 'Camiseta Boss Branca Logo Frontal' },
  { test: /^Camiseta Boss Preta Logo Pequeno/i, replace: 'Camiseta Boss Preta Minimalista' },
  { test: /^Camiseta Diesel Branca D Red/i, replace: 'Camiseta Diesel Branca D Vermelho' },
  { test: /^Camiseta Boss Bege Logo /i, replace: 'Camiseta Boss Bege Essential' },
  { test: /^Camiseta Boss Marrom Logo/i, replace: 'Camiseta Boss Marrom Premium' },
  { test: /^Camiseta Nike Preta Logo Grande/i, replace: 'Camiseta Nike Preta Classic Logo' }
];

function titleCase(str) {
  return str.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase())
    .join(' ');
}

let newContent = content.replace(regex, (match, nameGroup) => {
  if (nameGroup === 'Todos' || nameGroup === 'Dryfit' || nameGroup === 'Malha Egípcia' || 
      nameGroup === 'Oversized' || nameGroup === 'Calça Cargo' || nameGroup === 'Regatas' ||
      nameGroup === 'Caneladas' || nameGroup === 'Shorts Moletom' || nameGroup === 'Shorts Dry fit' ||
      nameGroup === 'Surf' || nameGroup === 'Promoções' || nameGroup === 'Peruana' ||
      nameGroup === 'Time Nacional' || nameGroup === 'Street' || nameGroup === 'Cintos') {
    // Ignora nomes de categorias
    return match;
  }

  let finalName = nameGroup;

  // Aplique as regras manuais primeiro
  let appliedCustom = false;
  for (let rule of rules) {
    if (rule.test.test(finalName)) {
      finalName = rule.replace;
      appliedCustom = true;
      break;
    }
  }

  if (!appliedCustom) {
    // Se não bateu com regras específicas
    // Removemos números no final (ex: "Camiseta oversized Nike 32" -> "Camiseta oversized Nike")
    finalName = finalName.replace(/\s\d+$/, '').trim();
    
    // Deixa capitalizado mais agradável
    finalName = titleCase(finalName);
    
    // Adiciona sufixo caso tenha ficado muito genérico (algumas brands)
    if (finalName.match(/Camiseta Lacoste$/i)) finalName += ' Premium';
    if (finalName.match(/Camiseta Diesel$/i)) finalName += ' Essential';
    if (finalName.match(/Camiseta Oversized Amiri$/i)) finalName += ' Concept';
    if (finalName.match(/Camiseta Oversized Nike$/i)) finalName += ' Street';
    if (finalName.match(/Camiseta Oversized Adidas$/i)) finalName += ' Originals';
    if (finalName.match(/Camiseta Oversized Palm Angels$/i)) finalName += ' Signature';
    if (finalName.match(/Camiseta Oversized Gangster$/i)) finalName += ' Urban';
    if (finalName.match(/Camiseta Oversized Off White$/i)) finalName += ' Edition';
    if (finalName.match(/Camiseta Dry Fit Nike$/i)) finalName += ' Performance';
  }

  return 'name: \'' + finalName + '\'';
});

fs.writeFileSync('src/data/products.ts', newContent, 'utf-8');
console.log('Renaming finished');
