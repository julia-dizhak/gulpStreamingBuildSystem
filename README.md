# gulpStreamingBuildSystem
A demonstration how to use and install Gulp, the streaming build system.
<ul>
<li>http://gulpjs.com/</li>
<li>https://build-podcast.com/</li>
<li>from book Getting started with Gulp by Travis Maynard</li>
</ul>

<h2>What is gulp</h2>
<p>Gulp is a streaming JS build system built with node.js; it leverages the power of streams and code-over-configuration to automate, organize, and run development tasks very quickly and efficiently</p>

<h2>What is node.js?</h2>
<p>Node.js commonly referred to as node, is a powerful Js platform that is built on top of Google Chrome's Js runtime engine, V8. This give us the ability to write Js code on a server, or in our case, on local machine</p>
<p>Node.js ships with npm, a companion package manager that facilitates the installation, storage, and creation of modular components that you can use to create applications.</p>

<h2>Why use gulp?</h2>
<ul>
  <li>project automation</li>
  <li>streams = "pipe"</li>
  <li>code over config</li>
</ul>

<h2>Command line</h2>
<p>Command reference</p>
<ul>
  <li>ls - listening files and folders</li>
  <li>cd - changing directory / folder</li>
  <li>mkdir - making a directory</li>
  <li>touch file_name - creating a file on Mac </li>
  <li>sudo mkdir folder_name </li>
  <li></li>
</ul>

<h2>Anatomy of a gulpfile</h2>
<p>Gulp started with 4 main methods </p>
<ol>
  <li>task(string, function) method is a basic wrapper for which we create our tasks. A string value representing the name of task.</li>
  <li>.src(string || array) method is our input, or how we gain access to the source files that we plan are modifying.</li>
  <li>.watch(string, array) method is used to specifically look for changes on our files.</li>
  <li>.dest(string) method is used to set the output destination of your processed file.</li>
  <li>.pipe(function) method will allow us to pipe together smaller single-purpose plugins or applications into a pipechain.</li>
  <li>.parallel() and .series() methods as a way to easily control whether your task are ran together - all at once, on in a sequence - one after the other</li>
</ol>
<p></p>

<h2>Node.js modules</h2>
<p>Statis server</p>
<p>Browser sync - handle browser refreshing and sync up every action that is performed on your pages across any device po your local network.</p>
<p>Browserify - bundle modules</p>
<p>gulp-plumber, beeper - resolving issues</p>
