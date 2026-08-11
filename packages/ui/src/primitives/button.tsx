import type { ButtonHTMLAttributes } from 'react'

export type YiQiButtonVariant = 'default' | 'primary' | 'ghost'

export interface YiQiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: YiQiButtonVariant
}

export function YiQiButton({ variant = 'default', className = '', ...props }: YiQiButtonProps) {
  const variantClass = variant === 'primary' ? 'yiqi-button--primary' : variant === 'ghost' ? 'yiqi-button--ghost' : ''
  return <button className={`yiqi-button ${variantClass} ${className}`.trim()} {...props} />
}
