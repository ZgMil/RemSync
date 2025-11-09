// Office.initialize is called when the add-in is loaded
Office.initialize = function () {};

// Function to show the taskpane
function action(event) {
    Office.addin.showAsTaskpane()
        .then(function() {
            // Handle success
            event.completed();
        })
        .catch(function(error) {
            // Handle error
            console.error('Error showing taskpane:', error);
            event.completed();
        });
}

// Map function name to implementation
Office.actions.associate("ShowTaskpane", action);