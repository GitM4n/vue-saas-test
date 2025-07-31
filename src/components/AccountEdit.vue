<script setup lang="ts">
import AccountTable from './AccountTable.vue'
import Button from 'primevue/button'
import { useAccountsStore } from '@/stores/accounts'
import { onMounted } from 'vue'

const store = useAccountsStore()

function addAccountFields() {
  store.addAccount({ mark: [{ text: '' }], type: 'local', login: '', password: '' })
}

onMounted(() => store.loadAccounts())
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

    <AccountTable :accounts="store.accounts" />
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
