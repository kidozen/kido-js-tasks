/****************************
*
* Model
*
*****************************/

/************************
*
* Access kidozen services through a Kido instance.
*
*************************/

var Model = function () {

    /** private variables **/
    var kido = new Kido(),
        tasksSet  = kido.storage().objectSet("tasks"),
        logging   = kido.logging(),
        config    = kido.config();

    return {

        getTask: function ( _id ) {
            return tasksSet.get(_id);
        },

        queryTasks: function ( filter ) {
            return tasksSet.query(filter);
        },

        insertTask: function ( title, desc ) {

            var t = { title: title, desc: desc, completed: false };
            
            return tasksSet
                    .insert( t )
                    .done(function () {
                        logging.writeInfo("new task '" + title + "' has been created.");
                    })
                    .fail(function ( err ) {
                        logging.writeError("an error occured trying to insert a task: " + JSON.stringify(err, 0, 2));
                    });
        },

        completeTask: function( _id ) {

            //for updating an object in kidozen, the _metadata must be sent,
            //and the sync property must match the version on the server (
            //for concurrency check).

            return tasksSet
                .get(_id).pipe(function( task ) {

                    task.completed = true; //complete the task.
                    return tasksSet.update(task);
                })
                .done(function ( t ) {
                    logging.writeInfo("task '" + t.title + "' has been completed.");
                })
                .fail(function () {
                    logging.writeError("an error occured trying to complete a task: " + JSON.stringify(err, 0, 2));
                });
        },

        deleteTask: function ( _id ) {
            return tasksSet
                .del(_id)
                .done(function ( ) {
                    logging.writeInfo("task '" + _id + " has been deleted.");
                })
                .fail(function() {
                    logging.writeError("an error occured trying to delete task " + _id);
                });
        },

        getLogs: function ( ) {
            return logging.get();
        }
    };
    
};