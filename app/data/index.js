const util = require('util');
const connections = require('../../connections');

const { db } = connections;
const query = util.promisify(db.query).bind(db);

module.exports = {
  getPoll: async (pollId) => {
    const getPollQuery = `select * from polls where pollId = ${pollId};`;
    console.log(`MySQL: ${getPollQuery}`);
    try {
      const data = await query(getPollQuery);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getOptions: async (pollId) => {
    const getOptionsQuery = `select * from options where pollId = ${pollId};`;
    console.log(`MySQL: ${getOptionsQuery}`);
    try {
      const data = await query(getOptionsQuery);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  addPoll: async (userId, question, startsAt, duration) => {
    const insertPollQuery = `insert into polls (userId, question, startsAt, duration) values (${userId}, "${question}", ${startsAt}, ${duration});`;
    console.log(`MySQL: ${insertPollQuery}`);

    try {
      const data = await query(insertPollQuery);
      return data;
    } catch (error) {
      console.log(`Error in inserting poll : ${error.message}`);
      throw error;
    }
  },

  addOption: async (pollId, option) => {
    const insertOption = `insert into options (optionText, pollId, votes) values ("${option}", ${pollId}, 0);`;
    console.log(`MySQL: ${insertOption}`);
    try {
      const data = await query(insertOption);
      return data;
    } catch (error) {
      console.log(`Error in inserting option : ${error.message}`);
      throw error;
    }
  },

  addResponse: async (userId, pollId, optionId) => {
    const addResponseQuery = `insert into responses (pollId, userId, optionId) values (${pollId}, ${userId}, ${optionId});`;
    console.log(`MySQL: ${addResponseQuery}`);
    try {
      const data = await query(addResponseQuery);
      return data;
    } catch (error) {
      console.log(`Error in inserting poll : ${error.message}`);
      throw error;
    }
  },

  incrementVoteInOptions: async (optionId) => {
    const incrementVoteInOptionsQuery = `update options set votes = votes + 1 where optionId = ${optionId}`;
    console.log(`MySQL: ${incrementVoteInOptionsQuery}`);
    try {
      await query(incrementVoteInOptionsQuery);
      return true;
    } catch (error) {
      console.log(`Error in inserting poll : ${error.message}`);
      throw error;
    }
  }
};
