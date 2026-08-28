"use strict";

const Solution = require('../../models/solution');

const getSolution = async function(req, res) {
  try {
    const { groupId, solutionId } = req.params;
    const result = await Solution.findOne({ _id: solutionId, groupId })
      .populate('tutorialId', 'title')
      .lean();

    if (!result) {
      return res.status(404).send({ message: 'Solution not found.' });
    }

    const solution = {
      ...result,
      tutorialTitle: result.tutorialId && result.tutorialId.title ? result.tutorialId.title : null,
      tutorialId: result.tutorialId && result.tutorialId._id ? result.tutorialId._id : result.tutorialId,
    };

    return res.status(200).send({
      message: 'Solution found successfully.',
      solution,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  getSolution,
};
