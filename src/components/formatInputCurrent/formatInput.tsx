import React from 'react';
import { IMaskInput } from 'react-imask';

export interface CurrencyMaskProps {
  name: string;
  value: number | undefined;
  onChange: (event: { target: { name: string; value: string } }) => void;
}

const CurrencyMaskCustom = React.forwardRef<HTMLInputElement, CurrencyMaskProps>(
  function CurrencyMaskCustom(props, ref) {
    const { onChange, value, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={Number}
        scale={2} // Número de casas decimais
        signed={false}
        radix=","
        thousandsSeparator="."
        padFractionalZeros={true}
        normalizeZeros={true}
        mapToRadix={['.']} 
        onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
        value={value}
        inputRef={ref as React.Ref<HTMLInputElement>}
      />
    );
  }
);

export default CurrencyMaskCustom;
