const { createStore } = Redux;

// Your initial state, reducer, constants, action creators, and JS code should go here!

//initial state
const initialState = {
  currentCrew: [],
  walkedCrew: []
}
//reducer
const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CREW_MEMBER:
      const newCrew = state.currentCrew.concat(action.newPirate)
      return Object.assign({}, state, {
        currentCrew: newCrew,
        walkedCrew: state.walkedCrew
      });
    case WALK_THE_PLANK:
      const walkedCrewMember = state.currentCrew.shift()
      const newWalkedCrew = state.walkedCrew.concat(walkedCrewMember)
      return Object.assign({}, state, {
        currentCrew: state.currentCrew,
        walkedCrew: newWalkedCrew
      });
    default:
      return state;
  }
}
//constants (buttons and action types)
const newPirateForm = document.getElementById('new-pirate-form')
const walkThePlank = document.getElementById('walk-the-plank')
//action creators (event listener and associated actions on above buttons)
const ADD_CREW_MEMBER = 'ADD_CREW_MEMBER'
const WALK_THE_PLANK = 'WALK_THE_PLANK'

newPirateForm.addEventListener('submit', () => {
  event.preventDefault();
  const pirateName = document.getElementById('name').value
  document.getElementById('name').value = ''
  store.dispatch(
    {
      type: ADD_CREW_MEMBER,
      newPirate: pirateName
    }
  )
})

walkThePlank.addEventListener('click', () => {
  store.dispatch(
    {
      type: WALK_THE_PLANK
    }
  )
})

const store = createStore(crewReducer);

const crewList = document.getElementById('current-crew')
const walkedList = document.getElementById('walked-crew')
const plankWalkers = document.getElementById('plank-walkers')
//render

const render = () => {
  crewList.innerHTML = ''
  walkedList.innerHTML = ''
  store.getState().currentCrew.forEach((pirate) => {
    let crewMember = document.createElement("li")
    crewMember.innerHTML = pirate
    crewList.appendChild(crewMember)
  })
  walkedCrew = store.getState().walkedCrew
  walkedCrew.forEach((pirate) => {
    let walkedMember = document.createElement("li")
    walkedMember.innerHTML = pirate
    walkedList.appendChild(walkedMember)
  })
  plankWalkers.innerHTML = walkedCrew.length
}

render();
store.subscribe(render);
