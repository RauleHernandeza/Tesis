jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

test('confirm data', () => {
  const {conection} = require('./index');
  conection(2000, 8081, "localhost")
  
  expect(setInterval).toHaveBeenCalledTimes(1);
});