/****************************
*
* Views (DOM Manipulation)
*
*****************************/

var View = function ($) {

    return {

        showTasksLoadingView: function ( tab ) {

            $.mobile.changePage("/");

            $("#tasks-filter > li > a").removeClass("ui-btn-active");
            //activate the right tab.
            $("#tasks-filter > li > a#" + tab + "-tasks").addClass("ui-btn-active");
            //clean the tasks list and indicate loading.
            $("#tasks-list").html('<li>Loading...</li>');
            $("#tasks-list").listview("refresh").trigger("create");
        },

        showTasksEmptyView: function () {
            $("#tasks-list").html('<li>No tasks yet</li>');
            //refresh the UI
            $("#tasks-list").listview("refresh").trigger("create");
        },

        showTasksListView: function ( tasks ) {
            //clean the tasks list
            $("#tasks-list").html('');
            
            $.each(tasks, function ( index, task ) {
                $("#tasks-list").append(
                    '<li>' +
                        '<a data-id="' + task._id + '" href="#">' +
                            task.title +
                        '</a>' +
                    '</li>'
                );
            });
            //refresh the UI
            $("#tasks-list").listview("refresh").trigger("create");
        },

        showTasksErrorView: function ( err ) {

            $("#tasks-list").html('<li>An error occured while querying the tasks</li>');

            //refresh the UI
            $("#tasks-list").listview("refresh").trigger("create");
        },

        showTaskDetailsPage: function () {
            $.mobile.changePage("#details");
            //get the form ready.
            $("#details div[data-role=header] h1").html('loading...');
            $("#details pre").html('');
        },

        showTaskDetails: function  ( task ) {
            $("#details div[data-role=header] h1").html( task.title );
            $("#details #task-id").val( task._id );
            $("#details pre").html( task.desc );
        },

        showLogs: function  ( logs ) {

            $.each(logs, function ( index, l ) {
                $("#logs").append(
                    '<li>' +
                        l.userName + ': ' + l.data + ' at ' + l.dateTime +
                    '</li>'
                );
            });
            //refresh the UI
            $("#logs").listview("refresh").trigger("create");
        }
    };
}