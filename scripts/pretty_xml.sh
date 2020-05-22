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
      #python -c "import sys;import xml.dom.minidom;f=open('$1', 'r');print(xml.dom.minidom.parseString(f).toprettyxml())";
      echo "$1" | python -c 'import sys;import xml.dom.minidom;s=sys.stdin.read();f=open(s.strip(), "r");print(xml.dom.minidom.parseString(f.read()).toprettyxml())'
      exit 0;;

    -s)
      # string provided
      shift;
      echo "$1" | python -c 'import sys;import xml.dom.minidom;s=sys.stdin.read();print(xml.dom.minidom.parseString(s).toprettyxml())';
      exit 0;;

    -u)
      # url provided
      shift;
      curl "$1" | python -c 'import sys;import xml.dom.minidom;s=sys.stdin.read();print(xml.dom.minidom.parseString(s).toprettyxml())';
      exit 0;;
  esac
done

if [ -z "$1" ]
then
  # Data piped in
  #echo "`python -m json.tool < /dev/stdin`";
  python -c 'import sys;import xml.dom.minidom;s=sys.stdin.read();print(xml.dom.minidom.parseString(s).toprettyxml())'
else
  # String provided as the first argument
  echo "$1" | python -c 'import sys;import xml.dom.minidom;s=sys.stdin.read();print(xml.dom.minidom.parseString(s).toprettyxml())';
fi

# source https://stackoverflow.com/a/1920585/409119