import { createServer } from 'node:http';
import { json } from 'node:stream/consumers';
import { randomUUID } from 'node:crypto';

process.loadEnvFile();
const port = process.env.PORT || 3000;

const sentJSON = (res, code, data) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.writeHead(code);
    res.end(JSON.stringify(data));
}

const users = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
            { id: 4, name: 'Diana' },
            { id: 5, name: 'Eduardo' },
            { id: 6, name: 'Fiona' },
            { id: 7, name: 'Gabriel' },
            { id: 8, name: 'Helena' }
        ]

const server = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    console.log(`Received request: ${req.method} ${req.url}`);

    const { method, url} = req;
    const [pathname, queryString] = url.split('?');
    const searchParams = new URLSearchParams(queryString);

    if (method === 'GET') {
        if (pathname === '/') {
            return sentJSON(res, 200, { message: 'Hello, World!' });
        }

        if (pathname === '/health') {
            return sentJSON(res, 200, { status: 'OK' });
        }

        if (pathname === '/users') {
            const rawLimit = searchParams.get('limit');
            const rawOffset = searchParams.get('offset');
            const hasPagination = rawLimit !== null || rawOffset !== null;

            if (!hasPagination) {
                return sentJSON(res, 200, users);
            }

            const limit = rawLimit === null ? users.length : Number.parseInt(rawLimit, 10);
            const offset = rawOffset === null ? 0 : Number.parseInt(rawOffset, 10);

            if (!Number.isInteger(limit) || !Number.isInteger(offset) || limit < 0 || offset < 0) {
                return sentJSON(res, 400, { error: 'Invalid query parameters' });
            }

            const paginatedUsers = users.slice(offset, offset + limit);
            return sentJSON(res, 200, paginatedUsers);
        }
    }

    if (method === 'POST') {
        if(pathname === '/users') {
            const body = await json(req);
            console.log(body);
            if(!body || !body.name){
                return sentJSON(res, 400, { error: 'Invalid request body' });
            }

            const newUser = {
                id: randomUUID(),
                name: body.name
            };
            users.push(newUser);
            return sentJSON(res, 200, { message: 'User created successfully' });
        }
    }
    
    //res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    //res.end('Not Found');
    return sentJSON(res, 404, { error: 'Not Found' });
});

server.listen(port, () => {
    //const address = server.address();
    //console.log(`Server is listening on port http://localhost:${address.port}`);
    console.log(`Server is listening on port http://localhost:${port}`);
});