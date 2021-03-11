/* eslint-disable object-curly-newline */
const service = require('../service/index');
const util = require('../../utils/utils');

module.exports = {
  getPoll: async (req, res) => {
    const { pollId } = req.params;
    try {
      const pollResult = await service.getPoll(pollId);
      console.log(`Poll Data for pollId ${pollId} is \n${JSON.stringify(pollResult)}`);
      const optionResult = await service.getOptions(pollId);
      console.log(`Poll Data for pollId ${pollId} is \n${JSON.stringify(optionResult)}`);
      res.status(200).json(util.createRes(true, null, [pollResult, optionResult]));
    } catch (error) {
      console.error(error);
      res.status(400).json(util.createRes(false, error.message));
    }
  },

  addPoll: async (req, res) => {
    const { userId, question, startsAt = new Date(), duration = 60, options } = req.body;
    try {
      const addPollResult = await service.addPoll(userId, question, startsAt, duration);
      console.log(`Poll created successfully: \n${JSON.stringify(addPollResult)}`);
      const addOptionResult = await service.addOption(addPollResult.pollId, options);
      console.log(`Options Added successfully: \n${JSON.stringify(addOptionResult)}`);
      res.status(200).json(util.createRes(true, null, [addPollResult, addOptionResult]));
    } catch (error) {
      console.error(error);
      res.status(400).json(util.createRes(false, error.message));
    }
  },

  vote: async (req, res) => {
    const { userId, pollId, optionId } = req.body;
    try {
      const voteResult = await service.addResponse(userId, pollId, optionId);      
      const incrementVoteInOptionsResult = await service.incrementVoteInOptions(optionId);

      if(voteResult && incrementVoteInOptionsResult);
      const response = `User : ${userId} PollId : ${pollId} OptionId: ${optionId} Vote Registered successfully`
      console.log(response);
      res.status(200).json(util.createRes(true, null, [response]));

    } catch (error) {
      console.error(error);
      res.status(400).json(util.createRes(false, error.message));
    }
  },

  result: async (req, res) => {
    const { pollId } = req.params;
    try {
      const result = await service.getPollResults(pollId);
      console.log(`Results for poll are ${JSON.stringify(result)}`);
      res.status(200).json(util.createRes(true, null, result));
    } catch (error) {
      console.error(error);
      res.status(400).json(util.createRes(false, error.message));
    }
  }
};
