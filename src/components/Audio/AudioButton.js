import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const Button = ({ filePath, children, className }) => {
  const playSound = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(filePath)
    if (playSound.current === null) {
      playSound.current = () => {
        setIsPlaying(true)
        audio.play().then(() => {
          setIsPlaying(false)
        })
      }
    }
  }, [filePath])

  return (
    <button
      className={className}
      disabled={isPlaying}
      onClick={() => {
        if (playSound.current) playSound.current()
      }}
    >
      {children}
    </button>
  )
}

export const AudioButton = styled(Button)`
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || "1.8rem"};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  ${({ margin }) => `margin: ${margin ? margin : 0};`}
`
