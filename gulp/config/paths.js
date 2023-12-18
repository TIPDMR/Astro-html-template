import path from 'path';

const projectDirName = path.basename(path.resolve());
const buildFolder = `./dist`;
const srcFolder = `./src`;

const filePaths = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    twig: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    static: `${buildFolder}/static/`,
    vendor: `${buildFolder}/vendor/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,ico}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: `${srcFolder}/styles/style.scss`,
    html: `${srcFolder}/*.html`,
    twig: `${srcFolder}/twig/pages/**/*.twig`,
    twigSrc: `${srcFolder}/twig/pages/`,
    static: `${srcFolder}/static/**/*.*`,
    vendor: `${srcFolder}/vendor/**/*.*`,
    svgIcons: `${srcFolder}/icons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: [`${srcFolder}/blocks/**/*.scss`, `${srcFolder}/styles/**/*.scss`],
    html: `${srcFolder}/**/*.html`,
    twig: `${srcFolder}/twig/**/*.twig`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    static: `${srcFolder}/static/**/*.*`,
    vendor: `${srcFolder}/vendor/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  projectDirName,
  ftp: ``, // Путь к нужной папке на удаленном сервере. Gulp добавит имя папки проекта автоматически
};

export { filePaths };
