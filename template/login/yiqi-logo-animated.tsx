'use client'

import { useEffect, useRef } from 'react'

type Axis = 'x' | 'y'

interface YiQiLogoAnimatedProps {
  className?: string
  loop?: number
  axis?: Axis
  title?: string
}

const EASING = 'cubic-bezier(.45,.02,.25,1)'
const Q_DURATION = 820
const DOT_GAP_1 = 90
const DOT_GAP_2 = 170

function qFrames(axis: Axis): Keyframe[] {
  const scale =
    axis === 'x'
      ? (a: number, b: number) => `scaleX(${b}) scaleY(${a})`
      : (a: number, b: number) => `scaleX(${a}) scaleY(${b})`

  return [
    { opacity: 0, transform: scale(0.82, 0.82), offset: 0 },
    { opacity: 1, transform: scale(1, 0.84), offset: 0.12 },
    { opacity: 0.3, transform: scale(0, 0.88), offset: 0.32 },
    { opacity: 1, transform: scale(-0.92, 0.92), offset: 0.5 },
    { opacity: 0.3, transform: scale(0, 0.96), offset: 0.7 },
    { opacity: 1, transform: scale(1.05, 1), offset: 0.88 },
    { opacity: 1, transform: scale(1, 1), offset: 1 },
  ]
}

export function YiQiLogoAnimated({
  className = '',
  loop = 2600,
  axis = 'y',
  title = 'YiQi',
}: YiQiLogoAnimatedProps) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const select = (className: string) => svg.querySelector<SVGElement>('.' + className)
    const parts = ['yq-q', 'yq-i1d', 'yq-i2d']
    const clear = () => {
      parts.forEach((className) => {
        const element = select(className)
        if (!element || typeof element.getAnimations !== 'function') return
        element.getAnimations().forEach((animation) => animation.cancel())
      })
    }

    const play = () => {
      clear()
      if (reduce) return
      const frames = qFrames(axis)
      const animate = (className: string, delay: number) => {
        const element = select(className)
        if (!element || typeof element.animate !== 'function') return
        element.animate(frames, {
          duration: Q_DURATION,
          delay,
          easing: EASING,
          fill: 'both',
        })
      }

      animate('yq-q', 0)
      animate('yq-i1d', DOT_GAP_1)
      animate('yq-i2d', DOT_GAP_2)
    }

    play()
    let id: number | undefined
    if (!reduce && loop) id = window.setInterval(play, 1450 + loop)

    return () => {
      if (id) window.clearInterval(id)
      clear()
    }
  }, [loop, axis])

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 100 65"
      role="img"
      aria-label={title}
      focusable="false"
    >
      <g>
        <path className="yq-y" fill="currentColor" d="M20.44,48.34l2.57-6.15-6.79-16.91c-.14-.39.07-.61.46-.61h4.97c.29,0,.57.14.68.43l3.58,10.08,3.61-10.08c.11-.29.39-.43.68-.43h4.97c.39,0,.57.21.43.61l-9.26,23.27c-.11.29-.39.43-.68.43h-4.75c-.43,0-.68-.21-.47-.64Z" />
        <path className="yq-i1s" fill="currentColor" d="M38.72,25.24c0-.32.25-.57.57-.57h4.89c.32,0,.57.25.57.57v16.24c0,.32-.25.57-.57.57h-4.89c-.32,0-.57-.25-.57-.57v-16.24Z" />
        <g className="yq-q" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <path className="yqs" fill="var(--yiqi-login-primary, var(--cyan, #00ccff))" d="M57.91,44.78v-2.66c-2.18-.53-4.21-1.66-5.92-3.36-4.97-4.97-5.09-13.02-.03-18.08,5.09-5.09,13.14-4.97,18.11,0s5.09,13.02,0,18.11c-1.78,1.78-3.94,2.93-6.22,3.46v2.51c0,.35-.18.53-.58.53h-4.82c-.3,0-.55-.2-.55-.5ZM56.28,34.47c.5.5,1.05.9,1.65,1.2v-3.36c0-.35.18-.53.53-.53h4.87c.25,0,.53.18.53.53v3.36c.63-.33,1.23-.78,1.78-1.33,2.73-2.73,2.78-6.75.15-9.38s-6.67-2.61-9.41.13c-2.71,2.71-2.73,6.75-.1,9.38Z" />
        </g>
        <path className="yq-i2s" fill="currentColor" d="M77.44,25.24c0-.32.25-.57.57-.57h4.89c.32,0,.57.25.57.57v16.24c0,.32-.25.57-.57.57h-4.89c-.32,0-.57-.25-.57-.57v-16.24Z" />
        <path className="yq-i1d" fill="currentColor" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} d="M38.5,18.99c0-1.77,1.35-3.19,3.23-3.19s3.23,1.42,3.23,3.19-1.38,3.23-3.23,3.23-3.23-1.42-3.23-3.23Z" />
        <path className="yq-i2d" fill="currentColor" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} d="M77.22,18.99c0-1.77,1.35-3.19,3.23-3.19s3.23,1.42,3.23,3.19-1.38,3.23-3.23,3.23-3.23-1.42-3.23-3.23Z" />
      </g>
    </svg>
  )
}

