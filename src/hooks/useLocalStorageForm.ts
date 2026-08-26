import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction
} from 'react';

export interface UseLocalStorageFormOptions<T> {
  /**
   * Custom function to determine if the form currently contains unsaved draft data.
   */
  isDraftChecker?: (currentValues: T, initialValues: T) => boolean;
  /**
   * Optional callback when values are successfully restored from localStorage.
   */
  onRestore?: (restoredValues: T) => void;
}

export interface UseLocalStorageFormReturn<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  resetForm: (newValues?: Partial<T>) => void;
  clearDraft: () => void;
  hasDraft: boolean;
  isRestored: boolean;
}

/**
 * Default helper to check if form values represent a user draft
 */
function defaultCheckHasDraft<T extends Record<string, any>>(
  current: T,
  initial: T
): boolean {
  return Object.keys(current).some((k) => {
    const currVal = current[k as keyof T];
    const initVal = initial[k as keyof T];

    // For strings, consider it a draft if non-empty and different from initial, or has content
    if (typeof currVal === 'string') {
      const trimmed = currVal.trim();
      return trimmed.length > 0 && trimmed !== (typeof initVal === 'string' ? initVal.trim() : '');
    }

    // For other types, compare inequality
    if (currVal !== initVal && currVal !== undefined && currVal !== null) {
      return true;
    }

    return false;
  });
}

/**
 * Custom React hook that automatically syncs form state with localStorage
 * to prevent data loss on page refreshes or navigation interruptions.
 *
 * @param storageKey The unique localStorage key
 * @param initialValues The baseline/default form values
 * @param options Optional configuration
 */
export function useLocalStorageForm<T extends Record<string, any>>(
  storageKey: string,
  initialValues: T,
  options?: UseLocalStorageFormOptions<T>
): UseLocalStorageFormReturn<T> {
  const initialValuesRef = useRef<T>(initialValues);
  initialValuesRef.current = initialValues;

  const [isRestored, setIsRestored] = useState(false);

  // Initialize state from localStorage if present, otherwise initialValues
  const [formData, setFormData] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValues;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...initialValues,
            ...parsed
          };
        }
      }
    } catch (err) {
      console.warn(`[useLocalStorageForm] Failed to load data from localStorage key "${storageKey}":`, err);
    }

    return initialValues;
  });

  // Calculate if form currently holds a draft
  const hasDraft = options?.isDraftChecker
    ? options.isDraftChecker(formData, initialValuesRef.current)
    : defaultCheckHasDraft(formData, initialValuesRef.current);

  // Sync formData changes to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (hasDraft) {
        localStorage.setItem(storageKey, JSON.stringify(formData));
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch (err) {
      console.warn(`[useLocalStorageForm] Failed to save data to localStorage key "${storageKey}":`, err);
    }
  }, [formData, hasDraft, storageKey]);

  // Mark as restored once mounted
  useEffect(() => {
    setIsRestored(true);
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved && options?.onRestore) {
          const parsed = JSON.parse(saved);
          if (parsed) {
            options.onRestore(parsed);
          }
        }
      } catch (err) {
        console.warn(`[useLocalStorageForm] Error in onRestore for key "${storageKey}":`, err);
      }
    }
  }, [storageKey, options]);

  // Generic change handler for standard input elements
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => {
        let parsedValue: any = value;
        if (type === 'checkbox') {
          parsedValue = (e.target as HTMLInputElement).checked;
        } else if (type === 'number') {
          parsedValue = value === '' ? '' : Number(value);
        }
        return {
          ...prev,
          [name]: parsedValue
        };
      });
    },
    []
  );

  // Helper to programmatically set a specific field value
  const setFieldValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Clear draft from localStorage and restore initial values
  const clearDraft = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch (err) {
        console.warn(`[useLocalStorageForm] Failed to remove localStorage key "${storageKey}":`, err);
      }
    }
    setFormData({ ...initialValuesRef.current });
  }, [storageKey]);

  // Reset form to initial values or a customized partial state
  const resetForm = useCallback(
    (newValues?: Partial<T>) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(storageKey);
        } catch (err) {
          console.warn(`[useLocalStorageForm] Failed to remove localStorage key "${storageKey}":`, err);
        }
      }
      setFormData({
        ...initialValuesRef.current,
        ...(newValues || {})
      });
    },
    [storageKey]
  );

  return {
    formData,
    setFormData,
    handleChange,
    setFieldValue,
    resetForm,
    clearDraft,
    hasDraft,
    isRestored
  };
}
