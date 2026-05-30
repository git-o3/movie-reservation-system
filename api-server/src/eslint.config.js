import plugin from "eslint-plugin-import";
import importPlugin from "eslint-plugin-import";

export default [
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            "import/no-restricted-paths": [
                "error",
                {
                    zones: [
                        {
                            target: "./src/modules/*/internal/**/*",
                            from: "./src/modules*",
                            except: ["./src/modules/${target.dir}/internal/**/*"],
                            message: "Architectural Violation: Internal module folders are private. You must import from the module's root index.js entrypoint instead.",
                        }
                    ]
                }
            ]
        }
    }
]