import { component$ } from "@builder.io/qwik";

export default component$(() => { 
  // Calculate years of experience from April 2021 to now
  // const start = new Date(2021, 3); // April 2021 (month is 0-indexed)
  // const now = new Date();
  // let years = now.getFullYear() - start.getFullYear();
  // if (now.getMonth() < start.getMonth()) {
  //   years--;
  // }
  return (
  
  <section id="about" class="w-full max-w-xl mx-auto py-12 px-4">
    <h2 class="text-2xl font-bold mb-2 text-gray-900">About Me</h2>
    <p class="text-gray-700">
      I am a passionate fullstack developer with over {4} years of experience in building scalable web applications and enterprise solutions. My expertise spans across the entire development stack, including Django, Python, JavaScript, Svelte, React, PostgreSQL, Redis, Docker, and Nginx. I have a proven track record of delivering high-quality, performant applications that solve complex business problems. I'm particularly interested in system architecture, optimization, and creating maintainable codebases. When I'm not coding, I enjoy learning new things and staying up-to-date with the latest technology trends. I thrive in collaborative environments and take pride in mentoring junior developers while continuously learning from my peers.
    </p>
  </section>
)
});