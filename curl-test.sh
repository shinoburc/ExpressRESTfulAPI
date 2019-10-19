#!/bin/sh

#HOST="dandydot.no-ip.biz:3000"
HOST="localhost:3000"

echo "POST foods"
id=`curl -q http://$HOST/api/foods -X POST -d '{"name": "味噌マヨチキン丼", "price": 790}' -H "Content-Type: application/json" | jq -r '._id'`
echo "\n"

echo "GET foods"
curl http://$HOST/api/foods -X GET
echo "\n"

echo "GET foods/:id"
curl http://$HOST/api/foods/$id -X GET
echo "\n"

echo "PUT foods/:id"
curl http://$HOST/api/foods/$id -X PUT -d '{"name": "味噌マヨチキン丼 very good!", "price": 790}' -H "Content-Type: application/json"
echo "\n"

echo "DELETE foods/:id"
curl http://$HOST/api/foods/$id -X DELETE
echo "\n"
