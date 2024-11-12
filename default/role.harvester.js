/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: (creep) => {
        var spawn = Game.spawns['Spawn1'];
        //let home = creep.room.controller;
        //let room = Game.spawns['Spawn1'];
        //var room = spawn.room;
        //var room = creep.pos.findClosestByPath(FIND_MY_SPAWNS).room;
        //creep.moveTo(home);
        //return;
        //if(creep.store.getFreeCapacity() != 0) {
        if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            //var sources = creep.room.find(FIND_SOURCES);
            var sources = room.find(FIND_SOURCES);
            var id = getRandomInt(sources.length);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.say('🔄 harvest');
                creep.moveTo(
                    sources[0],
                    {visualizePathStyle: {stroke: '#ffaa00'}},
                    {maxRooms: 1}
                );
            }
        }
        else {
            //var targets = creep.room.find(FIND_STRUCTURES, {
            var target = spawn.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {return (
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    /*structure.store[RESOURCE_ENERGY] < structure.store.getCapacity();*/
                }
            });
            if(target) { //if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('⚡ store');
                    creep.moveTo(
                        targets[0],
                        {visualizePathStyle: {stroke: '#ffffff'}},
                        {maxRooms: 1}
                    );
                }
            }
        }
    }
};

module.exports = roleHarvester; //{};
