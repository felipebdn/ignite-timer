import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeCotainer,
  StartCountDownButton,
  StopCountDownButton
} from "./styles";

import { CountDown } from "./Components/CountDown";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { NewCycleForm } from "./Components/NewCycleForm";

const newCycleFormValidationSchemaa = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchemaa>

export function Home() {

  const { createNewCycle, intrruptCurrentCycle, activeCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchemaa),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNreCycle(data:NewCycleFormData){
    createNewCycle(data)
    reset()
  }

  const task = watch('task')

  return (
    <HomeCotainer>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
      <form onSubmit={handleSubmit(handleCreateNreCycle)} action="">
        {activeCycle ? (
          <StopCountDownButton onClick={intrruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={!task} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeCotainer>
  )
}