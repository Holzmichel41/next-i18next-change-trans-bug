const { readdir, readFile } = require("fs").promises;
const { resolve } = require("path");

const getRoutes = async (localesPath, map_function) => {
  const subdirs = await readdir(localesPath);
  const rewrites = await Promise.all(
    subdirs
      .filter((locale) => locale != "de")
      .map(async (locale) => {
        const res = resolve(localesPath, locale);
        const fileNames = await readdir(res);
        const rewritesLocal = await Promise.all(
          fileNames
            .filter((fileName) => fileName == "routes.json")
            .map(async (fileName) => {
              const filePath = resolve(res, fileName);
              const file = JSON.parse((await readFile(filePath)).toString());
              return Object.entries(file)
                .filter(([key, value]) => key != value)
                .map((entry) => map_function(entry, locale));
            })
        );
        return rewritesLocal.flat();
      })
  );
  return rewrites.flat();
};

module.exports = {
  getRoutes: getRoutes,
};
