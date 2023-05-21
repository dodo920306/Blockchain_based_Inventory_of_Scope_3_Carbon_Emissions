#!/bin/bash

if [ $# -ne 2 ]; then
  echo -e "Usage:\n  $0 <org_name> <user_name>"
  exit 1
fi

ORG_NAME=$1
USER_NAME=$2

if [ ${ORG_NAME} = "org1" ]; then
  PORT=7054
elif [ ${ORG_NAME} = "org2" ]; then
  PORT=8054
elif [ ${ORG_NAME} = "org3" ]; then
  PORT=11054
else
  echo "Error: Invalid org_name. Available options: org1, org2, org3" > 2
  exit 1
fi

if [ -e /home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/users/${USER_NAME}@${ORG_NAME}.example.com ]; then
  echo "Error: Username already exists under the organization. Please try with another one." >&2
  exit 1
fi

export FABRIC_CFG_PATH=/home/ubuntu/fabric-samples/config/
export FABRIC_CA_CLIENT_HOME=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/

/home/ubuntu/fabric-samples/bin/fabric-ca-client register --caname ca-${ORG_NAME} --id.name ${USER_NAME} --id.secret ${USER_NAME}pw --id.type client --tls.certfiles "/home/ubuntu/fabric-samples/test-network/organizations/fabric-ca/${ORG_NAME}/tls-cert.pem"
/home/ubuntu/fabric-samples/bin/fabric-ca-client enroll -u https://${USER_NAME}:${USER_NAME}pw@localhost:${PORT} --caname ca-${ORG_NAME} -M "/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/users/${USER_NAME}@${ORG_NAME}.example.com/msp" --tls.certfiles "/home/ubuntu/fabric-samples/test-network/organizations/fabric-ca/${ORG_NAME}/tls-cert.pem"
cp "/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/msp/config.yaml" "/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/users/${USER_NAME}@${ORG_NAME}.example.com/msp/config.yaml"

if [ ${PORT} -eq 8054 ]; then
  PORT=9054
fi

echo "CORE_PEER_TLS_ENABLED=true" > "/home/ubuntu/website/backend/base/api/env/.env.${ORG_NAME}.${USER_NAME}"
echo "CORE_PEER_LOCALMSPID=\"${ORG_NAME^}MSP\"" >> "/home/ubuntu/website/backend/base/api/env/.env.${ORG_NAME}.${USER_NAME}"
echo "CORE_PEER_TLS_ROOTCERT_FILE=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/peers/peer0.${ORG_NAME}.example.com/tls/ca.crt" >> "/home/ubuntu/website/backend/base/api/env/.env.${ORG_NAME}.${USER_NAME}"
echo "CORE_PEER_MSPCONFIGPATH=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/users/${USER_NAME}@${ORG_NAME}.example.com/msp" >> "/home/ubuntu/website/backend/base/api/env/.env.${ORG_NAME}.${USER_NAME}"
echo "CORE_PEER_ADDRESS=localhost:$((PORT - 3))" >> "/home/ubuntu/website/backend/base/api/env/.env.${ORG_NAME}.${USER_NAME}"

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="${ORG_NAME^}MSP"
export CORE_PEER_MSPCONFIGPATH=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/users/${USER_NAME}@${ORG_NAME}.example.com/msp
export CORE_PEER_TLS_ROOTCERT_FILE=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/${ORG_NAME}.example.com/peers/peer0.${ORG_NAME}.example.com/tls/ca.crt
export CORE_PEER_ADDRESS=localhost:$((PORT - 3))

/home/ubuntu/website/backend/base/api/token_erc_20/token_erc_20 register

# export CORE_PEER_TLS_ENABLED=true
# export CORE_PEER_LOCALMSPID="Org1MSP"
# export CORE_PEER_MSPCONFIGPATH=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/minter@org1.example.com/msp
# export CORE_PEER_TLS_ROOTCERT_FILE=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
# export CORE_PEER_ADDRESS=localhost:7051

# /home/ubuntu/website/backend/base/api/token_erc_20/token_erc_20 transfer ${RECIPIENT} 0