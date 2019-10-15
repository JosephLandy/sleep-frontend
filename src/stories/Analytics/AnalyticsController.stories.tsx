import React from 'react';
import { storiesOf } from '@storybook/react';

import AnalyticsController from '../../components/Analytics/AnalyticsController';
import { decorator } from '../../App';



const props = {
  
}

storiesOf('AnalyticsController', module).addDecorator(decorator)
  .add('basic', () => <AnalyticsController {...props} />)