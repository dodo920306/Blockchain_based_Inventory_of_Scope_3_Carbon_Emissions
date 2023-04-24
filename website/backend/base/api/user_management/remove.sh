#!/bin/bash

if [ $# -ne 2 ]; then
  echo -e "Usage:\n  $0 <org_name> <user_name>"
  exit 1
fi

ORG_NAME=$1
USER_NAME=$2

if [ ${ORG_NAME} != "org1" ] && [ ${ORG_NAME} != "org2" ] && [ ${ORG_NAME} != "org3" ]; then
  echo "Error: Invalid org_name. Available options: org1, org2, org3" > 2
  exit 1
fi

if ! [ -e /home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/users/${USER_NAME}@${ORG_NAME}.example.com ]; then
  echo "Error: Username doesn't exists under the organization." >&2
  exit 1
fi

rm /home/ubuntu/website/backend/base/api/env/.env.${ORG_NAME}.${USER_NAME}
rm -r /home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/users/${USER_NAME}@${ORG_NAME}.example.com