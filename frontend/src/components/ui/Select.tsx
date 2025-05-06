// components/ui/Select.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

export function Select({ value, onValueChange, children }: SelectProps) {
  return <div className="relative inline-block">{children}</div>;
}

export function SelectTrigger({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <button
      className={`flex items-center justify-between w-full p-2 bg-zinc-900 border border-zinc-700 rounded-md ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 text-zinc-400" />
    </button>
  );
}

export function SelectContent({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={`absolute w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-md max-h-60 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div
      className="p-2 cursor-pointer hover:bg-zinc-700 text-sm text-zinc-300"
      onClick={() => alert(value)} // This would call the onValueChange in a parent component
    >
      {children}
    </div>
  );
}

export function SelectValue({ children, className, placeholder }: { children: React.ReactNode; className: string; placeholder?: string }) {
  return (
    <div className={`text-zinc-300 text-sm ${className}`}>
      {children || <span className="text-zinc-500">{placeholder || 'Select a tag'}</span>}
    </div>
  );
}
