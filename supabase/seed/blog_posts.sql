-- Imports the posts from the old portfolio. Run it in the Supabase SQL editor after 0001_posts.sql.
-- Safe to re-run: existing posts with the same slug are updated.

insert into public.posts (slug, title, description, content_html, og_image_url, status, published_at)
values
  ('4-best-mobile-code-editor-in-android', '4 best mobile code editors for Android', 'A look at four Android code editors (Acode, Spck, Code Editor and VHEditor), with the pros and cons of each.', '<h2>Which mobile code editor is best?</h2>
<h2>1. <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.foxdebug.acodefree">Acode - powerful code editor</a></h2>
<p>Acode is a lightweight yet powerful code editor and web IDE for Android. You can use it to edit HTML, JavaScript and plain text. You can build a website, run it in the browser, and see errors and logs in the console.
It can also edit almost any kind of source file, like Python, CSS, HTML, Java, JavaScript, Dart and more.</p>
<p>This is my favorite code editor, especially if you focus on web development, but you can also work in the other languages listed in its description.</p>
<p><img src="https://play-lh.googleusercontent.com/u3KhEj30dwX2t3wxAY7GHePIIspYeOoQuEazA9PMlEYrKK6D1BgPEI0ySEgWApzU4B4=w1304-h669-rw" alt="Preview"></p>
<h3>Pros</h3>
<ul>
<li>Excellent workspace</li>
<li>Framework templates</li>
<li>Supports Emmet</li>
<li>Lightweight</li>
<li>Convenient quick tools</li>
<li>Works great alongside Termux</li>
<li>FTP support</li>
<li>Syntax highlighting for 100+ programming languages</li>
</ul>
<h3>Cons</h3>
<ul>
<li>Code completion is outdated</li>
</ul>
<h2>2. <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=io.spck">Spck Code Editor / JS Sandbox / Git Client</a></h2>
<p>Spck Editor lets you write code whenever and wherever you want. Quickly change code snippets, preview them, and commit to any Git repository, all with this tiny (but powerful) JavaScript IDE. There&#39;s no need to compromise when developing on your Android device. Clone from GitHub, GitLab, Bitbucket, AWS CodeCommit, Azure DevOps and more, then make commits and push them from your phone.</p>
<p>Spck Editor uses Monaco, the editor that powers VS Code, so it has similar features. Monaco isn&#39;t really built for mobile, but the Spck team made it work well on phones.</p>
<p><img src="https://play-lh.googleusercontent.com/jVXUG7PUnN8OQhbDCQKOiRlyNR7ckar9y8Oye4m-7b3WF5THxzErnCoLTNybfE0btPc=w1304-h669-rw" alt="Preview"></p>
<h3>Pros</h3>
<ul>
<li>Rich IntelliSense</li>
<li>Lots of templates</li>
<li>Better code completion</li>
<li>Lightweight</li>
<li>Convenient quick tools</li>
<li>Excellent debugging tools</li>
<li>Git source control</li>
<li>Supports Emmet</li>
</ul>
<h3>Cons</h3>
<ul>
<li>Can&#39;t work directly on device storage</li>
<li>Sometimes crashes</li>
</ul>
<h2>3. <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.rhmsoft.code">Code Editor</a></h2>
<p>Code Editor is an optimized text editor focused on coding. It&#39;s a handy tool for development on Android, with the features you need for coding, including syntax highlighting, auto-indentation, code assist and auto-completion.</p>
<p>Code Editor is similar to Acode because both use the same editor library, Ace.</p>
<p><img src="https://play-lh.googleusercontent.com/pje2UOJEt-v96zfQ-JsXvYSjRkcj7PbLcshjG9UYR2goSct2xWpmCTMkWPez7AQKpA=w1304-h669-rw" alt="Preview"></p>
<h3>Pros</h3>
<ul>
<li>Excellent debugging tools</li>
<li>Access files from Google Drive, Dropbox and OneDrive</li>
<li>Supports Emmet</li>
<li>Accessible themes</li>
</ul>
<h3>Cons</h3>
<ul>
<li>The workspace isn&#39;t great</li>
<li>Ads</li>
</ul>
<h2>4. <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=vn.vhn.vsc">VHEditor - Programming on Android</a></h2>
<p>VHEditor runs code-server on your device, so you can use VS Code directly on your phone. It&#39;s essentially a port of VS Code for Android. It&#39;s best if you have an external keyboard and mouse; if you don&#39;t, it isn&#39;t worth downloading.</p>
<p><img src="https://play-lh.googleusercontent.com/sMJzdLn9iRdpLer-ExOcLzuxkjt9QR6hJdgYWiKwiAY4QjCO6pILSCaUVmipNUOBev8=w1304-h669-rw" alt="Preview"></p>
<h3>Pros</h3>
<ul>
<li>Similar to VS Code</li>
<li>A great port if you have an external keyboard and mouse</li>
</ul>
<h3>Cons</h3>
<ul>
<li>Doesn&#39;t work very well on touch screens</li>
<li>Heavy app</li>
<li>Might not run on low-end phones</li>
</ul>', 'https://dbwgapw6amg93.cloudfront.net/wp-content/uploads/2015/12/Hero-self-program.jpg', 'published', '2021-01-26T12:00:00.000Z'),
  ('custom-dialogs-using-javascript', 'Custom dialogs using calerts', 'How to create custom alerts and dialogs in JavaScript with calerts, a lightweight library with no extra dependencies.', '<p>Building custom dialogs from scratch is time-consuming, and you don&#39;t want to spend your time building your own. In this post, I&#39;m introducing my own package, <strong><a rel="noopener noreferrer" href="https://npmjs.com/package/calerts">calerts</a></strong>. I know there are a lot of dialog libraries out there, but I recommend calerts because it&#39;s lightweight and has no extra dependencies.</p>
<h2>Installation</h2>
<pre><code class="language-bash">$ npm i calerts
</code></pre>
<p>or embed it in your HTML:</p>
<pre><code class="language-html">&lt;script src=&quot;https://unpkg.com/calerts&quot;&gt;&lt;/script&gt;
</code></pre>
<h2>How to use it</h2>
<pre><code class="language-html">&lt;button onclick=&quot;calert(&#39;You clicked&#39;)&quot;&gt;Try Me&lt;/button&gt;
&lt;button onclick=&quot;calert(&#39;Title&#39;,&#39;TextHere&#39;)&quot;&gt;Try me&lt;/button&gt;

&lt;!-- With Icon  --&gt;

&lt;button onclick=&quot;calert(&#39;Success&#39;,&#39;I am success&#39;,&#39;success&#39;)&quot;&gt;Successful&lt;/button&gt;
&lt;button onclick=&quot;calert(&#39;Error Occured&#39;,&#39;I am error&#39;,&#39;error&#39;)&quot;&gt;Error&lt;/button&gt;
&lt;button onclick=&quot;calert(&#39;Maintenance&#39;,&#39;&#39;,&#39;warning&#39;)&quot;&gt;Warning&lt;/button&gt;
</code></pre>
<p>Try the buttons live in the <a rel="noopener noreferrer" href="https://calert.vercel.app">calerts documentation</a>.</p>
<h3>calerts can do a lot more, so check out the documentation</h3>
<blockquote>
<p>To learn more, visit the <a rel="noopener noreferrer" href="https://calert.vercel.app">calerts documentation</a>.</p>
</blockquote>', 'https://calert.vercel.app/logo.svg', 'published', '2021-01-31T12:00:00.000Z'),
  ('how-i-start-in-coding', 'How I started coding', 'My story of how I started learning web development, and where I think beginners should start.', '<p>Back when I didn&#39;t know anything about programming, a friend started talking about it. I didn&#39;t understand what he was saying at the time, but I was curious and wanted to know more. So I searched for the basics and watched short YouTube videos about where to start, which language to learn first, and even some IT fundamentals. In this post, I&#39;ll answer those same questions to guide you.</p>
<h2>How I started coding</h2>
<ul>
<li>First, I watched some YouTube videos to motivate myself.</li>
<li>Then I learned <strong>HTML</strong> and <strong>CSS</strong>. I spent almost two weeks getting comfortable with both.</li>
<li>After that, I learned the basics of JavaScript. This is where real programming begins, and it&#39;s only the start: like mathematics, it has <strong>operators</strong>, <strong>statements</strong> and <strong>problem solving</strong>.</li>
</ul>
<h2>So, where should I start? 🤔</h2>
<ul>
<li>I highly recommend learning <strong>HTML</strong> first, whether you want to be a back-end or front-end developer.</li>
<li>After HTML, learn <strong>CSS</strong> to style your web pages.</li>
<li>Then learn <strong>JavaScript</strong> for interactivity.</li>
</ul>
<p>Spend <strong>2–3</strong> months at <strong>3–5</strong> hours a day, and you&#39;ll get comfortable with all three sooner than you think.</p>
<blockquote>
<p>While learning, also keep an eye on which technologies are popular these days.</p>
</blockquote>', 'https://picsum.photos/id/5/400/400', 'published', '2021-01-24T12:00:00.000Z'),
  ('how-to-run-mongodb-on-android', 'How to run MongoDB on Android', 'Run a MongoDB database on your Android phone with Dory, then connect to it from a client app or from Node.js with Mongoose.', '<p><strong>MongoDB</strong> (from &quot;humongous&quot;) is a free, open-source, cross-platform, document-oriented database. Classified as a NoSQL database, MongoDB stores data as JSON-like documents with optional schemas.</p>
<p>As a web developer, I don&#39;t always have a laptop with me, so I wondered: what if I tried coding on my phone? It turns out there&#39;s a great way to run MongoDB on Android, alongside <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.foxdebug.acodefree&amp;hl=en&amp;gl=us">Acode</a>. Acode is my top choice for editing code; it has all the features you need and an excellent workspace.</p>
<h2>How to run MongoDB on Android</h2>
<ul>
<li>Download <strong><a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=io.tempage.dorymongo">Dory MongoDB</a></strong> from the Play Store.</li>
<li>Open the app and keep the mode set to <strong>default</strong>.</li>
<li>Tap the play icon in the bottom right.</li>
<li>Done! Your MongoDB database is running.</li>
</ul>
<h3>Connect with a MongoDB client</h3>
<p>Try connecting to the database with a MongoDB client. I personally use <strong><a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.mongolime.app">Mongo Lime</a></strong> because it has everything I need, even though it&#39;s a paid app.</p>
<h3>Connect from Node.js with Mongoose</h3>
<pre><code class="language-javascript">import mongoose from &#39;mongoose&#39;

mongoose
  .connect(&#39;mongodb://localhost:27017/demo&#39;, {
    useNewUrlParser: true, // See the Mongoose docs if these options are new to you
    useUnifiedTopology: true,
  })
  .then(() =&gt; console.log(&#39;MongoDB connected&#39;))
</code></pre>
<blockquote>
<p>Run this with <strong>Termux</strong> on Android.</p>
</blockquote>
<p>If you don&#39;t know how to run Node.js on Android, read <a rel="noopener noreferrer" href="/blog/how-to-run-nodejs-in-android/">How to install Node.js on Android</a>.</p>', 'https://cdn.worldvectorlogo.com/logos/mongodb.svg', 'published', '2021-01-24T12:00:00.000Z'),
  ('how-to-run-nodejs-in-android', 'How to run Node.js on Android', 'Install and run Node.js on your Android phone in a few commands using Termux.', '<h2>Node.js on Android? 😱</h2>
<p>Follow these steps:</p>
<ul>
<li>Obviously, you need an Android phone.</li>
<li>Download <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.termux.app">Termux</a> from the Play Store.</li>
<li>Once it&#39;s installed, open it and run the commands below.</li>
</ul>
<p>First, update the packages:</p>
<pre><code class="language-bash">$ apt update &amp;&amp; pkg upgrade
</code></pre>
<p>Type <code>y</code> whenever you see a <strong>[y/n]</strong> prompt.</p>
<p>Once the packages are updated, install Node.js:</p>
<pre><code class="language-bash">$ pkg install nodejs-lts
</code></pre>
<blockquote>
<p>I recommend the LTS version because it&#39;s more stable.</p>
</blockquote>
<p>After Node.js is installed, check its version to confirm it installed successfully:</p>
<pre><code class="language-bash">$ node -v
v12.13.1
</code></pre>', 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg', 'published', '2021-01-25T12:00:00.000Z'),
  ('how-to-start-coding-using-mobile', 'How to start coding on your phone', 'No laptop yet? Here''s how to start learning to code using just your phone.', '<p>If you don&#39;t have a laptop or computer yet, use your phone to start coding. Stop wasting time on your phone and make it productive instead. Don&#39;t just sit there wondering, &quot;When will my parents buy me a computer?&quot; I actually started coding on my phone. I know it&#39;s hard at first to type on a small keyboard, but you&#39;ll get used to it. Phones are everywhere, and there are plenty of apps and resources to help you learn to code. In this post, I&#39;ll show you how to start coding on your phone.</p>
<p>If you&#39;re a complete beginner, I recommend reading <a rel="noopener noreferrer" href="/blog/how-i-start-in-coding/">How I started coding</a> first. It will help you figure out where to start.</p>
<h2>What you need to start coding</h2>
<ul>
<li>A code editor</li>
</ul>
<p>If you&#39;re into web development, I recommend <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.foxdebug.acodefree&amp;hl=en&amp;gl=us">Acode</a>. You can also use it for C++, Java, PHP and more alongside <strong>Termux</strong>. If you don&#39;t like it, any code editor from the Play Store will do.</p>
<p>Once you&#39;ve downloaded a code editor, open it and start coding.</p>', 'https://www.svgrepo.com/show/74240/code-symbol-button-on-phone-screen.svg', 'published', '2021-01-26T12:00:00.000Z'),
  ('how-to-validate-form-easily-on-javascript', 'How to validate forms in JavaScript', 'Validate forms in JavaScript without piles of if/else statements, using a schema with the json-msg library, plus a React example.', '<p>Form validation is very important in web development, but it can get messy when you validate every input by hand. It quickly turns into a pile of if/else statements, and that&#39;s not what we want. In this post, I&#39;ll show you how to validate forms in JavaScript the easy way.</p>
<h2>The package you need</h2>
<p>I use my own package, <strong><a rel="noopener noreferrer" href="https://json-msg.vercel.app">json-msg</a></strong>. Visit the documentation to learn more about it. If you&#39;re familiar with Joi, this should feel easy.</p>
<h2>Installation</h2>
<pre><code class="language-bash">$ npm i json-msg
</code></pre>
<h2>Usage</h2>
<h3>First, define a schema</h3>
<pre><code class="language-javascript">import jm from &#39;json-msg&#39;

const schema = {
  username: jm.str({ min: 4, max: 255 }),
  password: jm.str({ min: 8, max: 50 }),
  confirmPass: jm.sameAs(&#39;password&#39;),
}

const data = {
  username: &#39;xxx&#39;,
  password: &#39;12345&#39;,
  confirmPass: &#39;asdfg&#39;,
}

// Validate it
jm.validate(data, schema, { abortEarly: false })

// Result
{
  username: &quot;username characters length must be greater than 4&quot;,
  password: &quot;password characters length must be greater than 8&quot;,
  confirmPass: &quot;confirmPass must be the same as password&quot;
}
</code></pre>
<p>As you can see, validating an object is easy with json-msg: you define a schema for your data and pass the data in to validate it. You can use it on both the back end and the front end, for example to validate data before saving it to the database.</p>
<h3>How to use it in React</h3>
<blockquote>
<p>The form needs to be a controlled component, with the input values stored in state.</p>
</blockquote>
<h3>This is how I do it</h3>
<pre><code class="language-javascript">import React, { useState } from &#39;react&#39;
import jm from &#39;json-msg&#39;

const Contact = () =&gt; {
  const [data, setData] = useState({
    name: &#39;&#39;,
    email: &#39;&#39;,
    message: &#39;&#39;,
  })
  const [error, setError] = useState({})

  const dataSchema = {
    name: jm.str({ min: 4, max: 20, alphanum: true }),
    email: jm.str({ email: true, max: 50 }),
    message: jm.str({ min: 10, max: 255 }),
  }

  function handleChange({ target }) {
    const value = target.value
    setData((prevData) =&gt; ({ ...prevData, [target.name]: value }))
    const error = jm.validate(value, dataSchema[target.name])
    setError((prevError) =&gt; ({ ...prevError, [target.name]: error }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errors = jm.validate(data, dataSchema, { abortEarly: false })
    if (errors) return setError(errors)
    setError({})
    setData({ name: &#39;&#39;, email: &#39;&#39;, message: &#39;&#39; })
  }

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;h1&gt;Contact&lt;/h1&gt;
      &lt;div className=&quot;input&quot;&gt;
        &lt;input onChange={handleChange} value={data.name} name=&quot;name&quot; /&gt;
        {error.name &amp;&amp; &lt;div className=&quot;alert alert-error&quot;&gt; {error.name} &lt;/div&gt;}
      &lt;/div&gt;
      &lt;div className=&quot;input&quot;&gt;
        &lt;input onChange={handleChange} value={data.email} name=&quot;email&quot; /&gt;
        {error.email &amp;&amp; (
          &lt;div className=&quot;alert alert-error&quot;&gt; {error.email} &lt;/div&gt;
        )}
      &lt;/div&gt;
      &lt;div className=&quot;input&quot;&gt;
        &lt;textarea
          value={data.message}
          onChange={handleChange}
          name=&quot;message&quot;
        &gt;&lt;/textarea&gt;
        {error.message &amp;&amp; (
          &lt;div className=&quot;alert alert-error&quot;&gt; {error.message} &lt;/div&gt;
        )}
      &lt;/div&gt;

      &lt;button&gt;Send&lt;/button&gt;
    &lt;/form&gt;
  )
}

export default Contact
</code></pre>', 'https://www.positronx.io/wp-content/uploads/2020/06/jquery-form-validation-10131-03.jpg', 'published', '2021-01-26T12:00:00.000Z'),
  ('ripple-effects-in-just-one-line-of-code', 'Ripple effects with just one line of JavaScript', 'Add Material-style ripple effects to buttons and links with one line of code using the ripple-effects library.', '<p>UI matters: it can attract more customers and visitors to your website, and effects make a site feel polished and engaging. In this post, I&#39;ll show you how to add ripple effects to your website with just one line of code.</p>
<h2>Prerequisite</h2>
<ul>
<li>The <strong><a rel="noopener noreferrer" href="https://www.npmjs.com/package/ripple-effects">ripple-effects</a></strong> library</li>
</ul>
<blockquote>
<p>Follow the link to learn more about ripple-effects.</p>
</blockquote>
<p>Install the <strong>ripple-effects</strong> package from npm:</p>
<pre><code class="language-bash">$ npm i ripple-effects
</code></pre>
<p>or load it from unpkg:</p>
<pre><code class="language-html">&lt;script src=&quot;https://unpkg.com/ripple-effects&quot;&gt;&lt;/script&gt;
</code></pre>
<h2>Usage</h2>
<p>In the browser:</p>
<pre><code class="language-html">&lt;button class=&quot;btn&quot;&gt;Ripple&lt;/button&gt;
&lt;script&gt;
  ripple(&#39;.btn&#39;)
&lt;/script&gt;
</code></pre>
<h3>See the demo</h3>
<p><a rel="noopener noreferrer" href="https://codepen.io/darkcris1/pen/zYoOWrO">Open the ripple effect demo on CodePen</a></p>', 'https://i.ytimg.com/vi/QI2rDHQM5Pc/maxresdefault.jpg', 'published', '2021-01-28T12:00:00.000Z'),
  ('sveltejs-the-future-framework', 'Svelte is better than React', 'Why I prefer Svelte over React and Vue: less code, no virtual DOM and smaller bundles, with a side-by-side counter example.', '<p>A lot of frameworks are popular these days, especially <strong>React</strong>, which Facebook released in 2013 and which dominates the market. (I know React is technically a library, especially if you use plain JavaScript instead of JSX.) React is mature, and tons of websites are built with it. But it still has drawbacks, especially its size. Many people say &quot;<strong>React is a lightweight library</strong>,&quot; but I&#39;m not so sure 🤔. How is React lightweight when <strong>React DOM</strong> alone is almost <strong>110 KB</strong> minified? Plenty of people complain about this too: loading a React site for the first time and staring at a spinner for 5 seconds or more on a slow connection is an annoying experience.</p>
<p>After learning React, I tried <strong>Vue</strong>, but I wasn&#39;t satisfied with it. It felt weird to put logic inside strings instead of curly braces like I do in React. Then I found <strong>Svelte</strong>. At first I doubted its capabilities and disliked it at first sight, because of some syntactic sugar I didn&#39;t like. But after trying it, I have nothing bad to say: everything works well and as expected.</p>
<h3>What I like about Svelte</h3>
<ul>
<li>Easy to learn</li>
<li>Reactivity</li>
<li>No virtual DOM</li>
<li>Performant</li>
<li>Small bundle size</li>
<li>Less code</li>
<li>Easy animations without third-party libraries</li>
</ul>
<h2>Comparing Svelte and React with a simple counter</h2>
<h3>Svelte</h3>
<pre><code class="language-html">&lt;script&gt;
  let counter = 0
&lt;/script&gt;

&lt;button on:click={()=&gt; counter++}&gt;
  {counter}
&lt;/button&gt;
</code></pre>
<h3>React</h3>
<pre><code class="language-js">import { useState } from &#39;react&#39;

function Counter() {
  const [count, setCount] = useState(0)

  return &lt;button onClick={() =&gt; setCount(count + 1)}&gt;{count}&lt;/button&gt;
}

export default Counter
</code></pre>
<p>As you can see, Svelte lets you write less code, much like jQuery&#39;s old motto, &quot;write less, do more.&quot;
In React you have to export each component yourself, but in Svelte every component is exported automatically, following the rule of one component per file.</p>
<h2>Conclusion</h2>
<p>Popularity aside, Svelte is the clear winner for me. As a web developer, the simpler the framework, the faster my workflow, and Svelte gives me exactly that. I now use Svelte in some of my projects, and everything works as expected. I highly recommend it; it changed how I work as a programmer.</p>', 'https://github.com/sveltejs/branding/blob/master/svelte-logo.svg?raw=true', 'published', '2021-01-24T12:00:00.000Z')
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  content_html = excluded.content_html,
  og_image_url = excluded.og_image_url,
  status = excluded.status,
  published_at = excluded.published_at;
