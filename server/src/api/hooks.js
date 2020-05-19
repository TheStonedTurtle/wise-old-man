const { Snapshot, Membership } = require('../database');
const jobs = require('./jobs');

function setup() {
  Snapshot.afterCreate(({ playerId }) => {
    jobs.add('SyncPlayerParticipations', { playerId });
    jobs.add('SyncPlayerAchievements', { playerId });
    jobs.add('SyncPlayerRecords', { playerId });
  });

  Snapshot.afterBulkCreate(snapshots => {
    if (!snapshots || !snapshots.length) {
      return;
    }

    const { playerId } = snapshots[0];

    jobs.add('SyncPlayerParticipations', { playerId });
    jobs.add('SyncPlayerRecords', { playerId });
    jobs.add('ReevaluatePlayerAchievements', { playerId });
  });

  Membership.afterBulkCreate(memberships => {
    if (!memberships || !memberships.length) {
      return;
    }

    const { groupId } = memberships[0];
    const playerIds = memberships.map(m => m.playerId);

    jobs.add('AddToGroupCompetitions', { groupId, playerIds });
  });

  Membership.afterBulkDestroy(info => {
    if (!info || !info.where) {
      return;
    }

    const { groupId, playerId } = info.where;
    jobs.add('RemoveFromGroupCompetitions', { groupId, playerIds: playerId });
  });
}

exports.setup = setup;
