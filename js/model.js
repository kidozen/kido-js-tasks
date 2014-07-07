var Model = function () {

    /** Private variables **/
    var kido = new Kido(),
        tasksSet = kido.storage().objectSet("tasks", { caching: true, queueing: true }),
        logging = kido.logging();

    return {

        getTask: function (_id) {
            return tasksSet.get(_id);
        },

        queryTasks: function (filter) {
            return tasksSet.query(filter);
        },

        insertTask: function (title, desc) {
            var task = { title: title, desc: desc, completed: false };
            return tasksSet.insert(task, false);
        },

        completeTask: function (_id) {
            return tasksSet.get(_id).then(function (task) {
                task.completed = true;
                return tasksSet.update(task);
            });
        },

        deleteTask: function (_id) {
            return tasksSet.del(_id);
        },

        dropTasks: function () {
            return tasksSet.drop();
        },

        getLogs: function () {
            return logging.get();
        }
    };

};