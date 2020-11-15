# SportNews
A protorype of a sport website appfor a master's thesis

Application written to present the amenities and simplicity of the website

### <ul>Currently, the application includes:
<li>Browsing the website</li>
<li>Adding, editing and removing articles (administration module)</li>
<li>Adding, editing and removing editors</li>
<li>change of font size</li>
<li>change of contrast</li>
</ul>

### <ul>To be done or improved
<li>small problems with changing the menu in mobile mode(the belt is not working properly)</li>
<li>adding, editing or removing social media links has not been implemented (administration module)</li>
<li>more permissions for individual journalists</li>
<li>clear structure and unused classes</li>
</ul>

### <ul>The application consists mainly of 3 main modules:
<li>SportApi - communication interface (written in C#) </li>
<li>SportDatabase - auxiliary module for SportApi, it is used for communication with the internal database(written in C#) </li>
<li>SportWeb - website written in Angular technology (TypeScript/JavaScript)
</ul>

### <ul>The application also uses external Api returning:
<li>https://www.thesportsdb.com/api.php - football</li>
<li>https://allsportsapi.com/ -basketball (authorization token required)</li>
<li>https://english.api.rakuten.net/sportcontentapi/api/tennis-live-data -tennis (authorization token required)</li>
</ul>
*For proper operation, it is necessary to place authorization tokens available after registering on the indicated websites

## Example picture
<br>
Article:
![Image of the article](/exampleScreen/article.png)
source article: www.polsatsport.pl
<hr/>

Contrast page:
![Image with contrast page](/exampleScreen/contrast.png)

LogIn page:
![Image with log in page](/exampleScreen/logIn.png)

Module Admin page:
![Image with admin module page](/exampleScreen/moduleAdmin.png)
