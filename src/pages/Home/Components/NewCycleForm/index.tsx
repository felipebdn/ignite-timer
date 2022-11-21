import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm() {
  <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      type="text"
      id="task"
      list="task-suggestions"
      placeholder="Dê um nome para seu projeto"
      {...register('task')}
      disabled={!!activeCycle}
    />
    <datalist id="task-suggestions">
      <option value="Projeto 1" />
      <option value="Projeto 2" />
      <option value="Projeto 3" />
      <option value="Banana" />
    </datalist>

    <label htmlFor="minutesAmount">Durante</label>
    <MinutesAmountInput
      type="number"
      id="minutesAmount"
      placeholder="00"
      step={1}
      min={1}
      max={60}
      {...register('minutesAmount', { valueAsNumber: true })}
      disabled={!!activeCycle}
    />
    <span>minutos.</span>
  </FormContainer>
}