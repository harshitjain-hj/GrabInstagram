let cheerio = require("cheerio");
let request = require("request");

module.exports = (req, res) => {
  let feed_url = req.query.url;
  console.log(JSON.stringify(req.query));
  if (feed_url !== undefined) {
    if (
      feed_url.substring(0, 8) === "https://" ||
      feed_url.substring(0, 7) === "http://" ||
      feed_url.substring(0, 21) === "https://www.instagram" ||
      feed_url.substring(0, 20) === "http://www.instagram.com"
    ) {
      request(feed_url, (error, response, html) => {
        if (!error) {
          console.log("Insta_grab : " + feed_url + " : Loaded");
          let $ = cheerio.load(html);

          // $("meta").each(function (ind, obj) {
          //   console.log(
          //     $(this).attr("property") + " - " + $(this).attr("content")
          //   );
          // });

          //basic data from the meta tags
          let title = $('meta[property="og:title"]').attr("content");
          let image_link = $('meta[property="og:image"]').attr("content");
          let description = $('meta[property="og:description"]').attr(
            "content"
          );
          let url = $('meta[property="og:url"]').attr("content");
          let file = $('meta[property="og:type"]').attr("content");
          let video_link = $('meta[property="og:video"]').attr("content");
          let type = $('meta[property="og:type"]').attr("content");
          let video_type = $('meta[property="og:video:type"]').attr("content");
          let video_width = $('meta[property="og:video:width"]').attr(
            "content"
          );
          let video_height = $('meta[property="og:video:height"]').attr(
            "content"
          );
          let tags = [];

          $('meta[property="video:tag"]').each(function (ind, obj) {
            tags.push($(this).attr("content"));
          });

          res.status(200).json({
            title,
            image_link,
            description,
            url,
            file,
            video_link,
            type,
            video_type,
            video_type,
            video_width,
            video_height,
            tags,
          });
        } else {
          res.status(400).json({ message: "Error, Unable to load webpage" });
        }
      });
    } else {
      res.status(201).json({ message: "Invalid URL" });
    }
  } else {
    res.status(400).json({ message: "Provided invalid URL" });
  }
};
