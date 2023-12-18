import gulp from 'gulp';
import fs from 'fs';
import chalk from 'chalk';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import fontfaceGen from 'gulp-fontfacegen-extended';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const otfToTtf = () => {
  return (
    gulp /** Поиск шрифтов .otf */
      .src(`${filePaths.srcFolder}/vendor/fonts/*.otf`, {})
      .pipe(plugins.handleError('FONTS'))

      /** Конвертация в .ttf */
      .pipe(fonter({ formats: ['ttf'] }))

      /** Выгрузка в исходную папку */
      .pipe(gulp.dest(`${filePaths.srcFolder}/vendor/fonts/`))
  );
};

const ttfToWoff = () => {
  return (
    gulp /** Поиск шрифтов [.ttf] и конвертация в [.woff2] */
      .src(`${filePaths.srcFolder}/vendor/fonts/*.ttf`, {})
      .pipe(plugins.handleError('FONTS'))
      .pipe(ttf2woff2())
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
      /** Поиск шрифтов [.woff, .woff2] и выгрузка в финальную папку */
      .pipe(gulp.src(`${filePaths.srcFolder}/vendor/fonts/*.{woff,woff2}`))
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
  );
};

const fontStyle = () => {
  const fontStylesFile = `${filePaths.srcFolder}/styles/fonts.scss`;
  if (!fs.existsSync(fontStylesFile)) {
    return gulp
      .src(`${filePaths.srcFolder}/vendor/fonts/*`, {})
      .pipe(gulp.dest(`${filePaths.build.fonts}`))
      .pipe(
        fontfaceGen({
          filepath: `${filePaths.srcFolder}/styles/`,
          filename: 'fonts.scss',
          destpath: '../fonts',
        })
      );
  } else {
    /** Предупреждение, если файл есть - его нужно удалить */
    console.log(chalk.bold.white.bgGreenBright(`Файл ${filePaths.srcFolder}/styles/fonts.scss уже существует.\nДля обновления файла его нужно удалить!`));
  }
  return gulp.src(filePaths.srcFolder);

  function cb(err) {
    if (err) {
      console.log(chalk.bold.white.bgRed('Ошибка записи файла: '), err);
    } else {
      console.log(chalk.bold.white.bgGreenBright('[Файл fonts.scss успешно записан]'));
    }
  }
};

export { otfToTtf, ttfToWoff, fontStyle };
