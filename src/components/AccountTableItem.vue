<script setup lang="ts">
import type { Account, AccountType } from '@/types'
import { Button, InputText, Select, Message } from 'primevue'
import { computed, reactive, watch } from 'vue'
import { useAccountValidation } from '@/composables/useAccountValidation'

const props = defineProps<{
  account: Account
  index: number
}>()

const emit = defineEmits<{
  update: [index: number, newAccount: Account]
  remove: [index: number]
}>()

const { errors, validate } = useAccountValidation(props.account)

const typeOptions: { label: string; value: AccountType }[] = [
  {
    label: 'Локальная',
    value: 'local',
  },
  {
    label: 'LDAP',
    value: 'ldap',
  },
]

const state = reactive<Account>({
  mark: '',
  type: 'local',
  login: '',
  password: '',
})

const isHidePassword = computed(() => {
  if (props.account.type === 'ldap') {
    state.password = null
    return true
  }

  return false
})
</script>

<template>
  <div class="table__item mark">
    <InputText v-model="state.mark" class="mark__input" type="text" maxlength="50" />
  </div>

  <div class="table__item type">
    <Select
      :options="typeOptions"
      optionLabel="label"
      class="type__select"
      :model-value="typeOptions.find((opt) => opt.value === state.type)"
      @update:model-value="(opt) => (state.type = opt.value)"
    />
  </div>

  <div class="table__item login">
    <InputText
      v-model="state.login"
      type="text"
      class="login__input"
      required
      maxlength="100"
      :style="isHidePassword ? { gridColumn: 'span 2' } : {}"
      :invalid="errors.login.length > 0"
      @blur="validate('login')"
    />
    <Message v-if="errors.login.length" size="small" severity="error">{{
      errors.login.join(', ')
    }}</Message>
  </div>

  <div class="table__item password">
    <InputText
      v-if="!isHidePassword"
      v-model="state.password"
      type="password"
      class="password__input"
      required
      maxlength="100"
      :disabled="isHidePassword"
      :invalid="errors.password.length > 0"
      @blur="validate('password')"
    />
    <Message v-if="errors.password.length" size="small" severity="error">{{
      errors.password.join(', ')
    }}</Message>
  </div>

  <Button
    icon="pi pi-trash"
    aria-label="Удалить учетную запись"
    class="table__item remove-button"
    @click="emit('remove', props.index)"
  />
</template>

<style scoped>
.mark__input,
.type__select {
  width: 100%;
}

.login,
.password {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
