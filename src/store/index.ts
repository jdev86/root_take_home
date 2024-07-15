import { create } from "zustand";
import { defaultSuggestions } from "./defaultData";
import { v4 as uuidv4 } from "uuid";
import { name } from "react-lorem-ipsum";

export type User = { id: string; name: string };

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  createdDateTime: string;
  text: string;
};

export type Suggestion = {
  id: string;
  text: string;
  userId: string;
  createdDateTime: string;
  comments: Comment[];
};

export type AppStore = {
  user: {
    id: string;
    name: string;
  };
  suggestions: Suggestion[];
  selectedSuggestion: string;
};

type AppStoreActions = {
  addSuggestion: (suggestion: Suggestion) => void;
  getSuggestion: (id: string) => Suggestion | undefined;
  setSelectedSuggestion: (id: string) => void;
  addComment: (id: string, comment: Comment) => void;
  getComments: (id: string) => Comment[] | undefined;
  setUser: (user: User) => void;
};

const useAppStore = create<AppStore & AppStoreActions>((set, get) => ({
  user: {
    id: uuidv4(),
    name: name(),
  },
  suggestions: defaultSuggestions,
  selectedSuggestion: "",
  addSuggestion: (suggestion: Suggestion) =>
    set((state) => ({
      ...state,
      suggestions: [...state.suggestions, suggestion],
    })),
  getSuggestion: (id) => {
    const suggestions = get().suggestions;

    const suggestion = suggestions.find((s) => s.id === id);

    if (!suggestion) {
      return;
    }

    return suggestion;
  },
  setSelectedSuggestion: (id: string) => set({ selectedSuggestion: id }),
  addComment: (id, comment) => {
    const updatedSuggestions = get().suggestions.map((s) => {
      if (s.id !== id) {
        return s;
      }

      const comments = s.comments || [];

      return { ...s, comments: [...comments, comment] };
    });
    set((state) => ({
      ...state,
      suggestions: updatedSuggestions,
    }));
  },
  getComments: (id) => {
    const suggestions = get().suggestions.find((s) => s.id === id);

    if (!suggestions) {
      return;
    }

    return suggestions?.comments;
  },
  setUser: (user: { id: string; name: string }) => {
    set((state) => ({ ...state, user }));
  },
}));

export default useAppStore;
