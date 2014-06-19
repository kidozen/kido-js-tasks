##Kidozen Tasks Management sample application

The purpose of this app is show how you might create an application using
jQuery Mobile and KidoZen side by side.

For information on Kidozen, please visit: [http://kidozen.com](http://kidozen.com)

#Summary

This sample app shows how a simple task management system that could be built
using the backend services provided by kidozen to provide with a skeleton for
developers to add as much funcionality and test the backend services in a
real world scenario.

#Description

The idea behind the sample is to keep the teams tasks centralized, and be
able to comunnicate the progress of the tasks to the rest of team in a mobile
friendly fashion.

- User can create tasks.
- The home screen displays a list of tasks.
- Tasks can be filtered by pending/completed status.
- When the user taps on a task, it will show the task details wher user can:
   * mark as complete
   * delete
   * send task by email (pending)
- The home contains a link to the Feed of activities which are application logs

#Code Structure

We have chosen to use MVC, a pattern that keeps the code from the UI separated
from the code of the Domain Model.
Sections:

- Event handlers (app.js): routes the events to the right controller.
- Controllers (controller.js): in charge of calling the model and rendering the right view.
- Views (view.js): render the information in the HTML though dinamic DOM manipulation.
- Model (model.js): Access to the backend services and domain specific logic.

#Running the app locally

In order to run the app locally, you need to have a KidoZen account, and have
the `kido` client tool installed (see the [docs](http://docs.kidozen.com/sdks/javascript/)
for more information).

# Important

jQuery version must be 1.7+