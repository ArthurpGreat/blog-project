import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 4000;
const blog = [];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index.ejs", { blog: blog })
})

// app.get("/edit/", (req, res) => {
//     res.render("edit.ejs")
// })

app.post("/submit", (req, res) => {
    const title1 = req.body["title"];
    const body = req.body["text"];

    const index = blog.length;
    blog.push({title1, body})
    console.log(blog)
    res.redirect("/");
})

app.get('/edit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= blog.length) {
        res.status(404).send('post not found');
        return;
    }
    const article = blog[index];
    console.log(article)
    res.render('edit.ejs', { article: article, index: index });
});

// code to update the edit page
app.post("/update/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= blog.length) {
        res.status(404).send('Article not found');
        return;
    }

    const title = req.body["title"];
    const body = req.body["text"];

    
    blog[index].title1 = title;
    blog[index].body = body;
    res.redirect("/");
});

app.get('/delete/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < blog.length) {
        blog.splice(index, 1); // Remove the blog post at the specified index
        res.redirect('/'); // Redirect back to the home page or wherever you wish
    } else {
        res.status(404).send('Blog post not found');
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});