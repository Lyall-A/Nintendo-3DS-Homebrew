const fs = require('fs');
const path = require('path');

const allCategories = require('./sd-files.json');

const args = process.argv.slice(2);

const downloadsDir = './Downloads';
const sdDir = './SD';

if (!fs.existsSync(downloadsDir)) return console.log('Downloads directory doesn\'t exist');
if (fs.existsSync(sdDir)) {
    console.log('Deleting old SD directory');
    fs.rmSync(sdDir, { recursive: true, force: true });
}
fs.mkdirSync(sdDir);

const categories = allCategories.filter(category => {
    if (category.required) return true;
    if (args.includes(category.id)) return true;
    return false;
});

for (const category of categories) {
    const files = category.files;
    console.log(`Copying ${files.length} files from ${category.name}`);
    for (const [source, destination] of files) {
        const fullSource = path.resolve(downloadsDir, source);
        const fullDesination = path.resolve(sdDir, destination);
        console.log(`Copying "${source}" to ${destination}`);
        fs.cpSync(fullSource, fullDesination, { recursive: true });
    }
}

console.log(`Created SD at "${sdDir}"`);