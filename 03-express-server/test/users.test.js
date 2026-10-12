import assert from 'node:assert/strict';
import { once } from 'node:events';
import { after, before, test } from 'node:test';

const originalNodeEnv = process.env.NODE_ENV;
process.env.NODE_ENV = 'production';
const { default: app } = await import('../app.js');
if (originalNodeEnv === undefined) {
  delete process.env.NODE_ENV;
} else {
  process.env.NODE_ENV = originalNodeEnv;
}

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve());
  });
});

test('user CRUD validates and enforces unique normalized emails', async () => {
  const initialUsers = await fetch(`${baseUrl}/users`).then(response => response.json());
  assert.equal(initialUsers.length, 3);
  assert.equal(initialUsers[0].email, 'alice@example.com');

  const missingEmail = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Dana', lastname: 'Jones', username: 'dana' })
  });
  assert.equal(missingEmail.status, 400);

  const duplicateEmail = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dana',
      lastname: 'Jones',
      username: 'dana',
      email: 'ALICE@EXAMPLE.COM'
    })
  });
  assert.equal(duplicateEmail.status, 409);

  const createdResponse = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dana',
      lastname: 'Jones',
      username: 'dana',
      email: '  DANA@EXAMPLE.COM '
    })
  });
  assert.equal(createdResponse.status, 201);
  const createdUser = await createdResponse.json();
  assert.equal(createdUser.email, 'dana@example.com');

  const duplicateUpdate = await fetch(`${baseUrl}/users/${createdUser.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'alice@example.com' })
  });
  assert.equal(duplicateUpdate.status, 409);

  const emailFilter = await fetch(`${baseUrl}/users?email=dana@example.com`).then(response => response.json());
  assert.deepEqual(emailFilter.map(user => user.id), [createdUser.id]);

  const replaceResponse = await fetch(`${baseUrl}/users/${createdUser.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dana',
      lastname: 'Jones',
      username: 'dana-j',
      email: 'dana.jones@example.com'
    })
  });
  assert.equal(replaceResponse.status, 200);
  assert.equal((await replaceResponse.json()).username, 'dana-j');
});
