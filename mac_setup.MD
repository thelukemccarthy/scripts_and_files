# Setting up a new Mac

1. Install brew (https://brew.sh/)
    1. `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
1. Install git
    1. `brew install git`
1. Setup the global settings for git  
    1. `git config --global user.name "Luke McCarthy"`  
1. Generate a new ssh key for each git user  
    1. **NB: NEVER reuse a password for any key generated** not only is this more secure, it also ensures you never commit to the wrong repo  
    1. Run the command `ssh-keygen -t rsa -C <EMAIL_ADDRESS>`  
    1. Name the files with <serviceName-accountName> for example `github-thelukemccarthy`  
    1. Setup git to use the new keys  
    While these setting can be added in the `~/.gitconfig` file I found it didn't work for me. So I added them to separate files to get the different keys to work.  
        1. create two files  
            1. `touch ~/.gitconfig-thelukemccarthy`
            1. `touch ~/.gitconfig-CLIENT_NAME`  
        1. Add the following to `~/.gitconfig-thelukemccarthy`
            ```
              [user]
                Name="Luke McCarthy"
              [core]
                sshCommand="ssh -i ~/.ssh/github_thelukemccarthy"
            ```
        1. Add the following to `~/.gitconfig-<CLIENT_NAME>`  
            ```
              [user]
                name="Luke McCarthy"
                email="<CLIENT_EMAIL_ADDRESS>"
              [core]
                sshCommand="ssh -i ~/.ssh/<SSH_KEY_FOR_CLIENT_WORK>"
            ```   
        1. Add the following to the ```~/.gitconfig``` file  
            ```  
              [includeif "gitdir:~/scripts_and_files/"]  
                path = ~/.gitconfig-thelukemccarthy  
        [includeif "gitdir:~/Library/Application Support/JetBrains/IntelliJIdea2021.1/settingsRepository/"]
	        path = ~/.gitconfig-thelukemccarthy
              [includeif "gitdir:<PATH_TO_SRC_CODE_DIR>"]  
                path = ~/.gitconfig-<CLIENT_NAME>  
            ```  
      1. NB an alternative is to use a .ssh/config file to force work to use a key for a domain. This really only works if you have sub-domains  
          1. Run the following command to create a config file for ssh ```touch ~/.ssh/config```  
          1. Edit the config file to add the domain to use it for, for example  
            ```
              Host bitbucket.org
              Hostname bitbucket.org
              User git
              IdentityFile ~/.ssh/bitbucket_mac
            ```
1. Download and install Kdiff3 from source forge http://kdiff3.sourceforge.net
    1. When opening Kdiff3, if you get the error message "Kdiff3 Cannot Be Opened Because the Developer Cannot be Verified"
        1. Open 'System Preferences' for the Mac
        1. Click on 'Security & Privacy'
        1. At the bottom of the 'General' tab you should be able to allow Kdiff3 to open
    1. Setup git to kdiff3 it  
		`git config --global merge.tool kdiff3`  
		`git config --global mergetool.kdiff3.cmd '/Applications/kdiff3.app/Contents/MacOS/kdiff3 $BASE $LOCAL $REMOTE -o $MERGED'`  
		`git config --global mergetool.kdiff3.trustExitCode false`  
		  
		`git config --global diff.guitool kdiff3`  
		`git config --global difftool.kdiff3.cmd '/Applications/kdiff3.app/Contents/MacOS/kdiff3 $BASE $LOCAL $REMOTE -o $MERGED'`  
		`git config --global difftool.kdiff3.trustExitCode false`  
1. Clone terminal scripts and files
    1. `git clone https://github.com/thelukemccarthy/scripts_and_files.git`
    1. Update `~/.zshrc` to have source `~/scripts_and_files/alias`
6. Install and setup ‘Informative git prompt for zsh’ (https://github.com/olivierverdier/zsh-git-prompt) 
    1. `git clone https://github.com/olivierverdier/zsh-git-prompt.git`
    1. Update `~/.zshrc` to have 
        ```
          source ~/zsh-git-prompt/zshrc.sh
          PROMPT='%B%m%~%b$(git_super_status) %# '
        ```
1. Install NVM 
    1. `brew install nvm`
    1. Add the following to `~/.zshrc` after nvm to automatically change node versions if a .nvmrc file exists
        ```
          shell script 
          autoload -U add-zsh-hook
          load-nvmrc() {
            local node_version="$(nvm version)"
            local nvmrc_path="$(nvm_find_nvmrc)"
          
            if [ -n "$nvmrc_path" ]; then
              local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
          
              if [ "$nvmrc_node_version" = "N/A" ]; then
                nvm install
              elif [ "$nvmrc_node_version" != "$node_version" ]; then
                nvm use
              fi
            elif [ "$node_version" != "$(nvm version default)" ]; then
              echo "Reverting to nvm default version"
              nvm use default
            fi
          }
          add-zsh-hook chpwd load-nvmrc
          load-nvmrc
        ```
1. Install yarn `brew install yarn`
1. Download and Install VS Code <https://code.visualstudio.com/docs/?dv=osx>
1. Install the following plugin for VS Code 
    1. Live Share
    1. Rainbow brackets
    1. Indent-rainbow
    1. IntelliJ IDEA Keybindings
1. Download and install IntelliJ
    1. Turn off conflicting Mac OSX keyboard shortcuts
        1. Open ‘System Preferences’
        1. Open ‘Keyboard’
        1. Go to  ‘Shortcuts’
        1. Click on ‘Services’
        1. Find ‘Text’
        1. Disable ‘Search man Page Index in Terminal’
        1. Disable ‘Open man Page in Terminal’
    1. Install the following plugins
        1. File Watchers
        1. Indent Rainbow
        1. Night Owl Theme
        1. Prettier
        1. Rainbow Brackets
        1. Docker
1. Download and install Virtualbox
1. Download and setup Win10 for IE test <https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/>
    1. The password for the VM is Passw0rd!
1. Download and install Docker Desktop from https://www.docker.com/products/docker-desktop
