// comments will need these routes
// post, delete, get by id, put

const withAuth = require("../../utils/auth");
const router = require("./articlesRoutes");

router.post('/', withAuth, async (req, res) => {
    try {
        constCommentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put ('/:id', withAuth, async (req, res) => {
    console.log("PUT request heard at /api/comments/:id")
    try {
        const commentData = await Comment.update({
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if(!commentData[0]) {
            res.status(404).json({ message: "no comment found" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
        console.log("error encountered")
    }
})


router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      });
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
