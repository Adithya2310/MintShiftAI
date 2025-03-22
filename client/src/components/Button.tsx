
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'blue' | 'purple' | 'pink' | 'gradient' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  Icon?: React.ComponentType<{ className?: string }>;
}

const Button = ({
  variant = 'blue',
  size = 'md',
  children,
  className,
  fullWidth = false,
  Icon,
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-300 ease-in-out focus:outline-none font-orbitron';
  
  const variantClasses = {
    blue: 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/20 hover:border-neon-blue hover:shadow-neon-blue',
    purple: 'bg-neon-purple/10 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/20 hover:border-neon-purple hover:shadow-neon-purple',
    pink: 'bg-neon-pink/10 text-neon-pink border border-neon-pink/30 hover:bg-neon-pink/20 hover:border-neon-pink hover:shadow-neon-pink',
    gradient: 'relative text-white overflow-hidden border border-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500',
    ghost: 'text-white hover:bg-white/10 border border-transparent hover:border-white/20'
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        className
      )}
      {...props}
    >
      {Icon && <Icon className={cn('w-4 h-4', children ? 'mr-2' : '')} />}
      {children}
    </button>
  );
};

export default Button;
