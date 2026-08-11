import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

export interface YiQiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  action?: ReactNode
}

export const YiQiInput = forwardRef<HTMLInputElement, YiQiInputProps>(function YiQiInput(
  { label, action, className = '', id, ...props },
  ref,
) {
  const input = (
    <span className="yiqi-input-wrap">
      <input
        ref={ref}
        id={id}
        className={`yiqi-input ${action ? 'yiqi-input--with-action' : ''} ${className}`.trim()}
        {...props}
      />
      {action ? <span className="yiqi-input-action">{action}</span> : null}
    </span>
  )

  if (!label) return input

  return (
    <label className="yiqi-field" htmlFor={id}>
      <span className="yiqi-label">{label}</span>
      {input}
    </label>
  )
})
