import { atom } from 'jotai';

/**
 * For atom jotai as global state management.
 */

// Initial state for atom
export const password: string = "";

/**
 * Define the atom for your global state variable.
 * A piece of state in Jotai is represented by an atom. An atom accepts an
 * initial value, be it a primitive type like a number, string, or more
 * complex structures like arrays and objects.
 */
export const LoginPassAtom = atom(password);

