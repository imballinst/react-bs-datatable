import { useEffect, useRef } from 'react';
import { useDatatableWrapper } from '../components/DatatableWrapper';

export function useControlledStateSetter<ControlledPropsType extends object>(
  controlledProps: ControlledPropsType | undefined
) {
  // Make this only run once.
  const { setIsControlled } = useDatatableWrapper();
  const ref = useRef(controlledProps);
  useEffect(() => {
    if (ref.current !== undefined) {
      setIsControlled(true);
    }
  }, []);
}
