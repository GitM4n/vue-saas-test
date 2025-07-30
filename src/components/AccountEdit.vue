<script setup lang="ts">
import type { Account } from '@/types'
import AccountTable from './AccountTable.vue'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useAccountsStore } from '@/stores/accounts'

const { accounts } = useAccountsStore()

const tempAccounts = ref<Account[]>([...accounts])

function addAccountFields() {
  tempAccounts.value.push({ mark: '', type: 'local', login: '', password: '' })
}
</script>

<template>
  <section class="edit">
    <div class="edit__header">
      <span class="edit__title">Учетные записи</span>
      <Button aria-label="Добавить учетную запись" icon="pi pi-plus" @click="addAccountFields" />
    </div>

    <div class="edit__hint hint">
      <i class="pi pi-info-circle" />
      <span class="hint__text"
        >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span
      >
    </div>

    <AccountTable v-model="tempAccounts" />
  </section>
</template>

<style scoped>
.edit {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.edit__header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.edit__title {
  font-size: 20px;
  font-weight: 600;
}

.edit__hint {
  background-color: aquamarine;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  padding: 12px;
  color: black;
}
</style>
