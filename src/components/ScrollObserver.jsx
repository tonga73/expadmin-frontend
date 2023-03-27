import React, { useEffect, useRef, useState } from "react"

const ScrollObserver = ({ onIntersection, children, options = {} }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          onIntersection(true)
          observer.unobserve(entry.target)
        } else {
          setIsVisible(false)
          onIntersection(false)
        }
      })
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, options, onIntersection])

  return <div ref={ref}>{children}</div>
}

export default ScrollObserver
