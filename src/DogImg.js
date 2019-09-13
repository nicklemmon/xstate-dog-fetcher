import React from 'react'

export default function DogImg(props) {
  const { state } = props;

  switch(state.value) {
    case 'idle': return <p>No dogs yet 😞 - please fetch a dog.</p>

    case 'loading': return <p>Loading...😗</p>

    case 'success': return <img className="w-full h-full object-cover" src={state.context.data} alt="The dogger twas fetched"/>

    case 'error': return <p>The dog failed to load...NO 😠</p>

    default: return null
  }
}
