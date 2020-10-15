import React from 'react';
import blockies from 'ethereum-blockies-base64';
import { IEvent } from '../types';
import styles from '../App.module.css';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

interface Props {
  list: IEvent[]
}

const EventList: Function = ({ list } : Props): JSX.Element => (
    <div className={styles['eventList']}>
      {list
      .slice()
      .sort((a : IEvent, b: IEvent) => a.secondary - b.secondary)
      .map((item : IEvent) => {
        const date = new Date(item.secondary);
        const key = `${item.avatar}${item.hash}${Math.random()}`;
        const src = blockies(key);
        const secondary = `${date.getDate()} ${MONTHS[date.getUTCMonth()]}`;

        
        return (
          <div key={key} className={styles['listItem']}>
            <div>
              <img src={src} alt="" className={styles['avatar']} />
            </div>
            
            <div className={styles['event-info']}>
              <p
                className={styles['primary']}
                dangerouslySetInnerHTML={{
                  __html: item.primary
                }}
                />
              <p className={styles['secondary']}>{secondary}</p>
            </div>
          </div>
        )
        }
      )}
    </div>
  )

export default EventList;