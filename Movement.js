/**
 * Created by Chris on 11/24/2016.
 */


module.exports ={

    run:function(creep, dest){


        if(dest) {
            creep.moveTo(creep.moveTo(dest));
        }
        else{
            creep.moveTo(Game.spawns.Spawn1);
        }

    }


};