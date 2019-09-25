import React from 'react';
import { storiesOf } from '@storybook/react';
import { WeekDay, INightRecord } from '../shared/model';
import NightView from '../components/NightView';
import { CssBaseline } from '@material-ui/core';
import { DateTime } from 'luxon';
import {sampleWeek, completeNight} from '../shared/sampledata';

import {decorator} from '../App';

import { action } from '@storybook/addon-actions';

const nightUpdatedAction = action('nightUpdated');


storiesOf('NightView', module)
  .addDecorator(decorator)
  .add('sample', () => (
    <NightView night={sampleWeek.nights[WeekDay.friday]} nightUpdated={nightUpdatedAction}/>
  )).add('not edited', () => (
    <NightView night={{ ...sampleWeek.nights[WeekDay.friday], edited: false }} nightUpdated={nightUpdatedAction} />
  )).add('complete', () => (
    <NightView night={completeNight} nightUpdated={nightUpdatedAction}/>
  ));