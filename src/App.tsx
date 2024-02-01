import './App.css';
import { Button } from './components/ui/button';
import { Counter } from './redux-toolkit/Counter';

function App() {
  return (
    <>
      <Counter />
      <Button variant="outline">Button</Button>
    </>
  );
}

export default App;
