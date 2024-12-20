import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
} from "@/features/counter/counterSlice";

describe("Counter Slice", () => {
  it("should return the initial state", () => {
    expect(counterReducer(undefined, { type: "" })).toEqual({
      value: 0,
    });
  });

  it("should handle increment", () => {
    const previousState = { value: 0 };
    // @ts-ignore
    expect(counterReducer(previousState, increment())).toEqual({ value: 1 });
  });

  it("should handle decrement", () => {
    const previousState = { value: 1 };
    // @ts-ignore
    expect(counterReducer(previousState, decrement())).toEqual({ value: 0 });
  });

  it("should handle incrementByAmount", () => {
    const previousState = { value: 0 };
    // @ts-ignore
    expect(counterReducer(previousState, incrementByAmount(5))).toEqual({
      value: 5,
    });
  });
});
