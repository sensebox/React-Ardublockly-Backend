const TutorialProgress = require("../../../models/tutorialProgress");

const getAllProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const progress = await TutorialProgress.find({ user: userId });

    return res.status(200).send({
      progress,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { getAllProgress };
