import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

export interface YiQiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  action?: ReactNode
}

export const YiQiInput = forwardRef<HTMLInputElement, YiQiInputProps>(function YiQiInput(
  { label, action, className = '', id, ...props },
  ref,
) {
  const generatedId = useId()
  const resolvedId = id ?? generatedId

  const input = (
    <span className="yiqi-input-wrap">
      <input
        ref={ref}
        id={resolvedId}
        className={`yiqi-input ${action ? 'yiqi-input--with-action' : ''} ${className}`.trim()}
        {...props}
      />
      {action ? <span className="yiqi-input-action">{action}</span> : null}
    </span>
  )

  if (!label) return input

  return (
    <div className="yiqi-field">
      <label className="yiqi-label" htmlFor={resolvedId}>{label}</label>
      {input}
    </div>
  )
})
