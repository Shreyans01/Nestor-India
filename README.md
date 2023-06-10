# Nirmalshree

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



<!-- Things added to optimize the Application  -->
<!-- 1. AOT
2. SEO
3. Optimization packages -->

<!-- Package json script in package json 
"build-optimize-seo":"ng build --prod --stats-json" -->


<!-- Added the Script into the .htaccess file to gzip the webpacks
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
</IfModule> -->




<!-- .htAccess File  -->



<!-- # php -- BEGIN cPanel-generated handler, do not edit
# Set the “ea-php70” package as the default “PHP” programming language.
#<IfModule mime_module>
#  AddHandler application/x-httpd-ea-php70 .php .php7 .phtml
#</IfModule>
# php -- END cPanel-generated handler, do not edit




#RewriteEngine on
#RewriteCond %{HTTP_HOST} ^nestorindia.com [NC]
#RewriteRule ^(.*)$ http://www.nestorindia.com/$1 [R=301,L]











# php -- BEGIN cPanel-generated handler, do not edit
# Set the “ea-php70” package as the default “PHP” programming language.
<IfModule mime_module>
  AddHandler application/x-httpd-ea-php70 .php .php7 .phtml

RewriteEngine on
RewriteCond %{HTTP_HOST} ^nestorindia.com [NC]
RewriteRule ^(.*)$ https://www.nestorindia.com/$1 [R=301,L]



RewriteCond %https://www.nestorindia.com%{REQUEST_URI} -f [OR]
  RewriteCond %https://www.nestorindia.com%{REQUEST_URI} -d
  RewriteRule ^.*$ - [NC,L]
  # Redirect all non-file routes to index.html
  RewriteRule ^(?!.*\.).*$ index.html [NC,L]

</IfModule>


#Additional script to increase the speed of the website

# php -- END cPanel-generated handler, do not edit






<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
</IfModule> -->
