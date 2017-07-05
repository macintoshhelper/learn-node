const test = require('tape');
const shot = require('shot');
const router = require('./router');

test('Home route status', (t) => {
  shot.inject(router, {
    method: 'get',
    url: '/',
  }, (res) => {
    t.equal(res.statusCode, 200, 'Should return with status code 200');
    t.equal(res.payload, 'Hello world.', 'Should respond with \'Hello world.\'');
    t.equal(res.headers['content-type'], 'text/plain', 'Content type should be text/plain');
    // t.end();
  });
  shot.inject(router, {
    method: 'post',
    headers: {
      'content-type': 'text/plain',
    },
    url: '/',
    payload: 'body text',
  }, (res) => {
    t.equal(res.statusCode, 200, 'Should return with status code 200');
    t.equal(res.payload, 'Hello world.', 'Should respond with \'Hello world.\'');
    t.equal(res.headers['content-type'], 'text/plain', 'Content type should be text/plain');
    t.end();
  });
});
