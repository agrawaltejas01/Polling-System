const data = require('../data/index');

async function getPoll(pollId) {
  return await data.getPoll(pollId);
}

async function getOptions(pollId) {
  return await data.getOptions(pollId);
}

module.exports = {
  getPoll: async (pollId) => await getPoll(pollId),
  getOptions: async (pollId) => await getOptions(pollId),
  addPoll: async (userId, question, startsAt, duration) => {
    const startsAtEpoch = new Date(startsAt).getTime() / 1000.0;
    const dbResult = await data.addPoll(userId, question, startsAtEpoch, duration);
    return {
      pollId: dbResult.insertId,
      userId,
      question,
      startsAt,
      duration,
    };
  },

  addOption: async (pollId, options) => {
    const result = [];
    for (var option of options) {
      const dbResult = await data.addOption(pollId, option);
      var addOptionResult = {
        optionId: dbResult.insertId,
        optionText: option,
        pollId: pollId,
      };
      result.push(addOptionResult);
    }
    return result;
  },

  addResponse: async (userId, pollId, optionId) => {
    // Check for startsAt and duration
    var pollData = await getPoll(pollId);
    pollData = pollData[0];
    const currentTime = new Date().getTime() / 1000.0;
    if (currentTime < pollData.startsAt)
      throw new Error(`Poll Starts at ${new Date(pollData.startsAt).toLocaleString()}`);
    if (currentTime > pollData.startsAt + pollData.duration)
      throw new Error(`Poll has ended at ${new Date(pollData.startsAt + pollData.duration).toLocaleString()}`);

    // Check if option is valid
    var options = await getOptions(pollId);
    var chosenOption = options.filter((option) => option.optionId === optionId);
    if (!chosenOption.length) throw new Error(`Chosen Option not a valid option for this poll`);

    const dbResult = await data.addResponse(userId, pollId, optionId);
    return {
      responseId: dbResult.insertId,
      pollId,
      userId,
      optionId,
    };
  },

  incrementVoteInOptions: async (optionId) => data.incrementVoteInOptions(optionId),

  getPollResults : async(pollId) => {

    // Check for startsAt and duration
    var pollData = await getPoll(pollId);
    pollData = pollData[0];
    const currentTime = new Date().getTime() / 1000.0;
    if (currentTime < pollData.startsAt + pollData.duration)
      throw new Error(`Poll ends at ${new Date(pollData.startsAt + pollData.duration).toLocaleString()}`);

    const options = await getOptions(pollId);
    const winner = options.reduce((prev, curr) => prev.votes > curr.votes ? prev : curr );
    return winner;
  }
};
