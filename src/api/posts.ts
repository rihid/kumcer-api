import { Hono } from "hono";

const app = new Hono()

interface Post {
  id: number,
  title: string,
  // TODO: Can make use of JSX here since Hono support JSX directly.
  // Just need to import React.Element as the type.
  body: string,
  author: string,
  tags: string[]
}

let posts: Post[] = [
  {
    id: 1,
    title: "Dodolit-dodolit-dodolibret",
    body: "<blockquote>Kiplik sungguh mengerti, betapapun semua itu tentunya hanya dongeng.</blockquote><p>“Mana ada orang bisa berjalan di atas air,” pikirnya.</p><p><br></p><p>Namun, ia memang berpendapat bahwa jika seseorang ingin membaca doa, maka ia harus belajar membaca doa secara benar.</p><p><br></p><p>”Bagaimana mungkin doanya sampai jika kata-katanya salah,” pikir Kiplik, ”karena jika kata-katanya salah, tentu maknanya berbeda, bahkan jangan-jangan bertentangan. Bukankah buku&nbsp;<em>Cara Berdoa yang Benar</em>&nbsp;memang dijual di mana-mana?”</p>",
    author: "Seno Gumira Ajidharma",
    tags: []
  },
  {
    id: 2,
    title: "Laki-laki Pemanggul Goni",
    body: "<blockquote>Setiap kali akan sembahyang, sebelum sempat menggelar sajadah untuk sembahyang, Karmain selalu ditarik oleh kekuatan luar biasa besar untuk mendekati jendela, membuka sedikit kordennya, dan mengintip ke bawah, ke jalan besar, dari apartemennya di lantai sembilan, untuk menyaksikan laki-laki pemanggul goni menembakkan matanya ke arah matanya.</blockquote><p>Tidak tergantung apakah fajar, tengah hari, sore, senja, malam, ataupun selepas tengah malam, mata laki-laki pemanggul goni selalu menyala-nyala bagaikan mata kucing di malam hari, dan selalu memancarkan hasrat besar untuk menghancurkan.</p>",
    author: "Danarto",
    tags: []
  }
]

// get all cerpen posts
app.get('/', (c) => {
  return c.json({
    data: posts,
    ok: true,
  })
})
// get sigle cerpen post by id
app.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const post = posts.find((p) => p.id === id)

  if (post) {
    return c.json({
      data: post,
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
// TODO: When implementing REST API, we don't need to have method as endpoint.
// POST /posts is sufficient compared to POST /posts/new
app.post('/', async(c) => {
  const post: Post = await c.req.json()

  post.id = posts.length + 1;
  posts.push(post);

  return c.json({
    data: post,
    ok: true,
  }, 201)
})
// Update cerpen by id
app.patch('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const updatedPost: Post = await c.req.json();
  const index = posts.findIndex((p) => p.id === id);

  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedPost, id };
    return c.json({
      data: posts[index],
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
app.delete('/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const post = posts.find( p => p.id === id);

  if(post) {
    const updatedPosts = posts.filter( p => p.id !== id);
    posts = [...updatedPosts]
    return c.json({
      message: 'Cerpen Deleted!',
      data: [],
      ok: true,
    })
  } else {
    return c.json({
      message: 'Cerpen not found',
      ok: false,
    }, 404)
  }
})

export default app;