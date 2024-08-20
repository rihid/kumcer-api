import { Hono } from "hono";
import { db } from "../db";
import { posts } from "../schema";
import { sql } from "drizzle-orm";

const app = new Hono()
// get all cerpen posts
app.get('/', async(c) => {
  const postData = await db.select().from(posts);
  return c.json({
    data: postData,
    ok: true,
  })
})
// get sigle cerpen post by id
app.get('/:id', async(c) => {
  const id = parseInt(c.req.param('id'))
  const postData = await db.select().from(posts).where(sql`${posts.id} = ${id}`).limit(1);

  if (postData) {
    return c.json({
      data: postData,
      ok: true,
    })
  } else {
    return c.json({
      message: 'Post not found',
      ok: false,
    }, 404)
  }
})
// post cerpen
app.post('/', async (c) => {
  const data = await c.req.json();
  const post = await db.insert(posts).values(data);
  
  return c.json({
    data: post[0],
    ok: true,
  }, 201);
});
// Update cerpen by id
app.patch('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const newPost = await c.req.json();

  const updatedPost = await db.update(posts).set(newPost).where(sql`${posts.id} = ${id}`);

  if (updatedPost.length > 0) {
    return c.json({
      data: updatedPost[0],
      ok: true,
    });
  } else {
    return c.json({
      message: 'Post not found',
      ok: false,
    }, 404);
  }
});
// delete cerpen by id
app.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));

  const deletedPost = await db.delete(posts).where(sql`${posts.id} = ${id}`);

  if (deletedPost.length > 0) {
    return c.json({
      message: 'Cerpen Deleted!',
      data: deletedPost[0],
      ok: true,
    });
  } else {
    return c.json({
      message: 'Cerpen not found',
      ok: false,
    }, 404);
  }
});

export default app;