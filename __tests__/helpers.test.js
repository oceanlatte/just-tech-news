const { format_date, format_plural, format_url } = require('../utils/helpers');

test('format_date() returns a date string', () => {
  const date = new Date('2022-08-23 16:12:03');

  expect(format_date(date)).toBe('8/23/2022');
});

test('format_plural() correctly pluralizes words', () => {
  const animal1 = format_plural('tiger', 2);
  const animal2 = format_plural('lion', 1);

  expect(animal1).toBe('tigers');
  expect(animal2).toBe('lion');
})

test('format_url() returns a simplified url string', () => {
  const url1 = format_url('http://test.com/page/1');
  const url2 = format_url('https://www.sample.com/abcdefg/');
  const url3 = format_url('https://www.google.com?q=hello');

  expect(url1).toBe('test.com');
  expect(url2).toBe('sample.com');
  expect(url3).toBe('google.com');
})