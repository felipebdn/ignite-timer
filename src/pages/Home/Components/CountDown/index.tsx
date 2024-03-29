import { differenceInSeconds } from "date-fns";
import { useContext, useEffect} from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountDownContainer, Separator } from "./styles";

export function CountDown() {
  const { setSecondsPassed, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }

      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, activeCycleId, markCurrentCycleAsFinished])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    activeCycle ? document.title = `${minutes}:${seconds}` : 'Ignite Timer'
  }, [seconds, minutes, activeCycle])
 
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}