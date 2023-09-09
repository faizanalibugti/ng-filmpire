import { AbbreviateNumberPipe } from './abbreviate-number.pipe';

describe('AbbreviateNumber', () => {
  it('create an instance', () => {
    const pipe = new AbbreviateNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
