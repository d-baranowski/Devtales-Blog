import catchError from 'jasmine-es6/helpers/catch_error';
import install from 'jasmine-es6';
install();

describe('Sample', function() {
    it('enables easy assertion on async errors', function() {
        expect("Hello").toMatch("Hello");
    });
});