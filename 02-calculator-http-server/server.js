import { createServer } from 'node:http';
import { json } from 'node:stream/consumers';

process.loadEnvFile();
const port = process.env.PORT || 3000;

const sentJSON = (res, code, data) => {
    res.writeHead(code);
    res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    console.log(`Received request: ${req.method} ${req.url}`);

    const { method, url} = req;

    if(method === 'GET' ){
        if(url === '/') {
            return sentJSON(res, 200, { message: 'Hello, World!' });
        }
        
        if(url === '/health') {
            return sentJSON(res, 200, { status: 'ok' });
        }
    }

    if(method === 'POST') {
        if(url === '/calculate') {
            let body;

            try {
                body = await json(req);
            } catch (error) {
                console.error('Invalid JSON body:', error.message);
                return sentJSON(res, 400, { message: 'Invalid JSON body' });
            }

            console.log(body);
            if(body.operation === 'add') {
                return sentJSON(res, 200, { result: body.a + body.b });
            }
            if(body.operation === 'subtract') {
                return sentJSON(res, 200, { result: body.a - body.b });
            }
            if(body.operation === 'multiply') {
                return sentJSON(res, 200, { result: body.a * body.b });
            }
            if(body.operation === 'divide') {
                if(body.b === 0) {
                    return sentJSON(res, 400, { message: 'Cannot divide by zero' });
                }
                return sentJSON(res, 200, { result: body.a / body.b });
            }
        }
    }
    

    return sentJSON(res, 404, { message: 'Not Found' });
})

server.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});