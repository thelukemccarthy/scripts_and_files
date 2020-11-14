# Setup Customisation
1. Open firefox
1. Install Tree Style Tab https://addons.mozilla.org/en-US/firefox/addon/tree-style-tab/?src=search
1. Navigate to about:config
1. Click on the button 'Accept the Risk and Continue'
1. Search for 'toolkit.legacyUserProfileCustomizations.stylesheets'
1. Set the value of 'toolkit.legacyUserProfileCustomizations.stylesheets' to true
1. Navigate to about:profiles
1. Navigate to the 'Root Directory' of 'Profile: default-release'
1. Create a directory called 'chrome'
1. Copy 'userChrome-[mac|linux].css' into the 'chrome' directory just created
1. Rename the 'userChrome-[mac|linux].css' to 'userChrome.css''

# Debuging
1. Open dev tools
1. Click on the ... menu on the right-hand side
1. Click on 'Settings'
1. Under 'Advanced Settings' select the following options
    * Enable browser chrome and add-on debugging toolboxes
    * Enable remote debugging
1. Restart the browser
1. Once the browser restarts a separate dev tools window should open that allow you to select the Firefox window elements to see the id and class names etc
