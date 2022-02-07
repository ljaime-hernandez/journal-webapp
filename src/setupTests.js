import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// const noScroll = () => {};
// Object.defineProperty(window, 'scrollTo', {value: noScroll, writable: true});

// uncomment this lines for tests in any cloudinary file
// window.setImmediate = window.setTimeout;
// window.clearImmediate = window.clearTimeout;