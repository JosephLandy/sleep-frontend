import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorator } from '../App';

import WeekNavigator from '../components/WeekNavigator';
import { sampleWeek } from '../shared/sampledata';

storiesOf('WeekNavigator', module).addDecorator(decorator)
  .add('sampleWeek 1974', () => <WeekNavigator initialDate={sampleWeek.nights[3].dateAwake} />)
  .add('this week', () => <WeekNavigator initialDate={new Date()}/>)