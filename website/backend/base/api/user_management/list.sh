#!/bin/bash

echo "Available users:"
echo "  org1"
echo "    "`ls /home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/ | cut -d "@" -f 1`
echo "  org2"
echo "    "`ls /home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/users/ | cut -d "@" -f 1`
echo "  org3"
echo "    "`ls /home/ubuntu/fabric-samples/test-network/organizations/peerOrganizations/org3.example.com/users/ | cut -d "@" -f 1`