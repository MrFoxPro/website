import transformerVariantGroup from "@unocss/transformer-variant-group"
import { defineConfig, presetTypography, presetUno, presetMini } from "unocss"

export default defineConfig({
   include: [/\.tsx?/],
   theme: {
      fontFamily: {
         "sans": ["ui-sans-serif", "system-ui", "Segoe UI"],
         "serif": ["ui-serif", "Georgia"],
         "mono": ["ui-monospace", "Consolas"],
      },
   },
   // rules: [
   //    [
   //       /^bg-gradient-(?:repeating-)?linear-(.+)$/,
   //       ([, s]) => ({
   //          'background-image': `${s}`,
   //       }),
   //    ],
   // ],
   presets: [
      presetUno({ preflight: true }),
      presetTypography({
         cssExtend: {
            "*": {
               "line-height": "1.6"
            },
            "a::before": {
               "content": "\"🔗 \""
            },
            "code": {
               "background-color": "rgba(135, 131, 120, 0.15) !important",
               "transition": "background ease 100ms",
               "border-radius": "3px",
               "padding": "0.2em 0.4em",
            },
            "code::before, code::after": {
               content: "unset",
            },
            "code:hover": {
               // background: "red"
            },
         }
      }),
   ],
   transformers: [transformerVariantGroup()]
}) 