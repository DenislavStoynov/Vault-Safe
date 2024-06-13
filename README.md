# How to run the game

1. Install 'Live Server' in Visual Studio Code
2. Start the server from 'Go Live' button which is located at the bottom right corner of VS Code
3. Open your browser console
4. Game Instructions
- In the console, you will see an array of objects formatted like this: [{rotations: 5, dir: "clockwise"}, {rotations: 1, dir: "counterclockwise"}, {rotations: 3, dir: "clockwise"}]. In this example, to unclock the safe, you need to perform the following steps:
- Rotate the handle 5 * 60 degrees clockwise,
- Rotate the handle 1 * 60 degrees counterclockwise,
- Rotate the handle 3 * 60 degrees clockwise.
5. To rotate the handle, click on the right side to turn it clockwise or on the left side to turn it counterclockwise

# NOTE:
After compiling the ts file into js, I got errors related to missing or incomaptible ts and pixijs types/features which I couldn't resolve. That is why I use script1.js which is the non-compiled script.ts version.

