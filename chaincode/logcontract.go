// chaincode/logcontract.go
package main

import (
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type LogEntry struct {
	Timestamp     string `json:"timestamp"`
	SourceIP      string `json:"source_ip"`
	DestinationIP string `json:"destination_ip"`
	AlertType     string `json:"alert_type"`
	LogData       string `json:"log_data"`
}

func (s *SmartContract) AddLog(ctx contractapi.TransactionContextInterface, hash string, logJSON string) error {
	return ctx.GetStub().PutState(hash, []byte(logJSON))
}

func (s *SmartContract) GetLog(ctx contractapi.TransactionContextInterface, hash string) (*LogEntry, error) {
	logBytes, err := ctx.GetStub().GetState(hash)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if logBytes == nil {
		return nil, fmt.Errorf("log not found for hash: %s", hash)
	}

	var logEntry LogEntry
	err = json.Unmarshal(logBytes, &logEntry)
	if err != nil {
		return nil, fmt.Errorf("error unmarshalling log: %v", err)
	}

	return &logEntry, nil
}

func main() {
	chaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		panic(fmt.Sprintf("Error creating chaincode: %v", err))
	}

	if err := chaincode.Start(); err != nil {
		panic(fmt.Sprintf("Error starting chaincode: %v", err))
	}
}
