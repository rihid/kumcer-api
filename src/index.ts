import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import posts from "./api/posts"
import authors from './api/authors';
import publishers from './api/publishers'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/posts', posts);
app.route('/authors', authors);
app.route('/publishers', publishers)

const port = 3000
console.log(`Server is running on port ${port}: http://localhost:3000`)

serve({
  fetch: app.fetch,
  port
})
