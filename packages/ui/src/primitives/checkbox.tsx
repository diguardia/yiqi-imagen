'use client'

import { Checkbox } from 'radix-ui'

export interface YiQiCheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  label: string
  name?: string
  onCheckedChange?: (checked: boolean) => void
}

export function YiQiCheckbox({ checked, defaultChecked, disabled, label, name, onCheckedChange }: YiQiCheckboxProps) {
  return (
    <label className="yiqi-checkbox-row">
      <Checkbox.Root
        className="yiqi-checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        onCheckedChange={(value) => onCheckedChange?.(value === true)}
      >
        <Checkbox.Indicator className="yiqi-checkbox-indicator" aria-hidden="true">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6.2 4.7 9 10 3" />
          </svg>
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span>{label}</span>
    </label>
  )
}
