var havester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var repairer = require('role.repairer');


module.exports.loop = function () {


    //#*#*#*#*#*#*#*#*#*#*
    // Creep Cleanup
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }


    //#*#*#*#*#*#*#*#*#*#*#*
    // Creep Work Order
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.role == 'harvester'){
                havester.run(creep);
            }
            else if(creep.memory.role == 'upgrader'){
                upgrader.run(creep);
            }
            else if(creep.memory.role == 'builder'){
                builder.run(creep);
            }
            else if(creep.memory.role == 'repairer'){
                repairer.run(creep);
            }
        }

    //#*#*#*#*#*#*#*#*#*#*#*
    // Creep Spawn
        var minHarvesters = 10;
        var minUpgraders = 1;
        var minBuilders = 5;
        var minRepairers = 2;
        var curHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var curUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var curBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var curRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
        var name = 'undefined';
        var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

        console.log('Harvesters = ' +curHarvesters + ', Upgraders = ' + curUpgraders + ', Builders = ' + curBuilders + ', Repairers = ' +curRepairers);

        if(curHarvesters < minHarvesters){
            name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
                { role: 'harvester', working: false});
        }
        else if (curUpgraders<minUpgraders){
            name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
                { role: 'upgrader', working: false});
        }
        else if (curBuilders<minBuilders){
            name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
                { role: 'builder', working: false});
        }
        else if (curRepairers<minRepairers){
            name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
                { role: 'repairer', working: false});
        }

};