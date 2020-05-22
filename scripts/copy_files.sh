# Set period as delimiter
IFS='.'

read -a strarr <<< "$1"

for (( i=1; i<=$2; i++ ))
do
  cp "$1" "${strarr[0]}-${i}.${strarr[1]}"
done

