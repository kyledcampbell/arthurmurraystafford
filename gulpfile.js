const gulp = require("gulp");
const {src, dest, series, watch} = require("gulp");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const origin = "src";
const destination = "build";
const fileinclude = require("gulp-file-include");

async function clean(cb) {
  await del(destination);
  cb();
}

function html(cb) {
  src(`${origin}/**/*.html`)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(destination));
  cb();
}

function css(cb) {
  src(`${origin}/styles/**/*.css`)
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(postcss([postcssPresetEnv(/* pluginOptions */)]))
    .pipe(csso())
    .pipe(dest(`${destination}/styles`));
  cb();
}

function js(cb) {
  src(`${origin}/scripts/**/*.js`)
    // .pipe(
    //   babel({
    //     presets: ["@babel/env"],
    //   })
    // )
    .pipe(terser())
    .pipe(dest(`${destination}/scripts`));
  src(`${origin}/scripts/instafeed/*`).pipe(
    dest(`${destination}/scripts/instafeed`)
  );
  cb();
}
function images(cb) {
  src(`${origin}/images/**/*`).pipe(dest(`${destination}/images`));
  cb();
}
function fonts(cb) {
  src(`${origin}/fonts/Ephesis/**/*`).pipe(
    dest(`${destination}/fonts/Ephesis`)
  );
  src(`${origin}/fonts/JosephinSans/**/*`).pipe(
    dest(`${destination}/fonts/JosephinSans`)
  );
  src(`${origin}/fonts/Montserrat/**/*`).pipe(
    dest(`${destination}/fonts/Montserrat`)
  );
  cb();
}
function txt(cb) {
  src(`${origin}/**/*.txt`).pipe(dest(destination));
  cb();
}
function xml(cb) {
  src(`${origin}/**/*.xml`).pipe(dest(destination));
  cb();
}

function redirects(cb) {
  src(`${origin}/**/_redirects`).pipe(dest(destination));
  cb();
}

exports.default = function () {
  watch(
    [
      `${origin}/**/*.html`,
      `${origin}/styles/**/*.css`,
      `${origin}/scripts/**/*.js`,
      `${origin}/partials/**/*.html`,
    ],
    series(clean, html, css, js, images, fonts, txt, xml, redirects)
  );
};

exports.build = series(
  clean,
  html,
  css,
  js,
  images,
  fonts,
  txt,
  xml,
  redirects
);
