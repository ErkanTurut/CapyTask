import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/safe-action";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {},
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TOutput | null>(null);
  const [isLoading, setisLoading] = useState(false);

  const run = useCallback(
    async (input: TInput) => {
      setisLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        if (result.error) {
          setError(result.error);
          if (options.onError) {
            options.onError(result.error);
          }
        }
        if (result.data) {
          setData(result.data);
          if (options.onSuccess) {
            options.onSuccess(result.data);
          }
        }
      } finally {
        setisLoading(false);
        if (options.onComplete) {
          options.onComplete();
        }
      }
    },
    [action, options],
  );
  return {
    fieldErrors,
    error,
    data,
    isLoading,
    run,
    reset: () => {
      setFieldErrors(null);
      setError(null);
      setData(null);
    },
  };
};
