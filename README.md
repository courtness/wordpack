# Wordpack

----
## Wordpress + Webpack 4

My baseline WIP for new Wordpress projects using Webpack 4. Includes:

- Browsersync proxy
- Hot reloads
- JS chunk/hash config, CSS post-processing
- Auto-injection of compiled source to EJS/PHP

Comprised only of the Wordpress `/wp-content/themes/wordpack` folder; requires all other Wordpress folders be extracted at the root dir (see below) and 'wordpack' as the theme name.


## Installation


Grab the latest.zip from wordpress.org and extract all folders except `wp-content` to the Wordpack root dir. Add `wp-config.php` and configure with DB as normal.

Next, configure: 

```
/wp-content/themes/wordpack/config/webpack.config.js
```

with the target proxy address for your local WP server (e.g. MAMP). 

The theme name can also be updated in this file, along with the `/wp-content/themes/wordpack` directory itself, and all underlying matches in the code. I'll write a script for this eventually.

Lastly:

```
cd /wp-content/themes/wordpack
yarn install
```

The `scripts` in `package.json` describe how to watch/build the theme core:

```
yarn watch
```

will start the BS proxy, while:


```
yarn build
```

will compile optimized assets, both using `dist/` as the target location.
