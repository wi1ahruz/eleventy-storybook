import prettier from "prettier";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addGlobalData("permalink", () => {
    return ({ page }) => `${page.filePathStem}.${page.outputFileExtension}`;
  });

  eleventyConfig.addTransform("prettier", async function (content, outputPath) {
    const options = await prettier.resolveConfig(outputPath, {
      editorconfig: true,
    });
    return prettier.format(content, { ...options, filepath: outputPath });
  });

  eleventyConfig.addShortcode("renderlayoutblock", function (name) {
    return (this.page.layoutblock || {})[name] || "";
  });

  eleventyConfig.addPairedShortcode("layoutblock", function (content, name) {
    if (!this.page.layoutblock) this.page.layoutblock = {};
    this.page.layoutblock[name] = content;
    return "";
  });

  eleventyConfig.setServerOptions({ watch: ["dist/assets/**/*.{css,js}"] });
}

export const config = {
  dir: {
    input: "src/njk",
    output: "dist",
  },
};
