const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('fw.html', 'utf8');
const $ = cheerio.load(html);

fs.writeFileSync('tr_dump.html', $('tr').eq(1).html());
