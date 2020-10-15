import { ColonyClient } from '@colony/colony-js';
import { Log } from 'ethers/providers';

export type IEvent = {
  primary: string,
  secondary: number,
  avatar: string,
  hash: string,
}

type Parsed = {
  values: {
    fundingPotId: string,
    amount: string,
    token: string,
    domainId: string,
    role: number,
  },
}

export type EventFormatterArgs = {
  log: Log,
  client: ColonyClient,
  parsed: Parsed,
}

export interface EventMapper<V = any> {
  [key: string]: V;
 }
