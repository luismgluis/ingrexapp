/* eslint-disable indent */
/* eslint-disable prettier/prettier */
module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "linebreak-style": 0,
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "quote-props": ["error", "as-needed"],
    "object-curly-newline": ["error", { multiline: true }],
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: false },
    ],
  },
};
/*module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "react-app",
    "eslint:recommended",
  ],
  rules: {
    "@typescript-eslint/indent": ["error"],
    quotes: ["error", "double"],
    indent: ["error", 4],
    "object-curly-spacing": ["error", "always"]
  },
}; */
