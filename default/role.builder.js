/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {

    /** @param {Creep} creep **/
    run: (creep) => {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.memory.maintaining = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            if(Math.random()) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }else{
                creep.memory.maintaining = true;
                creep.say('🚧 maintain');
            }
        }

        if(creep.memory.building) {
            //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            /*if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }*/
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(typeof target !== 'null') {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.memory.building = false;
                return;
            }
        }else if(creep.memory.maintain) {
            //var targets = spawn.pos.find(FIND_STRUCTURES, {
            var targets = creep.room.find(FIND_STRUCTURES, {
            //var target = spawn.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {return (
                    structure.structureType == STRUCTURE_ROAD /*||
                    structure.structureType == STRUCTURE_WALL ||
                    structure.structureType == STRUCTURE_TOWER*/) &&
                    structure.store.hits < structure.store.hitsMax;
            }});
            if(targets.length > 0) {
                if(creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(
                        targets[0],
                        {visualizePathStyle: {stroke: '#ffffff'}},
                        {maxRooms: 1}
                    );
                }
            } else {
                creep.memory.maintain = false;
                return;
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder; //{};
