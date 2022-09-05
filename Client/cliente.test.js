jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

test('test data', () => {
  const {send_information, data} = require('./index')
  send_information(2000, 8081, "localhost", data)
  
  expect(setInterval).toHaveBeenCalledTimes(2)
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000)
  expect(data).toBeTruthy()
  
})