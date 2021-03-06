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
      url: "http://example.com",

      // The website description (for SEO).
      description: "When your website appears in search results in say Google, the text here will be shown underneath your website's title.",

      // The website keywords (for SEO) separated by commas
      keywords: "place, your, website, keywoards, here",

      // The cascading stylesheets for the site.
      styles: [
        "main.css"
      ],

      // The JavaScript files for the site.
      scripts: [
        "main.js"
      ]
    }
  }
};

module.exports = docpadConfig;
