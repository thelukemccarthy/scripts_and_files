# Setting up a new Mac

1. Install brew (https://brew.sh/)
    1. /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
2. Install git
    1. brew install git
3. Clone terminal alias
    1. git clone https://github.com/thelukemccarthy/bash_alias.git
    2. Update ~/.zshrc to have source ~/bash_alias/alias
4. Install and setup ‘Informative git prompt for zsh’ (https://github.com/olivierverdier/zsh-git-prompt) 
    1. git clone https://github.com/olivierverdier/zsh-git-prompt.git
    2. Update ~/.zshrc to have 
		source ~/zsh-git-prompt/zshrc.sh
		PROMPT='%B%m%~%b$(git_super_status) %# '
5. Install NVM 
  1. brew install nvm
  2. Add the following to ~/.zshrc after nvm to automatically change node versions if a .nvmrc file exists
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
6. Install yarn ```brew install yarn```
7. Generate a new ssh key
    1. Run the command ssh-keygen -t rsa -C <email address>
    2. Run the following command to create a config file for ssh touch ~/.ssh/config 
    3. Edit the config file to add the domain to use it for, for example
		Host bitbucket.org
			Hostname bitbucket.org
			User git
			IdentityFile ~/.ssh/bitbucket_mac
8. Download and Install VS Code (https://code.visualstudio.com/docs/?dv=osx)
9. Install the following plugin for VS Code 
    1. Live Share
    2. Rainbow brackets
    3. Indent-rainbow
    4. IntelliJ IDEA Keybindings
10. Download and install IntelliJ
    1. Turn off conflicting Mac OSX keyboard shortcuts
        1. Open ‘System Preferences’
        2. Open ‘Keyboard’
        3. Go to  ‘Shortcuts’
        4. Click on ‘Services’
        5. Find ‘Text’
        6. Disable ‘Search man Page Index in Terminal’
        7. Disable ‘Open man Page in Terminal’
11. Install Kdiff3
    1. Setup git to use it
		git config --global merge.tool kdiff3
		git config --global mergetool.kdiff3.cmd ‘/Applications/kdiff3.app/Contents/MacOS/kdiff3 $BASE $LOCAL $REMOTE -o $MERGED’
		git config --global mergetool.kdiff3.trustExitCode false

		git config --global diff.guitool kdiff3
		git config --global difftool.kdiff3.cmd ‘/Applications/kdiff3.app/Contents/MacOS/kdiff3 $BASE $LOCAL $REMOTE -o $MERGED’
		git config --global difftool.kdiff3.trustExitCode false
12. Download and install Virtualbox
13. Download and setup Win10 for IE test (https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)
    1. The password for the VM is Passw0rd!
14. Download and install Docker Desktop
