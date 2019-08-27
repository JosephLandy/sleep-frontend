import { configure } from '@storybook/react';
// import requireContext from 'require-context.macro';
import 'typeface-roboto';
// const req = require.context('../src/stories', true, /\.stories\.tsx$/);
const req = require.context('../src/stories', true, /\.stories\.tsx$/);
function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
