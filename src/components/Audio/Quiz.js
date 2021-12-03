import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { random } from "../../utils/random"

const Button = styled.button`
  cursor: pointer;
  font-size: 2.2rem;
`

const Answer = styled.div`
  font-size: 2.2rem;
  min-height: 2.2rem;
`

export const Quiz = ({ items }) => {
  const [isStarted, setIsStarted] = useState(false)

  return isStarted ? (
    <QuizProper items={items} />
  ) : (
    <Button onClick={() => setIsStarted(true)}>Start Quiz</Button>
  )
}

const QuizProper = ({ items }) => {
  const numberOfItems = items.length
  const [isShowing, setIsShowing] = useState(false)
  const [index, setIndex] = useState(random(0, numberOfItems))

  const onPlay = useCallback(() => {
    const audio = new Audio(items[index].filePath)
    audio.play()
  }, [index, items])

  useEffect(() => {
    onPlay()
  }, [index, onPlay])

  const onShow = () => {
    if (isShowing) {
      const newIndex = random(0, numberOfItems)
      setIndex(newIndex === index ? (newIndex + 1) % numberOfItems : newIndex)
      setIsShowing(false)
      return
    }

    setIsShowing(true)
  }

  return (
    <div>
      <Button onClick={onPlay}>Play</Button>
      <Button onClick={onShow}>{isShowing ? "Next" : "Show"}</Button>
      <Answer>{isShowing ? items[index].text : "?"}</Answer>
    </div>
  )
}
