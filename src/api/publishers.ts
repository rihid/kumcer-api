import { Hono } from "hono";
import { db } from "../db";
import { publishers } from "../schema";
import { sql } from "drizzle-orm";

const app = new Hono()

app.get('/', async(c) => {
  const data = await db.select().from(publishers);
  return c.json({
    data: data,
    ok: true,
  })
})
// get sigle publisher by id
app.get('/:id', async(c) => {
  const id = parseInt(c.req.param('id'))
  const data = await db.select().from(publishers).where(sql`${publishers.id} = ${id}`).limit(1);

  if (data) {
    return c.json({
      data: data,
      ok: true,
    })
  } else {
    return c.json({
      message: 'Data not found',
      ok: false,
    }, 404)
  }
})
// post author
app.post('/', async (c) => {
  const data = await c.req.json();
  const publisher = await db.insert(publishers).values(data);
  
  return c.json({
    data: publisher[0],
    ok: true,
  }, 201);
});
// Update author by id
app.patch('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const newData = await c.req.json();

  const updatedData = await db.update(publishers).set(newData).where(sql`${publishers.id} = ${id}`);

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

  const deletedData = await db.delete(publishers).where(sql`${publishers.id} = ${id}`);

  if (deletedData.length > 0) {
    return c.json({
      message: 'Publisher Deleted!',
      data: deletedData[0],
      ok: true,
    });
  } else {
    return c.json({
      message: 'Publisher not found',
      ok: false,
    }, 404);
  }
});

export default app;