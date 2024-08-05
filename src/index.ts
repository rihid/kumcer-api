import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import posts from "./api/posts"


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/posts', posts);

const port = 3030
console.log(`Server is running on port ${port}: `)

serve({
  fetch: app.fetch,
  port
})
