/****************************
*
* Controllers
*
* controller methods handle the interaction between the view and the models.
* it will execute the necessary model methods and then call the appropiate view
* to display the response.
*
*****************************/

var model = Model(),
    view  = View($);

/*
 * loadTasks - handles the loading of the tasks list. the list could be
 * filtered.
 * 
 * @param filter {string} one of the following values: pending, completed, all.
 */

function loadTasks ( filter ) {

    var query = {};

    if ( filter ) {
        query.completed = filter === "pending" ? false : true;
    }

    view.showTasksLoadingView(filter);

    model.queryTasks(query)
        .done(function ( tasks ) {
            
            //1. if tasks is empty, display message.
            if ( !tasks || !tasks.length ) {

                view.showTasksEmptyView();

            } else {
            
                //2. if tasks is not empty, display one <li> per task.
                view.showTasksListView(tasks);
            }
        })
        .fail(view.showTasksErrorView);
}


/**
 * insertTaskHandler - inserts a task and refreshes the list of tasks.
 *
 * @param title {string}
 * @param desc {string}
 */

function insertTaskHandler( title, desc ) {
    
    model.insertTask( title, desc )
        .done( function ( ) { loadTasks('pending'); })
        .fail( function ( err ) {
            alert( "there's been a problem inserting the task." );
            console.log( err );
        });
}


/**
 * loadTask - gets the task by id and show the details.
 * @param _id {string}
 */

function loadTask( _id ) {

    view.showTaskDetailsPage();

    model.getTask(_id).done(view.showTaskDetails).fail(function() {
        alert("There's been an problem loading the task");
    });
}


/**
 * completeTaskHandler - will complete the task and refresh the list of tasks.
 * @param _id {string}
 */

function completeTaskHandler( _id ) {
    model.completeTask(_id)
        .done(function () {
            loadTasks('pending');
        })
        .fail(function ( err ) {
            alert('unable to complete task');
            console.log(err);
        });
}


/**
 * deleteTaskHandler - will delete the task by id, and refresh the list of
 * tasks.
 * @param _id {string}
 */
function deleteTaskHandler ( _id ) {
    model.deleteTask(_id)
        .done(function () {
            loadTasks('pending');
        })
        .fail(function ( err ) {
            alert('unable to delete task');
            console.log(err);
        });
}


/**
 * loadLogs - will search for the latest log activity and display the list.
 */

function loadLogs() {

    //TODO: Show empty logs message.
    //TODO: Show error message in case of error.
    model.getLogs().done(view.showLogs);

}