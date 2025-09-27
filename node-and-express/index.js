//file system module
import fs from 'fs';
const flName = '.env';
fs.writeFileSync(flName, 'key=hggsdfghjln');
console.log(fs.readFileSync(flName, 'utf8'));
fs.appendFileSync(flName, '\nurl=vhttps://fghfggd.comnhgff');
fs.unlinkSync(flName);
//crypto module
import crypto from 'crypto';
const text = 'hello world';
const hash = crypto.createHash('sha256').update(text).digest('hex');
console.log(text, hash)
//streams
const readfl = fs.createReadStream('js.txt', { encoding: 'utf8' });
const writefl = fs.createWriteStream('js2.txt', { encoding: 'utf8' });
readfl.on('data', chunk => {
     writefl.write(chunk);
});
readfl.on('end', () => {
     console.log('No more data to read.');
     writefl.end();
});
readfl.on('error', err => {
     console.log('Error de lectura del archivo', err);
});
writefl.on('error', err => {
     console.log('Error de lectura del archivo', err);
});
//buffer
import { Buffer } from 'buffer';
const bufferFromString = Buffer.from('Hello World!', 'utf8');
console.log(bufferFromString);
const bufferAlloc = Buffer.alloc(10);
console.log(bufferAlloc);
bufferAlloc.write('node.js');
console.log(bufferAlloc);
const bufferToString = bufferAlloc.toString('utf8', 0, 7);
console.log(bufferToString);
//http module
import http from 'http';
const server = http.createServer((req, res)=>{
     res.writeHead(200, { 'Content-Type': 'text/plain' });
     res.end('Hello World!\n');
});

server.listen(1234,'localhost',()=>{
     console.log('run');
});