# Atropa

> ⚡ A declaratively supercharged framework for building complex Add-Ons for Minecraft Bedrock Edition.

<br/>

> Note: This is still a work in progress.

## Why?

Building Add-Ons without proper tooling is often not the most pleasant experience.
And even when you do have the tools, JSON gets in your way of programmatically generating large amounts of files or code, and doesn't let you structure the different chunks of your code to be modular and scalable.

This is where Atropa comes in. Atropa takes full advantage of TypeScript's powerful type system to create a functional, declarative API that introduces Collections, Custom Components, Composable Generator Files, and Hooks.

And it doesn't end there! Atropa goes beyond that and provides an advanced build pipeline through its Sedge CLI where you can set up your development environment (which takes care of compiling your project to the `com.mojang` folder) and also run a production build of your project.
