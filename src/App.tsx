import React, { useState } from 'react';
import EventList from './component/EventList';
import useEvent from './hooks'

import { IEvent } from './types';

import styles from './App.module.css';

const App: Function = (): JSX.Element => {
  const [events, setEvents ] = useState<IEvent[]>([]);

  const hasColonyInitialisedEvents = useEvent(setEvents, 'ColonyInitialised');
  const hasColonyRoleSetEvents = useEvent(setEvents, 'ColonyRoleSet');
  const hasPayoutClaimedEvents = useEvent(setEvents, 'PayoutClaimed');
  const hasDomainAddedEvents = useEvent(setEvents, 'DomainAdded');

  const isLoaded = hasColonyInitialisedEvents || hasColonyRoleSetEvents
    || hasPayoutClaimedEvents || hasDomainAddedEvents;

  if (!isLoaded) return <div className="loader" />;
  
  return (
    <div className={styles['app']}>
      <EventList list={events} />
    </div>
  );
};

export default App;
