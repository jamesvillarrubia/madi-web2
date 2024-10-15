import React from 'react'

interface ThresholdSliderProps {
  value: number
  onChange: (value: number) => void
}

export const ThresholdSlider: React.FC<ThresholdSliderProps> = ({ value, onChange }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        min="0.83"
        max="0.93"
        step="0.001"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  )
}
