---
layout: Post  # required
title: Main Title  # post title (required)
subtitle: Subtitle  # post subtitle (optional)
date: 1996-01-01  # publish date (optional)
author: Hein Thu  # post author (optional, will use `themeConfig.personalInfo.name` as default if it is not specified)
useHeaderImage: true  # show header image in post or not (optional, default: false)
headerImage: /img/test.jpg  # path to the header image (required, even if `useHeaderImage` is false, becasue header image would also be shown on home page)
headerMask: rgba(0, 0, 0, .0)  # mask of the header image (optional)
headerImageCredit: Hein Thu  # source of the header image, like name of the author or website (optional, only works when "useHeaderImage: true")
headerImageCreditLink: https://www.google.com  # link to the source of the header image (optional, only works when "useHeaderImage: true")
catalog: true  # enable catalog or not, can rewrite `themeConfig.catalog` (optional, default: true)
hide: true  # hide this blog in the blog list of home page and tags page or not (optional, default: false)
tags:  # post tags (optional)
  - project
  - course
permalinkPattern: /post/:year/:month/:day/:slug/
---

# Template