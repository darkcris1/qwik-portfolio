import { component$ } from '@builder.io/qwik';
// Remove ThreeScene import if no longer used, or keep if used elsewhere
// import ThreeScene from './ThreeScene'; 
import { AnimatedTools } from './AnimatedToolsQwik'; // Ensure this path is correct

export default component$(() => {
  const tools = [
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg", alt: "bootstrap" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", alt: "html5" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", alt: "css3" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", alt: "tailwind" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg", alt: "sass" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", alt: "react" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/svelte/svelte-original.svg", alt: "svelte" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angular/angular-original.svg", alt: "angular" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", alt: "javascript" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", alt: "typescript" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg", alt: "nodejs" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", alt: "mongodb" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", alt: "git" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg", alt: "npm" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/yarn/yarn-original-wordmark.svg", alt: "yarn" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg", alt: "django" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", alt: "python" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/ubuntu/ubuntu-original.svg", alt: "ubuntu" },
    { src: "https://github.com/devicons/devicon/raw/master/icons/vscode/vscode-original.svg", alt: "vscode" },
    { src: "https://github.com/devicons/devicon/raw/master/icons/jira/jira-original.svg", alt: "jira" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg", alt: "postgresql" },
  ];

  return (
    <section id="tools-frameworks" class="w-full py-20 bg-gray-900 text-white overflow-hidden">
      <div class="mx-auto px-4 min-h-[50svh] w-full flex items-center justify-center flex-col">
        <h2 class="md:text-5xl text-2xl font-bold text-center mb-12">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gray-50 to-blue-700 animate-glow-medium"
          >
            Tools & Frameworks
          </span>
        </h2>

        <div class="hidden md:block">
          <AnimatedTools xDistance={-200}>
            {/* The children are now individual tool items, not a grid div */}
            <div class="flex flex-row">
            {tools.slice(0, 7).map((tool) => (
              // Each tool item needs some spacing if they are directly next to each other
              <div key={tool.alt} class="flex flex-col items-center p-4 mx-2 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <img src={tool.src} alt={tool.alt} class="md:h-16 md:w-16 h-6 w-6 mb-2" />
                <p class="text-center text-sm">{tool.alt}</p>
              </div>
            ))}
            </div>
          </AnimatedTools>
          <AnimatedTools xDistance={100}>
            {/* The children are now individual tool items, not a grid div */}
            <div class="flex flex-row">
            {tools.slice(7, 14).map((tool) => (
              // Each tool item needs some spacing if they are directly next to each other
              <div key={tool.alt} class="flex flex-col items-center p-4 mx-2 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <img src={tool.src} loading='lazy' alt={tool.alt} class="md:h-16 md:w-16 h-6 w-6 mb-2" />
                <p class="text-center text-sm">{tool.alt}</p>
              </div>
            ))}
            </div>
        
          </AnimatedTools>
          <AnimatedTools xDistance={-100}>
            {/* The children are now individual tool items, not a grid div */}
            <div class="flex flex-row">
            {tools.slice(14, 21).map((tool) => (
              // Each tool item needs some spacing if they are directly next to each other
              <div key={tool.alt} class="flex flex-col items-center p-4 mx-2 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <img src={tool.src} alt={tool.alt} class="md:h-16 md:w-16 h-6 w-6 mb-2" />
                <p class="text-center text-sm">{tool.alt}</p>
              </div>
            ))}
            </div>
          </AnimatedTools>
        </div>
        <div class="block md:hidden">
          <AnimatedTools xDistance={-200}>
            {/* The children are now individual tool items, not a grid div */}
            <div class="flex flex-row justify-between">
            {tools.slice(0, 4).map((tool) => (
              // Each tool item needs some spacing if they are directly next to each other
              <div key={tool.alt} class="flex flex-col items-center p-4 mx-2 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <img src={tool.src} alt={tool.alt} class="md:h-16 md:w-16 h-8 w-8 mb-2" />
              </div>
            ))}
            </div>
          </AnimatedTools>
          <AnimatedTools xDistance={100}>
            {/* The children are now individual tool items, not a grid div */}
            <div class="flex flex-row justify-between">
            {tools.slice(4, 8).map((tool) => (
              // Each tool item needs some spacing if they are directly next to each other
              <div key={tool.alt} class="flex flex-col items-center p-4 mx-2 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <img src={tool.src} loading='lazy' alt={tool.alt} class="md:h-16 md:w-16 h-8 w-8 mb-2" />
              </div>
            ))}
            </div>
        
          </AnimatedTools>
          <AnimatedTools xDistance={-100}>
            {/* The children are now individual tool items, not a grid div */}
            <div class="flex flex-row justify-between">
            {tools.slice(8, 12).map((tool) => (
              // Each tool item needs some spacing if they are directly next to each other
              <div key={tool.alt} class="flex flex-col items-center p-4 mx-2 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <img src={tool.src} alt={tool.alt} class="md:h-16 md:w-16 h-8 w-8 mb-2" />
              </div>
            ))}
            </div>
          </AnimatedTools>
          <AnimatedTools xDistance={20} speed={3}>
            {/* The children are now individual tool items, not a grid div */}
            <div class="flex flex-row justify-between">
            {tools.slice(12, 16).map((tool) => (
              // Each tool item needs some spacing if they are directly next to each other
              <div key={tool.alt} class="flex flex-col items-center p-4 mx-2 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <img src={tool.src} alt={tool.alt} class="md:h-16 md:w-16 h-8 w-8 mb-2" />
              </div>
            ))}
            </div>
          </AnimatedTools>
          <AnimatedTools xDistance={20} speed={3}>
            {/* The children are now individual tool items, not a grid div */}
            <div class="flex flex-row justify-between">
            {tools.slice(16, 20).map((tool) => (
              // Each tool item needs some spacing if they are directly next to each other
              <div key={tool.alt} class="flex flex-col items-center p-4 mx-2 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <img src={tool.src} alt={tool.alt} class="md:h-16 md:w-16 h-8 w-8 mb-2" />
              </div>
            ))}
            </div>
          </AnimatedTools>
        </div>
      </div>
    </section>
  );
});