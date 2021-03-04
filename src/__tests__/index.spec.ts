import { sayHello } from '../index'

test('hello Eduardo', ()=> {
  expect(sayHello('Eduardo')).toBe('hello Eduardo');
})