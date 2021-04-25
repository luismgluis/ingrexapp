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
    //"dot-notation": ["error", { allowKeywords: false }]
    "consistent-this": ["error", "that"],
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        allowDestructuring: true, // Allow `const { props, state } = this`; false by default
        allowedNames: ["that"], // Allow `const self = this`; `[]` by default
      },
    ],
  },
};
