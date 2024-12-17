import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface FormState {
  name: string;
  email: string;
  phoneNumber: string;
}

interface Action {
  type: 'UPDATE_FIELD';
  name: string;
  value: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phoneNumber: '',
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};

interface SimpleFormContextType {
  state: FormState;
  updateField: (name: string, value: string) => void;
}

const SimpleFormContext = createContext<SimpleFormContextType | undefined>(
  undefined
);

interface SimpleFormProviderProps {
  children: ReactNode;
}

export const SimpleFormProvider: React.FC<SimpleFormProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateField = (name: string, value: string): void => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  return (
    <SimpleFormContext.Provider value={{ state, updateField }}>
      {children}
    </SimpleFormContext.Provider>
  );
};

export const useSimpleFormContext = (): SimpleFormContextType => {
  const context = useContext(SimpleFormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a SimpleFormProvider');
  }
  return context;
};
