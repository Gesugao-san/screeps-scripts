Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Harvester' + Game.time, {memory: {role: 'harvester'}});
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Upgrader' + Game.time, {memory: {role: 'upgrader'}});
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], 'Builder' + Game.time, {memory: {role: 'builder'}});
Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'HarvesterBig' + Game.time, {memory: { role: 'harvester'}});
Game.creeps['Harvester1'].suicide();
Game.spawns['Spawn1'].room.controller.activateSafeMode();
Game.spawns['Spawn1'].room.createConstructionSite(23, 22, STRUCTURE_TOWER);
Game.creeps['Harvester1'].moveTo(Game.creeps['Harvester1'].room.controller);
