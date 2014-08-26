// function for opening the login modal when people attempt to leave the pages
function confirmExit() {

	openModalID('signin');
        
  return "If you leave this page your information will be lost.  Please click Cancel to save your information.";          //  your code here                


};

window.onbeforeunload = confirmExit;
