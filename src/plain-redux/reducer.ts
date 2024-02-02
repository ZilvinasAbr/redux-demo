interface ReducerState {
  dogUrls: string[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ReducerState = {
  dogUrls: null,
  isLoading: false,
  error: null,
};

// Use the initialState as a default value
export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
