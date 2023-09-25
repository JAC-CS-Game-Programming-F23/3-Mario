/**
 * Mario-0
 * The "Day-0" Update
 *
 * Original Lua by: Colton Ogden (cogden@cs50.harvard.edu)
 * Adapted to JS by: Vikram Singh (vikram.singh@johnabbott.qc.ca)
 *
 * Super Mario Bros. was instrumental in the resurgence of video
 * games in the mid-80s, following the infamous crash shortly after the
 * Atari age of the late 70s. The goal is to navigate various levels from
 * a side perspective, where jumping onto enemies inflicts damage and
 * jumping up into blocks typically breaks them or reveals a power-up.
 *
 * Art
 * @see https://opengameart.org/content/kenney-16x16
 *
 * Music
 * @see https://freesound.org/people/Sirkoto51/sounds/393818/
 */

import { StateName } from "./enums.js";
import Game from "../lib/Game.js";
import {
	canvas,
	context,
	images,
	stateMachine,
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
} from "./globals.js";
import PlayState from "./states/PlayState.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// Fetch the asset definitions from config.json.
const {
	images: imageDefinitions,
} = await fetch('./src/config.json').then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);

// Add all the states to the state machine.
stateMachine.add(StateName.Play, new PlayState());

const game = new Game(stateMachine, context, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
