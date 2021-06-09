---
layout: work_detail
image_src: /work/slack.svg
title: "Slack"
headline: "Slack"
subheadline: "In my time at Slack I worked on various infrastructure, and led the mobile design systems framework team."
buttons:
  - title: "View In App Store"
    url: "https://apps.apple.com/us/app/slack/id618783545"
  - title: "Visit Website"
    url: "https://slack.com/"
detail_items:
  - title: "Autocomplete & Search"
    description: |
      Building out a new Autocomplete & Search / 'Jump-To' experience for Slack was a fun project! Performance and offline support were top of mind.

      In case you're curious, autocomplete involves tagging people, channels, etc.
    image_src: "/work/slack/search.svg"
  - title: "Database Streaming API"
    description: |
      To prepare Slack for lazy-loading data like users and channels, we couldn't rely on synchronous assumptions.

      The 'data providers' stream all sorts of models, composing the object graph internally so that feature teams don't have to!
    image_src: "/work/slack/database.svg"
  - title: "Design System"
    description: |
      Components ranging from something as small as a button, to a performant declarative, data-driven list.

      A 'Playground' executable is bundled for internal eyes only, allowing engineers, product, and design to explore the library of components.
    image_src: "/work/slack/shapes.svg"
---