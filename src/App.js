import React, { useState } from 'react';
import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'
import DogImgFrame from './DogImgFrame'
import DogImg from './DogImg'
import DogFetchBtn from './DogFetchBtn';

function App() {
  const dogMachine = Machine({
    id: 'dog',
    initial: 'idle',
    context: {
      dog: undefined
    },
    states: {
      idle: {
        on: {
          SUBMIT: {
            target: 'loading'
          }
        }
      },
      loading: {
        on: {
          IMAGE_LOADED: 'success',
          IMAGE_FAIL: 'error'
        },
        invoke: {
          src: 'getDog',
          onDone: {
            target: 'success',
            actions: assign({
              data: (_, event) => event.data
            })
          },
          onError: {
            target: 'error',
            actions: assign({
              error: (_, event) => event.data
            })
          }
        }
      },
      error: {
        on: {
          SUBMIT: {
            target: 'loading'
          }
        }
      },
      success: {
        on: {
          SUBMIT: {
            target: 'loading'
          }
        }
      }
    }
  });
  const [currentState, send] = useMachine(dogMachine, {
    services: { getDog: getDog }
  });

  function handleSubmit(e) {
    e.preventDefault();

    send('SUBMIT');
  }

  function getDog(e) {
    return fetch(new Request('https://dog.ceo/api/breeds/image/random'))
      .then(res => res.json())
      .then(res => res.message);
  }

  return (
    <>
      <header className="absolute top-0 left-0 text-center w-screen p-4 bg-white">
        <h1 className="text-2xl text-gray-700 font-bold">
          <a className="text-indigo-700 underline" href="https://xstatejs.org" target="_blank" rel="noreferrer noopener">XState</a>

          &nbsp;Dog Image Fetcher 🐶
        </h1>
      </header>

      <main className="p-4 text-center bg-gray-100 text-gray-700 h-screen w-screen flex items-center justify-center">
        <div>
          <DogImgFrame>
            <DogImg state={currentState}/>
          </DogImgFrame>

          <form onSubmit={handleSubmit}>
            <DogFetchBtn state={currentState}/>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
