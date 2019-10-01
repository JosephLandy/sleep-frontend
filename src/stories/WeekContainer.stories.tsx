import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorator } from '../App';

import WeekContainer from '../components/WeekContainer';
import {sampleWeek} from '../shared/sampledata';


// can't seem to get the new story format to work. I'm going to stick with previous type.
// for the time being at least. It actually doesn't sound like both types of stories are
// supported in the same project. 

// I'm not actually sure why my current storybook setup works with typescript.
// but it seems to basically work very well.  
// export const sample = () => <WeekContainer initialWeek={sampleWeek.nights[3].dateAwake} />;
storiesOf('WeekContainer', module).addDecorator(decorator)
  .add('sampleWeek 1974', () => <WeekContainer weekOf={sampleWeek.nights[3].dateAwake.startOf('week')} />);