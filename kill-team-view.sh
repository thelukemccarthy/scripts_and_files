#!/bin/zsh

ps ax | grep -i "TeamViewerHost.app" | grep -v grep | awk '{print $1}' | xargs kill -9
