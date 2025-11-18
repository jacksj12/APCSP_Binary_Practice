import React from 'react';

interface BinaryInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  bits: number;
}

const BinaryInput: React.FC<BinaryInputProps> = ({ value, onChange, disabled, bits }) => {
  const bitArray = value.split('').map(Number);

  const toggleBit = (index: number) => {
    if (disabled) return;
    const newBits = [...bitArray];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    onChange(newBits.join(''));
  };

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 bg-dark-code p-2 rounded-lg">
      {bitArray.map((bit, index) => (
        <div key={index} className="text-center">
          <button
            type="button"
            onClick={() => toggleBit(index)}
            disabled={disabled}
            className={`w-10 h-16 sm:w-12 sm:h-20 text-4xl font-bold rounded-md transition-all duration-200 flex items-center justify-center
              ${bit === 1 ? 'bg-matrix-green text-dark-code shadow-matrix' : 'bg-dark-code text-matrix-green border-2 border-matrix-green'}
              ${!disabled ? 'hover:opacity-80' : 'cursor-not-allowed opacity-50'}
            `}
          >
            {bit}
          </button>
          <span className="text-xs text-neutral-500 mt-1 block">{2 ** (bits - 1 - index)}</span>
        </div>
      ))}
    </div>
  );
};

export default BinaryInput;
