'use client'

import {
  YiQiLogin,
  type YiQiLoginInput,
  type YiQiLoginProps,
  type YiQiLoginResult,
} from '@yiqi/ui/authentication'

export type LoginInput = YiQiLoginInput
export type LoginResult = YiQiLoginResult
export type YiQiLoginTemplateProps = YiQiLoginProps

/** @deprecated Usar YiQiLogin desde @yiqi/ui/authentication. */
export function YiQiLoginTemplate(props: YiQiLoginTemplateProps) {
  return <YiQiLogin {...props} />
}
