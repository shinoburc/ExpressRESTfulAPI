#!/bin/sh

HOST="dandydot.no-ip.biz:3000"

echo "GET foods/0"
curl http://$HOST/api/foods/0 -X GET
echo "\n"

echo "POST foods"
curl http://$HOST/api/foods -X POST -d '{"name": "hoge", "price": 120}' -H "Content-Type: application/json"
echo "\n"

echo "PUT foods/0"
curl http://$HOST/api/foods/0 -X PUT -d '{"id": 3, "name": "hoge", "price": 120}' -H "Content-Type: application/json"
echo "\n"

echo "DELETE foods/0"
curl http://$HOST/api/foods/0 -X DELETE
echo "\n"
