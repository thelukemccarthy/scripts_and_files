# Setting up a new Mac

1. Install brew (https://brew.sh/)
    1. ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"```
2. Install git
    1. ```brew install git```
    1. Setup the global settings for git
      1. ```git config --global user.name "Luke McCarthy"```
      1. ```git config --global user.email <CLIENT_EMAIL_ADDRESS>```
3. Generate a new ssh key for each git user
    1. Run the command ```ssh-keygen -t rsa -C <EMAIL_ADDRESS>```
      1. Name the files with <serviceName-accountName> for example ```github-thelukemccarthy```
    1. Setup git to use the new keys
      1. Add the following to the ```~/.gitconfig``` file  
      ```
        [includeif "gitdir:<PATH_TO_SRC_CODE>"]
          [user]
            email="<CLIENT_EMAIL_ADDRESS>"
          [core]
            sshCommand="ssh -i ~/.ssh/<SSH_KEY_FOR_CLIENT_WORK>"
        [includeif "gitdir:<HOME_ABSOLUTE_PATH>/scripts_and_files/"]
          [user]
            email="<PERSONAL_EMAIL_ACCOUNT>"
          [core]
            sshCommand="ssh -i ~/.ssh/github_thelukemccarthy"
      ```  
    1. NB an alternative is to use a .ssh/config file to force work to use a key for a domain
      1. Run the following command to create a config file for ssh ```touch ~/.ssh/config```
      1. Edit the config file to add the domain to use it for, for example
		  ```Host bitbucket.org
			  Hostname bitbucket.org
			  User git
			  IdentityFile ~/.ssh/bitbucket_mac```
4. Install Kdiff3
    1. Setup git to use it
		```git config --global merge.tool kdiff3```
		```git config --global mergetool.kdiff3.cmd ‘/Applications/kdiff3.app/Contents/MacOS/kdiff3 $BASE $LOCAL $REMOTE -o $MERGED’```
		```git config --global mergetool.kdiff3.trustExitCode false```

		```git config --global diff.guitool kdiff3```
		```git config --global difftool.kdiff3.cmd ‘/Applications/kdiff3.app/Contents/MacOS/kdiff3 $BASE $LOCAL $REMOTE -o $MERGED’```
		```git config --global difftool.kdiff3.trustExitCode false```
5. Clone terminal alias
    1. ```git clone https://github.com/thelukemccarthy/scripts_and_files.git```
    2. Update ```~/.zshrc``` to have source ```~/scripts_and_files/alias```
6. Install and setup ‘Informative git prompt for zsh’ (https://github.com/olivierverdier/zsh-git-prompt) 
    1. ```git clone https://github.com/olivierverdier/zsh-git-prompt.git```
    2. Update ```~/.zshrc``` to have 
		```source ~/zsh-git-prompt/zshrc.sh
		PROMPT='%B%m%~%b$(git_super_status) %# '```
7. Install NVM 
  1. ```brew install nvm```
  2. Add the following to ```~/.zshrc``` after nvm to automatically change node versions if a .nvmrc file exists
  ```shell script 
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
8. Install yarn ```brew install yarn```
9. Download and Install VS Code (https://code.visualstudio.com/docs/?dv=osx)
10. Install the following plugin for VS Code 
    1. Live Share
    2. Rainbow brackets
    3. Indent-rainbow
    4. IntelliJ IDEA Keybindings
11. Download and install IntelliJ
    1. Turn off conflicting Mac OSX keyboard shortcuts
        1. Open ‘System Preferences’
        2. Open ‘Keyboard’
        3. Go to  ‘Shortcuts’
        4. Click on ‘Services’
        5. Find ‘Text’
        6. Disable ‘Search man Page Index in Terminal’
        7. Disable ‘Open man Page in Terminal’
12. Download and install Virtualbox
13. Download and setup Win10 for IE test (https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)
    1. The password for the VM is Passw0rd!
14. Download and install Docker Desktop
