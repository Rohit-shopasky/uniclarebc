
set -ev

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

#docker-compose -f docker-compose.yml down

#docker-compose -f docker-compose.yml up -d ca.example.com orderer.example.com peer0.Lordshire.example.com couchdb
docker-compose up -d 
docker ps -a

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
export FABRIC_START_TIMEOUT=10
#echo ${FABRIC_START_TIMEOUT}
sleep ${FABRIC_START_TIMEOUT}

# Create the channel
docker exec -e "CORE_PEER_LOCALMSPID=LordshireMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@Lordshire.example.com/msp" peer0.Lordshire.example.com peer channel create -o orderer.example.com:7050 -c mychannel -f /etc/hyperledger/configtx/channel.tx

# Join peer0.Lordshire.example.com to the channel.

docker exec -e "CORE_PEER_LOCALMSPID=LordshireMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@Lordshire.example.com/msp" peer0.Lordshire.example.com peer channel join -b mychannel.block

docker cp peer0.Lordshire.example.com:/opt/gopath/src/github.com/hyperledger/fabric/mychannel.block mychannel.block

docker cp mychannel.block peer0.Student.example.com:/opt/gopath/src/github.com/hyperledger/fabric/
docker cp mychannel.block peer0.College.example.com:/opt/gopath/src/github.com/hyperledger/fabric/
docker cp mychannel.block peer0.Employer.example.com:/opt/gopath/src/github.com/hyperledger/fabric/

docker exec -e "CORE_PEER_LOCALMSPID=StudentMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@Student.example.com/msp" peer0.Student.example.com peer channel join -b mychannel.block

docker exec -e "CORE_PEER_LOCALMSPID=CollegeMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@College.example.com/msp" peer0.College.example.com peer channel join -b mychannel.block

docker exec -e "CORE_PEER_LOCALMSPID=EmployerMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@Employer.example.com/msp" peer0.Employer.example.com peer channel join -b mychannel.block



