import log from '@ajar/marker'; 
import http from 'http';
// import inspect from 'inspector';
// import querystring from 'querystring';
// import express from 'express';
import urlHelper from 'url'

// const PORT = process.env.PORT;
// const HOST = process.env.HOST;
const { PORT, HOST } = process.env;

//create an http web server
const server = http.createServer( (req,res)=> {
    res.statusCode = 200;
    // res.setHeader('Content-Type','text/plain')
    // res.setHeader('Content-Type','text/html')
    // res.end(`<h1>Hello from server!!!</h1>`);
    const {url,method,httpVersion,headers} = req
    // const params = new URLSearchParams(url);


    res.setHeader('Status-Code', res.statusCode)
    res.setHeader('User-Agent', 'headers')
    res.setHeader('agenda', 'political')
    res.setHeader('anything', 'goes')
    res.setHeader('Content-Type','application/json')
    res.setHeader('some-single-header', 'some-single-value'),
    res.setHeader('Content-Type','application/json')
    
    let obj = {
        href:`http://${HOST}:${PORT}${url}`,
        url,
        method,
        host:`${HOST}:${PORT}`,
        protocol:req.protocol, // On Working
        httpVersion: httpVersion,
        pathName: urlHelper.parse(url,true).pathname,
        queryString:urlHelper.parse(urlHelper.parse(url,true).search,true).query,
        user_agent:headers['user-agent'],
        connection:headers.connection
    }

    res.end(JSON.stringify(obj));

    log.magenta(req.method,req.url);
});

//have the server listen to a given port
server.listen(PORT,HOST, err => {
    if(err) log.error(err);
    else log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
