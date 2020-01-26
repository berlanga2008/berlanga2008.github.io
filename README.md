## Set up

To get started with this project, you have to configure an `.env.development` file containing the following environment variables:

```env
SITE_URL=
WORDPRESS_API_HOST=
WORDPRESS_API_PROTOCOL=
GOOGLE_TRACKING_ID=
URL_REPLACEMENT_FROM=
URL_REPLACEMENT_TO=
```

For example:

```env
SITE_URL=https://my-gatsby-site.com
WORDPRESS_API_HOST=my-wordpress-site.com
WORDPRESS_API_PROTOCOL=https
GOOGLE_TRACKING_ID=UA-123456-78
URL_REPLACEMENT_FROM=https?:\/\/my-wordpress-site\.com\/(?!\wp-content)
URL_REPLACEMENT_TO=https://my-gatsby-site.com/
```

While most of these are self-explanatory, the `URL_REPLACEMENT_FROM` and `URL_REPLACEMENT_TO` properties are used to rewrite links within each blogpost to properly match the new location (aka the Gatsby blog). The `URL_REPLACEMENT_FROM` property should be a valid regular expression. In the example above, we're excluding URLs containing **/wp-content/** as these are usually images.

In this example, images are being replaced by looking for the proper image within Gatsby by using the source URL. If you replace the source URLs, you won't be able to use Gatsby image.

After that, you can use the following commands to run the project:

```shell
npm install
npm start
```
