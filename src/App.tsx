import { useState } from 'react';
import { TypographyH1 } from './components/ui/typography-h1';
import { Dogs } from './rtk-query/Dogs';
import { Label } from './components/ui/label';
import { NumberInput } from './components/number-input';

function App() {
  const [amount, setAmount] = useState('10');

  return (
    <div className="flex flex-col items-center gap-4">
      <TypographyH1>Random Dogs</TypographyH1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="amount">Amount</Label>
        <NumberInput
          name="amount"
          id="amount"
          placeholder="Amount"
          value={amount}
          onChange={setAmount}
        />
      </div>
      <Dogs amount={+amount} />
    </div>
  );
}

export default App;
