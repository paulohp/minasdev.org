/**
 * DocPad Configuration File
 * http://docpad.org/docs/config
 */

var docpadConfig = {

  templateData: {
    site: {

      // The default title of our website.
      title: "minasdev.org",

      // The production url of our website.
      url: "http://minasdev.org",

      // The website description (for SEO).
      description: "Somos um Movimento que visa fomentar o cenário de desenvolvimento de Minas Gerais. Faça parte também!",

      // The website keywords (for SEO) separated by commas
      keywords: "minasdev, minas, usergroup, programming, development",

      // The cascading stylesheets for the site.
      styles: [
        "styles/main.css"
      ],

      // The JavaScript files for the site.
      scripts: [
        "scripts/main.js"
      ]

    }
  },
  plugins: {
    stylus:{
      stylusLibraries:{
        nib: false
      },
      stylusOptions:{
        compress: true,
        'include css': true
      }
    }
  }
};

module.exports = docpadConfig;
