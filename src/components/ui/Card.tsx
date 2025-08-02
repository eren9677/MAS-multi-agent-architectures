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
  const baseClasses = 'bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border overflow-hidden relative transition-colors duration-200'
  const hoverClasses = hover ? 'transition-all duration-200 ease-in-out hover:shadow-soft-hover dark:hover:shadow-dark-hover hover:scale-105 cursor-pointer group' : ''
  const clickClasses = onClick ? 'cursor-pointer' : ''
  
  const classes = `${baseClasses} ${hoverClasses} ${clickClasses} ${className}`
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
} 