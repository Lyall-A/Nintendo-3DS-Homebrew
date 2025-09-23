const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const exeFSPath = process.argv[2];
const exeFS = fs.readFileSync(exeFSPath);
const extractPath = path.resolve(`${path.basename(exeFSPath, path.extname(exeFSPath))}-extract`);

if (exeFS.length < 0x200) throw new Error('Invalid .exefs file!');
if (fs.existsSync(extractPath)) throw new Error('Output directory already exists!');

let offset = 0;

for (let fileIndex = 0; fileIndex < 10; fileIndex++) {
    const hashOffset = 0xc0 + (9 - fileIndex) * 32;

    const fileName = exeFS.subarray(offset, offset += 8).toString().replace(/\x00/g, '');
    const fileOffset = exeFS.readUInt32LE(offset, offset += 4) + 0x200;
    const fileSize = exeFS.readUInt32LE(offset, offset += 4);
    const fileBuffer = exeFS.subarray(fileOffset, fileOffset + fileSize);

    if (!fileSize) continue;

    const expectedHash = exeFS.subarray(hashOffset, hashOffset + 32);
    const actualHash = crypto.createHash('sha256').update(fileBuffer).digest();

    if (!actualHash.equals(expectedHash)) throw new Error(`${fileName} does not match hash! Expected: ${expectedHash.toString('hex')} Actual: ${actualHash.toString('hex')}`);

    fs.mkdirSync(extractPath, { recursive: true });
    fs.writeFileSync(`${path.join(extractPath, fileName)}.bin`, fileBuffer);
}