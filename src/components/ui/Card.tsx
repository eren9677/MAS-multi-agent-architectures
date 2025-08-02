import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = true
}) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200 overflow-hidden relative'
  const hoverClasses = hover ? 'transition-all duration-200 ease-in-out hover:shadow-soft-hover hover:scale-105 cursor-pointer group' : ''
  const clickClasses = onClick ? 'cursor-pointer' : ''
  
  const classes = `${baseClasses} ${hoverClasses} ${clickClasses} ${className}`
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
} 