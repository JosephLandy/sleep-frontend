import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { WeekDay, INightRecord } from '../model';
import { CssBaseline, Dialog } from '@material-ui/core';
import { DateTime } from 'luxon';
import { sampleWeek, completeNight } from './WeekView.stories';
import { action } from '@storybook/addon-actions';

import NightEditor from '../components/NightEditor';
import { decorator } from '../App';

addDecorator(decorator)

const night = sampleWeek.nights[WeekDay.friday];


const actions = {
    closeEditor: action('closeEditor'),
    submit: action('submit'),
}

const props = {
    night,
    ...actions,
}


storiesOf('NightEditor', module).addDecorator(storyFn => (
    <Dialog open={true} onClose={actions.closeEditor}>
        {storyFn()}
    </Dialog>
)).add('sample', () => (
    <NightEditor {...props} />
)).add('entries complete', () => (
    <NightEditor {...{...props, night: completeNight}} />
  // <NightEditor {...{ ...props, night: completeNight }} night={completeNight} />
));