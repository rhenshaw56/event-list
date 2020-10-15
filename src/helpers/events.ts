import { ColonyRole, getColonyNetworkClient, Network, getLogs, getBlockTime, ColonyClient } from '@colony/colony-js';
import { Wallet, utils } from 'ethers';
import { InfuraProvider, Log } from 'ethers/providers';



// Set up the network address constants that you'll be using
// The two below represent the current ones on mainnet
// Don't worry too much about them, just use them as-is
const MAINNET_NETWORK_ADDRESS = `0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef`;
const MAINNET_BETACOLONY_ADDRESS = `0x869814034d96544f3C62DE2aC22448ed79Ac8e70`;

// Get a new Infura provider (don't worry too much about this)
const provider = new InfuraProvider();

// Get a random wallet
// You don't really need control over it, since you won't be firing any trasactions out of it
const wallet = Wallet.createRandom();
// Connect your wallet to the provider
const connectedWallet = wallet.connect(provider);

// Get a network client instance
const networkClient = getColonyNetworkClient(
  Network.Mainnet,
  connectedWallet,
  { networkAddress:MAINNET_NETWORK_ADDRESS }
);

export const ROLES = ColonyRole;

export const getTimeLog = async (blockHash: string) => await getBlockTime(provider, blockHash);

export const getNumber = (data: string) => new utils.BigNumber(data);

const getLogData = (client: ColonyClient, log: Log) => {
  return {
    parsed: client.interface.parseLog(log) || {},
    log: log,
    client
  }
};

export const getUserAddress = async (client : ColonyClient, fundingPotId : string) => {

  const humanReadableFundingPotId = getNumber(
    fundingPotId
  ).toString();

  const { associatedTypeId } = await client.getFundingPot(
    humanReadableFundingPotId
  );

  const { recipient } = await client.getPayment(associatedTypeId);
  return recipient;
}


export const getEvents = (type: string) => {
  return networkClient
  .getColonyClient(MAINNET_BETACOLONY_ADDRESS)
  .then((colonyClient) => {
  
    // @ts-ignore
    const eventFilter = colonyClient.filters[type]();
    return [eventFilter, colonyClient];
  })
  .then(async (args) => {
    const [filter, colonyClient] = args;
    const eventLogs = await getLogs(colonyClient, filter);
    const logs = eventLogs.map(log => getLogData(colonyClient, log));
    return logs;
  });
}