"use strict";

const TutorialProgress = require("../../../models/tutorialProgress");

const deleteProgress = async (req, res) => {
  try {
    const { tutorialId } = req.params;
    const userId = req.user._id;

    await TutorialProgress.deleteOne({
      user: userId,
      tutorial: tutorialId,
    });

    return res.status(200).send({
      message: "Tutorial progress reset.",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteProgress,
};
