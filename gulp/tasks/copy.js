import gulp from 'gulp';
import { filePaths } from '../config/paths.js';

const copyStatic = () => {
  return gulp.src(filePaths.src.static).pipe(gulp.dest(filePaths.build.static));
};
const copyFonts = () => {
  return gulp.src(filePaths.src.static).pipe(gulp.dest(filePaths.build.static));
};
export { copyStatic, copyFonts };
