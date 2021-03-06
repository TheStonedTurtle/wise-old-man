const express = require('express');
const controller = require('./group.controller');

const api = express.Router();

api.get('/', controller.listGroups);
api.post('/', controller.createGroup);

api.put('/:id', controller.editGroup);
api.delete('/:id', controller.deleteGroup);
api.post('/:id/add', controller.addMembers);
api.post('/:id/remove', controller.removeMembers);
api.put('/:id/roles', controller.changeRole);
api.post('/:id/update-all', controller.updateAllMembers);

api.get('/:id', controller.viewGroup);
api.get('/:id/monthly-top', controller.monthlyTop);
api.get('/:id/deltas', controller.deltas);
api.get('/:id/achievements', controller.achievements);
api.get('/:id/records', controller.records);
api.get('/:id/hiscores', controller.hiscores);
api.get('/:id/statistics', controller.statistics);
api.get('/:id/members', controller.listMembers);

module.exports = api;
