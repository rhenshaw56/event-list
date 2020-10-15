import { useEffect, useState } from 'react';
import { getEvents } from '../helpers/events';
import formatEvent from '../helpers/formatEvent';
import { IEvent } from '../types';



function useEvent(setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>, type: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    getEvents(type).then(async (logs) => {
      const formattedLogs = await Promise.all(
        logs.map((log) => formatEvent(type, log))
      );
      setEvents(state => [...state, ...formattedLogs]);
      setIsLoaded(true);
    }).catch(() => {
      console.log(`ERROR OCCURRED WHILE LOADING EVENT FOR ${type} event`);
      setIsLoaded(true);
    });
  }, [setEvents, type]);
  return isLoaded;
}

export default useEvent;