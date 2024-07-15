import { v4 as uuidv4 } from "uuid";
import { loremIpsum, name } from "react-lorem-ipsum";

const userId = uuidv4();

const dateTime = new Date();

export const defaultSuggestions = [
  {
    id: uuidv4(),
    text: "Make this app better!",
    userId,
    createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
    comments: [
      {
        id: uuidv4(),
        userId,
        userName: name(),
        createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
        text: loremIpsum({ avgSentencesPerParagraph: 1, random: true })[0],
      },
      {
        id: uuidv4(),
        userId,
        userName: name(),
        createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
        text: loremIpsum({ avgSentencesPerParagraph: 1, random: true })[0],
      },
    ],
  },
  {
    id: uuidv4(),
    text: "Make suggestions more specific!",
    userId,
    createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
    comments: [
      {
        id: uuidv4(),
        userId,
        userName: name(),
        createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
        text: loremIpsum({ avgSentencesPerParagraph: 1, random: true })[0],
      },
    ],
  },
  {
    id: uuidv4(),
    text: "Make suggestions editable!",
    userId,
    createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
    comments: [
      {
        id: uuidv4(),
        userId,
        userName: name(),
        createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
        text: loremIpsum({ avgSentencesPerParagraph: 1, random: true })[0],
      },
    ],
  },
];
