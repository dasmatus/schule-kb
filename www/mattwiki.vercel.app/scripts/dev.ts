import { mkdirSync } from "fs";
import { watch } from "fs";

const outdir = "public/build/assets";
mkdirSync(outdir, { recursive: true });

async function buildJs(): Promise<string | null> {
    const result = await Bun.build({
        entrypoints: ["./resources/js/app.tsx"],
        outdir,
        naming: "[name].[ext]",
        target: "browser",
        splitting: true,
        sourcemap: "linked",
        alias: {
            "@": "./resources/js",
        },
    });

    if (!result.success) {
        for (const log of result.logs) {
            console.error(log);
        }
        return null;
    }

    return (
        result.outputs.find((o) => o.kind === "entry-point")?.path
            .split("/")
            .pop() ?? null
    );
}

async function writeManifest(jsFilename: string): Promise<void> {
    const manifest = {
        "resources/js/app.tsx": {
            file: `assets/${jsFilename}`,
            src: "resources/js/app.tsx",
            isEntry: true,
            css: ["assets/app.css"],
        },
        "resources/css/app.css": {
            file: "assets/app.css",
            src: "resources/css/app.css",
        },
    };
    await Bun.write(
        "public/build/manifest.json",
        JSON.stringify(manifest, null, 2),
    );
}

// Initial build
const jsFilename = await buildJs();
if (!jsFilename) process.exit(1);
await writeManifest(jsFilename);
console.log("✓ Dev build ready. Watching for changes…");

// Tailwind CSS in watch mode (background)
const tailwind = Bun.spawn(
    [
        "bunx",
        "@tailwindcss/cli",
        "-i",
        "resources/css/app.css",
        "-o",
        `${outdir}/app.css`,
        "--watch",
    ],
    { stdout: "inherit", stderr: "inherit" },
);

process.on("SIGINT", () => {
    tailwind.kill();
    process.exit(0);
});
process.on("SIGTERM", () => {
    tailwind.kill();
    process.exit(0);
});

// JS watch
let building = false;
watch("resources/js", { recursive: true }, async () => {
    if (building) return;
    building = true;
    try {
        await buildJs();
        console.log("  ↻ JS rebuilt");
    } finally {
        building = false;
    }
});
