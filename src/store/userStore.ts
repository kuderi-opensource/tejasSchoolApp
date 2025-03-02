import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  class?: string;
  section?: string;
}

// Define action types
export enum UserActionType {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
  UPDATE_USER = 'UPDATE_USER',
}

// Define action interfaces
interface SetUserAction {
  type: UserActionType.SET_USER;
  payload: User;
}

interface ClearUserAction {
  type: UserActionType.CLEAR_USER;
}

interface UpdateUserAction {
  type: UserActionType.UPDATE_USER;
  payload: Partial<User>;
}

// Union type for all actions
type UserAction = SetUserAction | ClearUserAction | UpdateUserAction;

// Define state interface
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  // Dispatch method for Redux-like usage
  dispatch: (action: UserAction) => void;
}

// Create user store
export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      dispatch: (action: UserAction) => {
        switch (action.type) {
          case UserActionType.SET_USER:
            set({ 
              user: action.payload,
              isAuthenticated: true,
            });
            break;
            
          case UserActionType.CLEAR_USER:
            set({ 
              user: null,
              isAuthenticated: false,
              token: null,
            });
            break;
            
          case UserActionType.UPDATE_USER:
            set((state) => ({
              user: state.user ? { ...state.user, ...action.payload } : null,
            }));
            break;
            
          default:
            console.error('Unknown action type');
        }
      },
    }),
    { name: 'user-store' }
  )
);

// Action creators
export const setUser = (user: User, token: string): UserAction => ({
  type: UserActionType.SET_USER,
  payload: user,
});

export const clearUser = (): UserAction => ({
  type: UserActionType.CLEAR_USER,
});

export const updateUser = (userData: Partial<User>): UserAction => ({
  type: UserActionType.UPDATE_USER,
  payload: userData,
});
