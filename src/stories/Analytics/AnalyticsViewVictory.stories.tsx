import React from 'react';
import { storiesOf } from '@storybook/react';

import AnalyticsView from '../../components/Analytics/AnalyticsViewVictory';
import { decorator } from '../../App';
import { DateTime } from 'luxon';

const start = DateTime.local().startOf('week');
const end = DateTime.local().endOf('week')
const props = {
  start: start,
  end: end,
  data: [],
}

storiesOf('AnalyticsViewVictory', module)//.addDecorator(decorator)
  .add('basic', () => <AnalyticsView {...props} />)