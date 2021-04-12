import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'
import  actions  from './actions';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, actions.GOOD)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, actions.OK)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, actions.BAD)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('should return the state to inital', () => {
    const initState = {
      good: 5,
      ok: 3,
      bad: 2
    }
    const state = initState
    deepFreeze(state)
    const newState = counterReducer(state, actions.ZERO)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })


})