<script setup lang="ts">
import type { Account, AccountType } from '@/types'
import { Button, InputText, Select, Message, Textarea } from 'primevue'
import { computed, onMounted, reactive, toRaw } from 'vue'
import { useAccountValidation } from '@/composables/useAccountValidation'

const props = defineProps<{
  account: Account
  index: number
}>()

const emit = defineEmits<{
  update: [index: number, newAccount: Account]
  remove: [index: number]
}>()

const state = reactive<Account>({ ...props.account })

const { errors, validate } = useAccountValidation(state)

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

const isHidePassword = computed(() => state.type === 'ldap')

function updateSelect(option: { label: string; value: AccountType }) {
  state.type = option.value

  if (state.type === 'ldap') state.password = null

  emit('update', props.index, toRaw(state))
}

function parseMark(e: Event) {
  const value = (e.target as HTMLInputElement).value

  state.mark = value
    .split(';')
    .map((m) => m.trim())
    .filter(Boolean)
    .map((text) => ({ text }))

  emit('update', props.index, toRaw(state))
}

function updateLoginOrPassword(key: 'login' | 'password') {
  if (!validate(key)) return
  emit('update', props.index, toRaw(state))
}
function deleteAccount() {
  emit('remove', props.index)
}
</script>

<template>
  <div class="table__item mark">
    <Textarea
      :model-value="state.mark.map((m) => m.text).join('; ')"
      class="mark__input"
      placeholder="Значение"
      rows="1"
      maxlength="50"
      @blur="parseMark"
      auto-resize
    />
  </div>

  <div class="table__item type">
    <Select
      :options="typeOptions"
      optionLabel="label"
      class="type__select"
      :model-value="typeOptions.find((opt) => opt.value === state.type)"
      @update:model-value="updateSelect"
    />
  </div>

  <div class="table__item login" :style="isHidePassword ? { gridColumnStart: 'span 2' } : {}">
    <InputText
      v-model="state.login"
      type="text"
      class="login__input"
      placeholder="Значение"
      required
      maxlength="100"
      :invalid="errors.login.length > 0"
      @blur="updateLoginOrPassword('login')"
    />
    <Message v-if="errors.login.length" size="small" severity="error">{{
      errors.login.join(', ')
    }}</Message>
  </div>

  <div v-if="!isHidePassword" class="table__item password">
    <InputText
      v-model="state.password"
      type="password"
      class="password__input"
      placeholder="Значение"
      required
      maxlength="100"
      :invalid="errors.password.length > 0"
      @blur="updateLoginOrPassword('password')"
    />
    <Message v-if="errors.password.length" size="small" severity="error">{{
      errors.password.join(', ')
    }}</Message>
  </div>

  <Button
    icon="pi pi-trash"
    aria-label="Удалить учетную запись"
    class="table__item remove-button"
    @click="deleteAccount"
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
