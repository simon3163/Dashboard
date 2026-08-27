# The Living Wall — Agent Rules

## Core product

The Living Wall is a premium visual wall made from individual people and their permanent numbered slabs.

The Wall itself must remain fluid, reactive, visually premium, and focused primarily on people.

## Working method

For every coding task:

1. Inspect the existing implementation before editing.
2. Reproduce the reported problem.
3. Create a scoped plan.
4. Modify only files necessary for the task.
5. Run all available validation commands.
6. Start the website and test the affected interaction.
7. Inspect desktop and mobile layouts.
8. Check the browser console for errors.
9. Repair failures before declaring the task complete.
10. Report every changed file and why it changed.

Continue the edit-test-inspect-repair loop autonomously until the acceptance criteria pass or a genuine external blocker is reached.

## Safety

- Never work directly on the production branch.
- Never merge or deploy without explicit user approval.
- Never delete production assets.
- Never replace supplied artwork with generated placeholders.
- Never silently change filenames used by runtime code.
- Never introduce new frameworks or major dependencies unless essential.
- Keep changes tightly scoped to the requested task.
- Preserve a reversible commit history.

## Locked slab baseline

Card Lab v7.2.5 is the locked physical slab baseline.

The approved slab frame, geometry, dimensions, bevels, rim, corners, front panel, back panel, and material construction must not be redesigned during unrelated tasks.

The canonical `card-renderer-three.js` baseline was 67,608 bytes with SHA-256 beginning:

```text
b731a77714cb48cad45a973863e24783bfeb55c78eb28e886e7c446f6063a
```

Before changing the renderer, determine whether the task genuinely requires it.

If the renderer must be changed:

- Record the original checksum.
- Explain why it must change.
- Keep the change narrowly scoped.
- Confirm that locked geometry has not moved.
- Report the new checksum.

## Artwork

Layered artwork uses a 1055 × 1491 portrait canvas.

Expected layer structure:

- 01 background: full opaque image.
- 02 distant environment: transparent.
- 03 midground: transparent.
- 04 main subject: transparent.
- 05 foreground: transparent.
- 06 effects: transparent and optional.

All layers in an artwork set must use identical dimensions, alignment, and crop.

Do not stretch layers independently.

## Required testing

At minimum test:

- Desktop.
- A narrow mobile viewport.
- A large mobile viewport.
- Initial slab loading.
- Rotation.
- Click-to-flip.
- Front and back rendering.
- Artwork alignment.
- Parallax movement.
- Resize and orientation changes.
- Missing asset handling.
- Browser console errors.

When visual behaviour changes, save comparison screenshots.

## Performance

The Wall must remain responsive and free-flowing.

Avoid:

- Unnecessary per-frame allocations.
- Repeated texture loading.
- Duplicate animation loops.
- Excessive device pixel ratio.
- Rebuilding geometry during ordinary animation.
- Loading full hero-quality Three.js slabs for every distant Wall card.

## Definition of done

A task is complete only when:

- The requested behaviour works.
- Automated checks pass.
- No new console errors appear.
- Relevant desktop and mobile screenshots have been inspected.
- Unrelated locked behaviour remains unchanged.
- The version number is updated when a release is requested.
- The final report identifies changes, testing, and remaining limitations.
