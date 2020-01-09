import React from 'react';
import { storiesOf } from '@storybook/react';

import AnalyticsView from '../../components/Analytics/AnalyticsViewD3';
import { decorator } from '../../App';
import { startOfWeek, endOfWeek, setHours, startOfDay } from 'date-fns';
import * as dt from 'date-fns';
// const start = startOfWeek(new Date())
const start = new Date(2019, 5, 1);
const data = [
  { dateAwake: dt.addDays(start, 3), value: new Date(2019, 5, 1, 4) },
  { dateAwake: dt.addDays(start, 7), value: new Date(2019, 5, 1, 4, 30) },
  { dateAwake: dt.addDays(start, 8), value: new Date(2019, 5, 1, 5) },
  { dateAwake: dt.addDays(start, 12), value: new Date(2019, 5, 1, 4) },
  { dateAwake: dt.addDays(start, 13), value: new Date(2019, 5, 1, 2) },
  { dateAwake: dt.addDays(start, 16), value: new Date(2019, 5, 1, 8) },
  { dateAwake: dt.addDays(start, 20), value: new Date(2019, 5, 1, 5) },
  { dateAwake: dt.addDays(start, 21), value: new Date(2019, 5, 1, 6) },
]
const end = dt.addDays(start, 25);
const props = {
  start,
  end,
  data,
}

storiesOf('AnalyticsViewD3', module).addDecorator(decorator)
  .add('basic', () => <AnalyticsView {...props} />)