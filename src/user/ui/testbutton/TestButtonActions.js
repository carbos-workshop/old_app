export const TEST_ACTION = 'TEST_ACTION'
function action(string) {
  console.log('do stuff to state', string);
  return {
    type: TEST_ACTION,
    payload: string
  }
}

export function testFunction() {
  return function(dispatch) {

    dispatch(action('<--staasdfasdfte-->'))

    console.log('do stuff')

  }
}
