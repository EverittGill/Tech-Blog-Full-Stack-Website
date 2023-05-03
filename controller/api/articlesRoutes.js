
 

const router = require('express').Router();
const withAuth = require('../../utils/auth.js');
const { Articles } = require('../../models');
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
        const articlesData = await Articles.findByPk(req.params.id);
        res.status(200).json(articlesData);
    } catch (err) {
        res.status(500).json(err);
    }
} );


router.post('/', withAuth, async (req, res) => {
    try {
        const newArticle = await Articles.create({
            title: req.body.title,
            user_id: req.session.user_id,
        });
        res.status(200).json(newArticle);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {  
    // if the user is the author of the article, then they can update it
    try {   
        const articlesData = await Articles.update(req.body, {
            where: {    
                id: req.params.id,
            },
        }); 
        if (!articlesData) {
            res.status(404).json({ message: 'No articles with this id!' });
            return;
        }       
        res.status(200).json(articlesData);
    } catch (err) {
        res.status(500).json(err);
    } 
});










router.delete('/:id', async (req, res) => {
    try {
        const articlesData = await Articles.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!articlesData) {
            res.status(404).json({ message: 'No articles with this id!' });
            return;
        }
        res.status(200).json(articlesData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;