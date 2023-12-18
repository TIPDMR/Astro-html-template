import gulp from 'gulp';
import { filePaths } from './gulp/config/paths.js';
import { plugins } from './gulp/config/plugins.js';

/**
 * Импорт задач
 */
import { copyStatic } from './gulp/tasks/copy.js';
import { copyRootFiles } from './gulp/tasks/copyRootFiles.js';
import { reset } from './gulp/tasks/reset.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { javaScript } from './gulp/tasks/javaScript.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
import { lintHtml, twigTask } from './gulp/tasks/twig.js';
// import { zip } from './gulp/tasks/zip.js';
// import { ftp } from './gulp/tasks/ftp.js';

const isBuild = process.argv.includes('--build');
const isDev = !process.argv.includes('--build');

/**
 * Наблюдатель за изменениями в файлах
 */
function watcher() {
  gulp.watch(filePaths.watch.static, copyStatic);
  gulp.watch(filePaths.watch.twig, twigTask);
  gulp.watch(filePaths.watch.scss, scss);
  gulp.watch(filePaths.watch.js, javaScript);
  gulp.watch(filePaths.watch.images, images);
}

/**
 * Последовательная обработка шрифтов
 * */
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
const twig = gulp.series(twigTask, lintHtml);

/**
 * Параллельные задачи в режиме разработки
 * */
const devTasks = gulp.parallel(copyStatic, copyRootFiles, scss, javaScript, images);

/**
 * Основные задачи
 * */
const mainTasks = gulp.series(fonts, devTasks, twig);

/**
 * Построение сценариев выполнения задач
 * */
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
//const deployZIP = gulp.series(reset, mainTasks, zip);
//const deployFTP = gulp.series(reset, mainTasks, ftp);

/**
 * Выполнение сценария по умолчанию
 * */
gulp.task('default', dev);

/**
 * Экспорт сценариев
 * */
//export { dev, build, deployZIP, deployFTP, createSvgSprite, isBuild, isDev };
export { dev, build, isBuild, isDev };
