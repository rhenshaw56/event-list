import { ROLES, getTimeLog, getUserAddress, getNumber } from './events';
import { EventFormatterArgs } from '../types';


const formatInitialisedEvent = async ({ raw } : EventFormatterArgs) => {
  const blockHash =  raw.blockHash || null;
  return {
    primary: `Congratulations! It's a beautiful baby colony!`,
    secondary: blockHash ? await getTimeLog(blockHash) : '',
    avatar: raw.transactionHash,
    hash: raw.transactionHash
  };
}

const formatPayoutClaimedEvent = async ({ parsed, raw, client} : EventFormatterArgs) => {
  const fundingPotId = parsed.values.fundingPotId;
  const userAddress = await getUserAddress(client, parsed.values.fundingPotId);
  const amount = getNumber(parsed.values.amount);;
  const token = parsed.values.token;
  const blockHash =  raw.blockHash || null;
  return {
    primary: `User <b>${userAddress}</b> claimed <b>${amount}${token}</b> payout from pot <b>${fundingPotId}</b>`,
    secondary: blockHash ? await getTimeLog(blockHash) : '',
    avatar: userAddress,
    hash: raw.transactionHash
  };
}

const formatColonyRoleSetEvent = async ({ parsed, raw} : EventFormatterArgs) => {
  const domainId = getNumber(parsed.values.domainId);
  const userAddress = raw.address;
  const role = ROLES[parsed.values.role];
  const blockHash =  raw.blockHash || null;
  return {
    primary: `<b>${role}</b> role assigned to user <b>${userAddress}</b> in domain <b>${domainId}</b>`,
    secondary: blockHash ? await getTimeLog(blockHash) : '',
    avatar: userAddress,
    hash: raw.transactionHash
  };
}

const formatDomainAddedEvent = async ({ parsed, raw} : EventFormatterArgs) => {
  const domainId = getNumber(parsed.values.domainId);
  const blockHash =  raw.blockHash || null;
  return {
    primary: `Domain <b>${domainId}</b> added.`,
    secondary: blockHash ? await getTimeLog(blockHash) : '',
    avatar: raw.transactionHash,
    hash: raw.transactionHash
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