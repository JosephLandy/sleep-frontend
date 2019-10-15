import React from 'react';
import { storiesOf } from '@storybook/react';

import AnalyticsView from '../../components/Analytics/AnalyticsViewD3';
import { decorator } from '../../App';
import { startOfWeek, endOfWeek } from 'date-fns';

const start = startOfWeek(new Date())
const end = endOfWeek(new Date())
const props={
  start: start,
  end: end,
  data: [new Date()],
}

storiesOf('AnalyticsViewD3', module).addDecorator(decorator)
  .add('basic', () => <AnalyticsView {...props}/>)