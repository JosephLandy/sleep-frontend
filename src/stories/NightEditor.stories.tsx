import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { Dialog } from '@material-ui/core';
import { sampleWeek, completeNight } from '../shared/sampledata';
import { action } from '@storybook/addon-actions';

import NightEditor from '../components/NightEditor';
import { decorator } from '../App';

addDecorator(decorator)

const night = sampleWeek.nights[4];

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
));