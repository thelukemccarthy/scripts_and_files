#!/bin/bash

options=$(getopt f:s:u: "$@")
[ $? -eq 0 ] || { 
  echo "Invalid option. No action taken. Script will now exit"
  exit 1
}

for i
do
  case "$i" in
    -f)
      # file name provided
      shift;
      python -m json.tool $1;
      exit 0;;

    -s)
      # string provided
      shift;
      echo "$1" | python -m json.tool;
      exit 0;;

    -u)
      # url provided
      shift;
      curl "$1" | python -m json.tool;
      exit 0;;
  esac
done

if [ -z "$1" ]
then
  # Data piped in
  echo "`python -m json.tool < /dev/stdin`";
else
  # String provided as the first argument
  echo "$1" | python -m json.tool;
fi

# source https://stackoverflow.com/a/1920585/409119