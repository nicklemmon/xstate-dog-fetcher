import React from 'react';
import classNames from 'classnames'

export default function DogFetchBtn(props) {
  const { state } = props;

  return (
    <button
      className={
        classNames(
          'py-2 px-3 mt-4 bg-indigo-600 text-white font-bold rounded',
          state.value === 'loading' ? 'cursor-not-allowed opacity-75' : 'hover:bg-indigo-700 focus:outline-none focus:shadow-outline'
        )
      }
      disabled={state.value === 'loading' ? 'disabled' : null}
    >
      {state.value === 'loading' ? 'Loading' : 'FetchDogger 🦴'}
    </button>
  )
}
