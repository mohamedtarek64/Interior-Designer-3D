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
  icon?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputType = props.type ?? 'text';
</script>

<template>
  <label class="base-input" :class="{ 'base-input--error': error }">
    <span v-if="label" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </span>
    <div class="base-input__wrapper">
      <span v-if="icon" class="base-input__icon material-symbols-outlined">{{ icon }}</span>
      <input
        :id="id"
        class="base-input__field"
        :class="{ 'base-input__field--with-icon': icon }"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p v-if="helper && !error" class="base-input__helper">{{ helper }}</p>
    <p v-if="error" class="base-input__error-msg">{{ error }}</p>
  </label>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.base-input__label {
  font-size: 0.9rem;
  color: #1e293b;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.base-input__required {
  color: #ef4444;
  margin-left: 0.15rem;
}

.base-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.base-input__icon {
  position: absolute;
  left: 1rem;
  font-size: 20px;
  color: #94a3b8;
  pointer-events: none;
  transition: color 0.2s;
}

.base-input__field {
  width: 100%;
  border-radius: 14px;
  border: 2px solid #e2e8f0;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: #0f172a;
  transition: border-color 0.25s, box-shadow 0.25s, background-color 0.25s;
  background-color: #f8fafc;
}

.base-input__field--with-icon {
  padding-left: 3rem;
}

.base-input__field::placeholder {
  color: #94a3b8;
}

.base-input__field:hover {
  border-color: #cbd5e1;
  background-color: #ffffff;
}

.base-input__field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  background-color: #ffffff;
}

.base-input__field:focus ~ .base-input__icon,
.base-input:focus-within .base-input__icon {
  color: #3b82f6;
}

.base-input--error .base-input__field {
  border-color: #ef4444;
}

.base-input--error .base-input__field:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
}

.base-input__helper {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0;
}

.base-input__error-msg {
  font-size: 0.8rem;
  color: #ef4444;
  margin: 0;
  font-weight: 500;
}
</style>
