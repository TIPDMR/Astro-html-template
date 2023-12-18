import gulp from 'gulp';
import path from 'path';
import twig from 'gulp-twig';
import htmlbeautify from 'gulp-html-beautify';
import bemlinter from 'gulp-html-bemlinter';
import data from 'gulp-data';
import htmlMin from 'gulp-htmlmin';
import { htmlValidator } from 'gulp-w3c-html-validator';
import fs from 'fs';

import { isBuild } from '../../gulpfile.js';
import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const htmlbeautifyOptions = {
  indentSize: 4,
  unformatted: ['abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text', 'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt', 'a'],
  indent_level: 1,
  indent_with_tabs: true,
};

const twigTask = () => {
  return gulp
    .src(filePaths.src.twig)
    .pipe(plugins.handleError('TWIG'))
    .pipe(
      data(function (file) {
        console.log(filePaths.src.twigSrc + path.basename(file.path));
        return JSON.parse(fs.readFileSync(filePaths.src.twigSrc + path.basename(file.path) + '.json'));
      })
    )
    .pipe(twig({ base: './src/twig/pages/' }))
    .pipe(htmlbeautify(htmlbeautifyOptions))
    .pipe(
      htmlMin({
        useShortDoctype: true,
        sortClassName: true,
        removeComments: isBuild,
        /** Раскомментировать если требуется минификация html */
        collapseWhitespace: isBuild,
      })
    )
    .pipe(gulp.dest(filePaths.build.twig))
    .pipe(plugins.browserSync.stream());
};

const lintHtml = () =>
  gulp
    .src(`{${filePaths.build.html},static}/**/*.html`)
    .pipe(plugins.handleError('LintHtml'))
    .pipe(htmlValidator.analyzer({ ignoreMessages: /^Trailing slash/ }))
    .pipe(htmlValidator.reporter({ throwErrors: isBuild }))
    .pipe(bemlinter());
export { twigTask, lintHtml };
