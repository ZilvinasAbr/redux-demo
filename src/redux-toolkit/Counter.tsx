import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { counterSlice } from './slice';

const { actions } = counterSlice;

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(actions.increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(actions.decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
