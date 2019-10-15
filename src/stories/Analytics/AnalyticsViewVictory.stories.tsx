import React from 'react';
import { storiesOf } from '@storybook/react';

import AnalyticsView from '../../components/Analytics/AnalyticsViewVictory';
import { decorator } from '../../App';

import { startOfWeek, endOfWeek } from 'date-fns';

const start = startOfWeek(new Date())
const end = endOfWeek(new Date())

const props = {
  start: start,
  end: end,
  data: [],
}

storiesOf('AnalyticsViewVictory', module).addDecorator(decorator)
  .add('basic', () => <AnalyticsView {...props} />)