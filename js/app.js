/************************
 *
 * Event Handlers
 *
 * here we set up the listeners for events, we gather the information from the
 * DOM, and call the right controller.
 *
 *************************/

initApp();

function initApp() {

    // on page init (jquery mobile's version of on window load)
    $(document).delegate("#home", "pageinit", function () {

        // look for the tasks kidozen right away.
        loadTasks('pending');

        // register event handler for save button.
        $("#new-task").click(function () {
            var title = $("#title").val(),
                desc = $("#desc").val();
            insertTaskHandler(title, desc);
        });

        // register event handler for cancel button
        $("#cancel-new-task").click(function () {
            $("#task-title").val('');
            $("#task-desc").val('');
        });

        // register event handler for filters in the footer toolbar
        $("#pending-tasks").click(function () {
            loadTasks('pending');
        });

        $("#completed-tasks").click(function () {
            loadTasks('completed');
        });

        $("#all-tasks").click(function () {
            loadTasks();
        });

        // register event for tasks list item.
        $(document).delegate("#tasks-list li a", "click", function () {
            var _id = $(this).attr("data-id");
            if (!_id) {
                return;
            } //no task selected
            loadTask(_id);
        });

    });

    $(document).delegate("#details", "pageinit", function () {

        $("#complete-task").click(function () {
            var _id = $("#task-id").val();
            if (!_id) {
                alert("invalid task");
                return;
            }
            completeTaskHandler(_id);
        });

        $("#delete-task").click(function () {
            var _id = $("#task-id").val();
            if (!_id) {
                alert("invalid task");
                return;
            }
            deleteTaskHandler(_id);
        });

        $("#send-task").click(function () {
            alert('TODO: try sending this task by email to somebody');
        });

    });

    // register event for the Feed page that shows the logs.
    $(document).delegate("#feed", "pageshow", function () {

        loadLogs();

    });

}
