import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'

export interface YiQiTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const YiQiTextarea = forwardRef<HTMLTextAreaElement, YiQiTextareaProps>(function YiQiTextarea(
  { label, className = '', id, ...props },
  ref,
) {
  const generatedId = useId()
  const resolvedId = id ?? generatedId

  const textarea = (
    <textarea
      ref={ref}
      id={resolvedId}
      className={`yiqi-input ${className}`.trim()}
      {...props}
    />
  )

  if (!label) return textarea

  return (
    <div className="yiqi-field">
      <label className="yiqi-label" htmlFor={resolvedId}>{label}</label>
      {textarea}
    </div>
  )
})
