'use strict';
const http=require('node:http'), fs=require('node:fs'), path=require('node:path');
const index=fs.readFileSync(path.join(__dirname,'index.html'));
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost');
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
  if(url.pathname==='/health'){res.writeHead(200,{'Content-Type':'text/plain'});return res.end(req.method==='HEAD'?undefined:'ok');}
  if(url.pathname!=='/'&&url.pathname!=='/index.html'){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found');}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"});
  res.end(req.method==='HEAD'?undefined:index);
});
server.listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('CV Yaptır ready'));
