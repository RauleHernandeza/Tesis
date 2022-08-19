jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

test('test data', () => {
  const {conection, data} = require('./index')
  conection(2000, 8081, "localhost", data)
  
  
  expect(setInterval).toHaveBeenCalledTimes(1)
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000)

})