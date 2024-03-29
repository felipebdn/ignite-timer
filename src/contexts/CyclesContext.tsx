import { differenceInSeconds } from "date-fns"
import { createContext, ReactNode, useEffect, useReducer, useState } from "react"
import { addNewCycleAction, intrruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"

interface CreateCycleData {
  task: string
  minutesAmount: number
}


interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  intrruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  }, ()=>{
    const storedStateAsJSON = localStorage.getItem('@ignite-timer: cycles-state-1.0.0')
    if(storedStateAsJSON){
      return JSON.parse(storedStateAsJSON)
    }
    return {
      cycles: [],
      activeCycleId: null
    }
  })

  const { activeCycleId, cycles } = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(()=>{
    if(activeCycle){
      return differenceInSeconds(new Date(),new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(()=>{
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer: cycles-state-1.0.0', stateJSON)
    console.log('teste');
    
  },[])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {

    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function intrruptCurrentCycle() {

    dispatch(intrruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider value={{ cycles, intrruptCurrentCycle, createNewCycle, setSecondsPassed, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed }} >
      {children}
    </CyclesContext.Provider>
  )
}