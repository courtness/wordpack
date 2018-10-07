# Wordpack

----
## Wordpress + Webpack 4

My baseline WIP for new Wordpress projects using Webpack 4. Includes:

- Browsersync proxy
- Hot reloads
- JS chunk/hash config, CSS post-processing
- Wordpress chunk enqueues

Comprised only of the `/wp-content/themes/wordpack`; assumes 'wordpack' as the theme name.


## Installation


Requires Wordpress be extracted at the root dir, with `wp-config.php` configured with DB credentials. 

Next configure: 

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

Will start the BS proxy, while:


```
yarn build
```

Will build optimized assets.
