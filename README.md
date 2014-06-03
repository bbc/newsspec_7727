# Newsspec-7727

Nelson Mandela Timeline - moved into the iFrame Scaffold

## Create your own timeline

Read the section "Two versions of the timeline" and follow the Google spreadsheet version instructions. See NEWSSPEC-7935 for a link to a Google spreadsheet you can base your new timeline on (and to see which spreadsheet was used to generate THIS timeline!.

## Two versions of the timeline

This project was built with reusability in mind. 

The plan is for timelines to be incorporated into IDT. As such, this project was initially developed in an IDT-friendly way, with a cohesive JSON structure and rendering script. If you're looking for that version, [go here!](https://github.com/BBCVisualJournalism/newsspec_7727_idt)

In the meantime, our requirement to provide multiple language solutions means we are still dependant on grunt-cloudfile-to-vocabs for translations and we cannot represent our data in a multidimensional way. As such, the project was retro-fitted to support Google spreadsheets and accepts data in the following format:

                                | english                                         | arabic
    introduction_headline       | MANDELA                                         | مانديلا
    panels_1_thumb_caption      | Early years                                     | السنوات الأولى
    panels_1_thumb_image        | /img/t/1.gif                                    | /img/t/1.gif
    panels_1_panel_title        | Early years                                     | السنوات الأولى
    panels_1_panel_text         | Lorem ipsum                                     | Lorem ipsum
    panels_1_panel_image_src    | /img/1.jpg                                      | /img/1.jpg
    panels_1_panel_image_alt    | Nelson Mandela pictured in 1952                 | ا في مكتبه للمحاماة عام 1952
    panels_1_panel_map          | TRUE                                            | FALSE
    panels_1_panel_map_page     | http://www.bbc.co.uk/news/world-africa-20761222 |
    panels_1_panel_map_playlist | http://playlists.bbc.co.uk/news/world-africa-20761222A/playlist.sxml  ...
    panels_1_panel_map_overlay  | play

You'll need to recreate the above structure for every panel in your carousel, replacing "1" with the number of the panel. The Grunt templating system used will automatically calculate how many panels to render.

If the panel is associated with video/audio, provide its MAP page & playlist url in the appropriate fields. If not, mark panels_NUMBER_panel_map as FALSE and the panel will only have text and image. If marked as FALSE you can also omit the fields 'panels_1_panel_map_page', 'panels_1_panel_map_playlist' and 'panels_1_panel_map_overlay' as they will not be used - but it is better to keep all the fields if there is a chance any of the languages might want a MAP asset there.

panels_1_panel_map_overlay has the value 'play' - this is intended to specify which icon to overlay on top of the placeholder image. Thus far, we only have the play icon, but this could be expanded in future for audio and other icons.

## Issues

Debug mode is not available due to the changes in architecture required in this project (e.g. missing jQuery version).
Videos will not work in the stage environment, unless the video has a matching MAP page on stage (unlikely). Similarly, placeholder images for videos will not load in the local environment because of cross-domain issues. Both should work in tandem on live.
Videos require two clicks on mobile devices, owing to data-usage restrictions that prevent autoplay from working.

## Changes to the architecture

### HTML5 support

We should start using semantic markup, but I found that in old versions of IE the buttons and inputs nested inside them would not work, and elements wouldn't render at all in even older versions of IE! Legacy support for semantic elements required a change to the architecture.

#### Changes to /source/tmpl/includes/top.tmpl

Line 179 - added a [HTML5 shiv](https://code.google.com/p/html5shiv/).

### Video

Getting video working was a pain. Bump requires the full-fat jQuery library 1.9, so I took the jquery-1.9.1 that is in the BBC shared assets and named it jquery-1.9.1-version_for_bump.js. As BUMP video is required across all browsers, it made no sense to pull in additional versions of jQuery for legacy IE and/or modern browsers, so I stripped out the dual jQuery setup and now all browsers pull in the BUMP-compatible version of jQuery.

I have outlined the changes below:

#### Changes to /tasks/

Line 17 of js.js - removed the call to requirejs:jquery2.

In require.js, removed the jquery2 task, changed the output from all-html5.js to all.js, renamed version of jquery on line 24.

#### Changes to /source/js/lib/

Wherever there was a dependency on 'jquery' I changed the dependency to 'jquery-1.9'. These files were:

* news_special/bootstrap.js
* news_special/iframemanager__frame.js
* news_special/imager.js
* vendors/jquery/pubsub.js

#### Changes to /source/tmpl/includes/bottom.tmpl

Line 45 - point to the all-encompassing JS file "all.js", which is for both modern AND legacy browsers.

Line 48 - hardcode the version of jQuery that is used in debug mode.

## iFrame scaffold

This project was built using the iFrame scaffold v1.3

## License
Copyright (c) 2014 BBC
