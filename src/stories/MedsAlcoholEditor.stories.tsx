import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { sampleWeek, completeNight } from '../shared/sampledata';

import DrugsEditor from '../components/MedsAlcoholEditor';

import { decorator } from '../App';


const noName = [...completeNight.medsAndAlcohol];
noName[0].substance = '';

const actions = {
    drugsChanged: action('drugsChanged'),
}

storiesOf('MedsAlcoholEditor', module)
    .addDecorator(decorator)
    .add('Sample list', () => (
        <DrugsEditor drugs={completeNight.medsAndAlcohol} {...actions} />
    ))
    .add('no name', () => (
      <DrugsEditor drugs={noName} {...actions} />
    ));