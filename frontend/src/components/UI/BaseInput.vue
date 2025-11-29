<script setup lang="ts">
const props = defineProps<{
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  modelValue?: string;
  required?: boolean;
  helper?: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputType = props.type ?? 'text';
</script>

<template>
  <label class="base-input">
    <span v-if="label" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </span>
    <input
      :id="id"
      class="base-input__field"
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="helper && !error" class="base-input__helper">{{ helper }}</p>
    <p v-if="error" class="base-input__error">{{ error }}</p>
  </label>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.base-input__label {
  font-size: 0.9rem;
  color: #334155;
  font-weight: 600;
}

.base-input__required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.base-input__field {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #ffffff;
}

.base-input__field:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
}

.base-input__helper {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0;
}

.base-input__error {
  font-size: 0.8rem;
  color: #dc2626;
  margin: 0;
}
</style>
