'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

export function useScrollAnimationMultiple(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const refs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-scroll-id')
          if (id) {
            if (entry.isIntersecting) {
              setVisibleElements(prev => new Set(prev).add(id))
              if (triggerOnce) {
                observer.unobserve(entry.target)
              }
            } else if (!triggerOnce) {
              setVisibleElements(prev => {
                const newSet = new Set(prev)
                newSet.delete(id)
                return newSet
              })
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    refs.current.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      refs.current.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [threshold, rootMargin, triggerOnce])

  const setRef = (id: string) => (element: HTMLElement | null) => {
    if (element) {
      refs.current.set(id, element)
      element.setAttribute('data-scroll-id', id)
    } else {
      refs.current.delete(id)
    }
  }

  const isVisible = (id: string) => visibleElements.has(id)

  return { setRef, isVisible }
}
