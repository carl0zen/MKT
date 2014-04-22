 // configuration for underscores template syntax

  _.templateSettings = {
      evaluate:    /\{\{(.+?)\}\}/g,
      interpolate: /\{\{=(.+?)\}\}/g,
      escape:      /\{\{-(.+?)\}\}/g
  };

  // Defining the site root to reference it later on in every list call made by the app
  window.siteRoot = '/publishing/Mexico/MKTDev/';