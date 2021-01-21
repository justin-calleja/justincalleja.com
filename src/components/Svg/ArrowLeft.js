import * as React from "react"

export const viewBoxX2 = 24
export const viewBoxY2 = 24

function ArrowLeft({ className, width, height, fill, rotationDegrees }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      fill={fill}
      viewBox={`0 0 ${viewBoxX2} ${viewBoxY2}`}
    >
      <g
        transform={`rotate(${rotationDegrees}, ${viewBoxX2 * 0.5}, ${viewBoxY2 *
          0.5})`}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
      </g>
    </svg>
  )
}

ArrowLeft.defaultProps = {
  width: 32,
  height: 32,
  rotationDegrees: 0,
}

export default ArrowLeft
