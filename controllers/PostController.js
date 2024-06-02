import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to create post",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to get posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      }
    );

    const post = await PostModel.findOne({ _id: postId }).populate("user");
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to get post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndDelete({ _id: postId });
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to delete post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to update post",
    });
  }
};
