import { useState } from 'react';
import { TypographyH1 } from './components/ui/typography-h1';
import { Dogs as PlainReduxDogs } from './plain-redux/Dogs';
import { Dogs as RTKQueryDogs } from './rtk-query/Dogs';
import { Dogs as ReduxToolkitDogs } from './redux-toolkit/Dogs';
import { Label } from './components/ui/label';
import { NumberInput } from './components/number-input';
import { TypographyH2 } from './components/ui/typography-h2';

function App() {
  const [amount, setAmount] = useState('10');

  return (
    <div className="flex flex-col items-center gap-4 mx-8 py-4">
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
      <div className="flex justify-between w-full">
        <div>
          <TypographyH2>Plain Redux Example</TypographyH2>
          <PlainReduxDogs amount={+amount} />
        </div>
        <div>
          <TypographyH2>Redux Toolkit Example</TypographyH2>
          <ReduxToolkitDogs amount={+amount} />
        </div>
        <div>
          <TypographyH2>RTKQuery Example</TypographyH2>
          <RTKQueryDogs amount={+amount} />
        </div>
      </div>
    </div>
  );
}

export default App;
