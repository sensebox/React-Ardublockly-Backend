const TutorialProgress = require("../../../models/tutorialProgress");

const getProgress = async (req, res) => {
  try {
    const { tutorialId } = req.params;
    const userId = req.user._id;

    const progress = await TutorialProgress.findOne({
      user: userId,
      tutorial: tutorialId,
    });

    return res.status(200).send({
      progress,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  getProgress,
};
