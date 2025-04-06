// backend/index.js
require('dotenv').config();
const express = require('express');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const ccpPath = path.resolve(__dirname, '..', 'fabric-connection', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

app.post('/api/logs', async (req, res) => {
  try {
    const logData = JSON.stringify(req.body);
    const hash = crypto.createHash('sha256').update(logData).digest('hex');

    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();

    await gateway.connect(ccp, {
      wallet,
      identity: 'appUser',
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('logcontract');

    await contract.submitTransaction('AddLog', hash, logData);

    await gateway.disconnect();

    res.status(200).json({ status: 'success', hash });
  } catch (error) {
    console.error(`Error submitting log: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/logs/:hash', async (req, res) => {
  try {
    const hash = req.params.hash;
    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();

    await gateway.connect(ccp, {
      wallet,
      identity: 'appUser',
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('logcontract');

    const result = await contract.evaluateTransaction('GetLog', hash);

    await gateway.disconnect();

    res.status(200).json(JSON.parse(result.toString()));
  } catch (error) {
    console.error(`Error retrieving log: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
