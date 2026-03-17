import fs from 'fs';

const productsFile = 'C:/Users/Administrador/Desktop/distritozlg-site/src/data/products.ts';
let content = fs.readFileSync(productsFile, 'utf-8');

// Update categories
const oldCategoriesEnd = `  { id: "peruana", name: "Peruana" },\n];`;
const newCategoriesEnd = `  { id: "peruana", name: "Peruana" },\n  { id: "time nacional", name: "Time Nacional" },\n  { id: "street", name: "Street" },\n  { id: "cintos", name: "Cintos" },\n];`;
if(content.includes(oldCategoriesEnd)) {
    content = content.replace(oldCategoriesEnd, newCategoriesEnd);
} else {
    // If exact match fails, fallback replace
     content = content.replace('];\n\nexport const products', '  { id: "time nacional", name: "Time Nacional" },\n  { id: "street", name: "Street" },\n  { id: "cintos", name: "Cintos" },\n];\n\nexport const products');
}

// Update products
const newProducts = fs.readFileSync('C:/Users/Administrador/Desktop/distritozlg-site/output.txt', 'utf-8');

const lastProductClose = `    isSale: false,\n  }\n];`;
if (content.includes(lastProductClose)) {
    content = content.replace(lastProductClose, `    isSale: false,\n  },\n` + newProducts + `];`);
} else {
    // Just replace the very last ]; in the file.
    const lastIndex = content.lastIndexOf('];');
    if (lastIndex !== -1) {
        content = content.slice(0, lastIndex) + ',\n' + newProducts + '];' + content.slice(lastIndex + 2);
    }
}

fs.writeFileSync(productsFile, content);
console.log("Injected new products!");
