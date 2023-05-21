#!/bin/bash

for ((i=0; i<8000; i++))
do
    echo $i
    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/minter@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
    ./token_erc_20 transfer eDUwOTo6Q049VXNlcjEsT1U9Y2xpZW50LE89SHlwZXJsZWRnZXIsU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUzo6Q049Y2Eub3JnMy5leGFtcGxlLmNvbSxPPW9yZzMuZXhhbXBsZS5jb20sTD1SYWxlaWdoLFNUPU5vcnRoIENhcm9saW5hLEM9VVM= 1
    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=/home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/users/user1@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:9051
    ./token_erc_20 transfer eDUwOTo6Q049VXNlcjEsT1U9Y2xpZW50LE89SHlwZXJsZWRnZXIsU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUzo6Q049Y2Eub3JnMy5leGFtcGxlLmNvbSxPPW9yZzMuZXhhbXBsZS5jb20sTD1SYWxlaWdoLFNUPU5vcnRoIENhcm9saW5hLEM9VVM= 1
done