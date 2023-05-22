
 

const router = require('express').Router();
const withAuth = require('../../utils/auth.js');
const { Article } = require('../../models');
// router.get('/', async (req, res) => {
//     try {
//         const articlesData = await Articles.findAll();
//         res.status(200).json(articlesData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        const articleData = await Article.findByPk(req.params.id);
        res.status(200).json(articleData);
    } catch (err) {
        console.log(err);   
        res.status(500).json(err);
    }
} );


// router.post('/', withAuth, async (req, res) => {
//     try {
//         const newArticle = await Articles.create({
//             title: req.body.title,
//             user_id: req.session.user_id,
//         });
//         res.status(200).json(newArticle);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });


router.post('/', withAuth, async (req, res) => {
        try {
            const articleData = await Article.create({
                ...req.body,
                // author: req.session.name,
                user_id: req.session.user_id
            });
            console.log(articleData)
            const article = articleData.get({ plain: true });
            console.log(article);
            res.redirect('/dashboard');
            // res.status(200).json(article);
        } catch (err) {
            res.status(400).json(err);
        }   
    });


router.put('/:id', withAuth, async (req, res) => {  
    // if the user is the author of the article, then they can update it
    //try {   
        console.log(req.params.id)
        const articleData = await Article.update(req.body, {
            where: {    
            id: req.params.id,
            },
        }); 
        console.log(articleData, "articleData on PUT route is hitting")
        if (!articleData[0]) {
            res.status(404).json({ message: 'No articles with this id!' });
            return;
        }       
        res.status(200).json(articleData);
    // } catch (err) {
    //     res.status(500).json(err);
    // } 
});










router.delete('/:id', withAuth, async (req, res) => {
    try {
        const articleData = await Article.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        console.log(articleData, "article data on delete route is hitting")
        if (!articleData) {
            res.status(404).json({ message: 'No articles with this id!' });
            return;
        }
        res.status(200).json(articleData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;