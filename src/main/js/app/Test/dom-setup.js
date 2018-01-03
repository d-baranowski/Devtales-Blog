import {JSDOM} from 'jsdom';

if (typeof document === 'undefined') {
    const jsdom = new JSDOM(`<!DOCTYPE html><p></p>`);
    const { window } = jsdom;
    const { document } = jsdom.window;
}
