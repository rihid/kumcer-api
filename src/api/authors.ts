import { Hono } from "hono";
import { db } from "../db";
import { authors } from "../schema";
import { sql } from "drizzle-orm";

const app = new Hono()

app.get('/', async(c) => {
  const data = await db.select().from(authors);
  return c.json({
    data: data,
    ok: true,
  })
})
// get sigle author by id
app.get('/:id', async(c) => {
  const id = parseInt(c.req.param('id'))
  const data = await db.select().from(authors).where(sql`${authors.id} = ${id}`).limit(1);

  if (data) {
    return c.json({
      data: data,
      ok: true,
    })
  } else {
    return c.json({
      message: 'Post not found',
      ok: false,
    }, 404)
  }
})
// post author
app.post('/', async (c) => {
  const data = await c.req.json();
  const author = await db.insert(authors).values(data);
  
  return c.json({
    data: author[0],
    ok: true,
  }, 201);
});
// Update author by id
app.patch('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const newData = await c.req.json();

  const updatedData = await db.update(authors).set(newData).where(sql`${authors.id} = ${id}`);

  if (updatedData.length > 0) {
    return c.json({
      data: updatedData[0],
      ok: true,
    });
  } else {
    return c.json({
      message: 'Data not found',
      ok: false,
    }, 404);
  }
});
// delete author by id
app.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));

  const deletedData = await db.delete(authors).where(sql`${authors.id} = ${id}`);

  if (deletedData.length > 0) {
    return c.json({
      message: 'Authror Deleted!',
      data: deletedData[0],
      ok: true,
    });
  } else {
    return c.json({
      message: 'Author not found',
      ok: false,
    }, 404);
  }
});

export default app;