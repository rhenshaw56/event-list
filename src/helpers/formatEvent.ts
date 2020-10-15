import { ROLES, getTimeLog, getUserAddress, getNumber } from './events';
import { EventFormatterArgs } from '../types';


const formatInitialisedEvent = async ({ log } : EventFormatterArgs) => {
  const blockHash =  log.blockHash || null;
  return {
    primary: `Congratulations! It's a beautiful baby colony!`,
    secondary: blockHash ? await getTimeLog(blockHash) : '',
    avatar: log.transactionHash,
    hash: log.transactionHash
  };
}

const formatPayoutClaimedEvent = async ({ parsed, log, client} : EventFormatterArgs) => {
  const fundingPotId = parsed.values.fundingPotId;
  const userAddress = await getUserAddress(client, parsed.values.fundingPotId);
  const amount = getNumber(parsed.values.amount);;
  const token = parsed.values.token;
  const blockHash =  log.blockHash || null;
  return {
    primary: `User <b>${userAddress}</b> claimed <b>${amount}${token}</b> payout from pot <b>${fundingPotId}</b>`,
    secondary: blockHash ? await getTimeLog(blockHash) : '',
    avatar: userAddress,
    hash: log.transactionHash
  };
}

const formatColonyRoleSetEvent = async ({ parsed, log} : EventFormatterArgs) => {
  const domainId = getNumber(parsed.values.domainId);
  const userAddress = log.address;
  const role = ROLES[parsed.values.role];
  const blockHash =  log.blockHash || null;
  return {
    primary: `<b>${role}</b> role assigned to user <b>${userAddress}</b> in domain <b>${domainId}</b>`,
    secondary: blockHash ? await getTimeLog(blockHash) : '',
    avatar: userAddress,
    hash: log.transactionHash
  };
}

const formatDomainAddedEvent = async ({ parsed, log} : EventFormatterArgs) => {
  const domainId = getNumber(parsed.values.domainId);
  const blockHash =  log.blockHash || null;
  return {
    primary: `Domain <b>${domainId}</b> added.`,
    secondary: blockHash ? await getTimeLog(blockHash) : '',
    avatar: log.transactionHash,
    hash: log.transactionHash
  };
}

const formatterMap = {
  'ColonyInitialised': formatInitialisedEvent,
  'ColonyRoleSet': formatColonyRoleSetEvent,
  'PayoutClaimed': formatPayoutClaimedEvent,
  'DomainAdded': formatDomainAddedEvent
};

// @ts-ignore
export default async (type : string, data : EventFormatterArgs) => await formatterMap[type](data);