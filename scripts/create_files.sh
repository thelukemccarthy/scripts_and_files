for i in $(eval echo {$1..$2})
do
  echo "Test file $i" > file$i.txt
done

