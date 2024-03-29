const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

// Connect DB
mongoose
    .connect(
        'mongodb+srv://emre:9Q3pgpT7axeoM1fO@cleanblog.vo4e8.mongodb.net/cleanblog-db?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('Db Connected!');
    })
    .catch((err) => {
        console.log(err);
    });
// This is a demo app , if you deploy a real application please hide your db password!!!

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

// Routes
app.get('/', postController.getAllPosts);
app.get('/post/:id', postController.getPost);
app.post('/add-post', postController.createPost);
app.put('/edit-post/:id', postController.updatePost);
app.delete('/edit-post/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add-post', pageController.getAddPage);
app.get('/edit-post/:id', pageController.getEditPage);

const port = process.env.PORT || 5000; // Use heroku port or use 5000
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});
