import { createHash } from "crypto";
import { mkdirSync, unlinkSync } from "fs";

const outdir = "public/build/assets";
mkdirSync(outdir, { recursive: true });

// 1. Build JS
console.log("Building JS…");
const jsResult = await Bun.build({
    entrypoints: ["./resources/js/app.tsx"],
    outdir,
    naming: "[name]-[hash].[ext]",
    target: "browser",
    minify: true,
    splitting: true,
    define: { "process.env.NODE_ENV": '"production"' },
    alias: {
        "@": "./resources/js",
    },
});

if (!jsResult.success) {
    for (const log of jsResult.logs) {
        console.error(log);
    }
    process.exit(1);
}

const entry = jsResult.outputs.find((o) => o.kind === "entry-point");
if (!entry) {
    console.error("No JS entry-point in build output");
    process.exit(1);
}

const jsFilename = entry.path.split("/").pop()!;

// 2. Build CSS via Tailwind CLI
console.log("Building CSS…");
const tmpCss = `${outdir}/.tmp-app.css`;
const tailwind = Bun.spawnSync([
    "bunx",
    "@tailwindcss/cli",
    "-i",
    "resources/css/app.css",
    "-o",
    tmpCss,
    "--minify",
]);

if (tailwind.exitCode !== 0) {
    console.error("CSS build failed:", tailwind.stderr.toString());
    process.exit(1);
}

const cssContent = await Bun.file(tmpCss).text();
const cssHash = createHash("sha256")
    .update(cssContent)
    .digest("hex")
    .slice(0, 8);
const cssFilename = `app-${cssHash}.css`;
await Bun.write(`${outdir}/${cssFilename}`, cssContent);
unlinkSync(tmpCss);

// 3. Write Vite-compatible manifest
const manifest = {
    "resources/js/app.tsx": {
        file: `assets/${jsFilename}`,
        src: "resources/js/app.tsx",
        isEntry: true,
        css: [`assets/${cssFilename}`],
    },
    "resources/css/app.css": {
        file: `assets/${cssFilename}`,
        src: "resources/css/app.css",
    },
};

await Bun.write(
    "public/build/manifest.json",
    JSON.stringify(manifest, null, 2),
);

console.log("✓ Build complete");
console.log(`  JS:  assets/${jsFilename}`);
console.log(`  CSS: assets/${cssFilename}`);
