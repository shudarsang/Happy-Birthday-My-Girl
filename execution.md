# Project: A Cute, Romantic Birthday Website for My Girlfriend

## 1. Project Objective

Build a beautiful, fully functional, highly girlish, romantic birthday website for my girlfriend's birthday on **29 October 2026**.

I will provide a reference image of the website design. Use that image as the primary visual reference and reproduce its overall layout, colors, typography, spacing, decorative elements, and visual atmosphere as closely as possible.

However, improve the design with delightful interactions, adorable animated cats, smooth scrolling, and personalized romantic details.

The final website should feel like a cute, interactive digital birthday gift made with love, rather than a generic landing page.

**Most important requirements:**
- Follow the reference image closely.
- Use a pastel pink, blush, cream, and white color palette.
- Include lots of adorable animated cats throughout the website.
- Make the cats interact with scrolling and user actions.
- Create a beautiful gallery for our actual photos.
- Make the entire website responsive, smooth, and production-ready.

Do not merely generate a static mockup. Build the actual working website.

## 2. Technology Stack

Use the following technologies, adapting to the existing project if one is already provided:

- React
- Vite
- TypeScript where practical
- Tailwind CSS or clean, modular CSS
- Framer Motion (Motion for React) for animations
- Lucide React for interface icons

Use CSS animations for lightweight decorative effects and Framer Motion for more complex movement, scroll-triggered animations, and transitions.

Use semantic HTML, reusable React components, and a maintainable project structure.

Do not introduce unnecessary libraries.

## 3. Design Direction

The website must look extremely cute, feminine, romantic, soft, and dreamy.

### Color palette

Use these colors as the starting palette:

- Primary pink: #FFB6D5
- Soft blush: #FFE3EE
- Background pink: #FFF5F8
- Cream: #FFFDF8
- Lavender: #E9DDFB
- Romantic rose: #E94F87
- Dark plum text: #481A35
- White: #FFFFFF

Use gentle gradients, soft shadows, rounded corners, translucent elements, and subtle pink glow effects.

Avoid harsh black backgrounds, excessive contrast, overly corporate styling, or cluttered layouts.

### Visual elements

Include:
- Hand-drawn hearts and stars.
- Cute ribbons and bows.
- Small flowers and sparkles.
- Floating heart particles.
- Soft cloud-like section transitions.
- Polaroid-style photographs.
- Handwritten-style headings.
- Rounded buttons with playful hover effects.
- Tiny paw prints and cat-themed decorations.

Use decorations sparingly enough to maintain readability while making the site feel charming and personal.

## 4. Navigation Bar

Create a translucent, pill-shaped navigation bar at the top.

Include:

- A small heart or cat logo.
- Brand text: "For You ♡"
- Home
- Gallery
- Our Memories
- A Special Message
- A small heart icon on the right.

The navigation should be sticky or fixed, with a soft backdrop blur.

On mobile, convert it into a compact responsive navigation without overlapping content.

Clicking navigation items should smoothly scroll to their respective sections.

Add a subtle active-section indicator.

Include a tiny animated cat sitting beside the logo or peeking over the navigation bar.

## 5. Hero Section

Recreate the general composition of the reference image.

Use a spacious, soft-pink hero section with a romantic illustrated couple on one side and birthday text on the other.

### Text content

Small introductory text:

"To my favorite person ♡"

Main heading:

"Happy Birthday
My Love!"

Supporting message:

"Another year, another reason to love you more ♡
Thank you for being you!"

Birthday date:

"29 / 10 / 2026"

Use a cute handwritten font for the main heading and a readable rounded font for supporting text.

The heading should be expressive and beautifully sized on desktop while adapting to mobile.

Use a romantic couple illustration or a suitable placeholder visual. Do not invent realistic photographs of us.

Decorate the hero with pink hearts, bows, sparkles, and animated cats.

### Hero cat animations

Include several independent cat characters:

1. A tiny cat peeking from behind the hero heading.
2. A sitting cat wearing a pink bow.
3. A small cat chasing a floating heart.
4. A cat sleeping on a decorative cloud.
5. A tiny cat walking along the bottom edge of the hero section.

Each cat should have a distinct animation, timing, and personality.

Use CSS, inline SVG, or custom lightweight illustrations to create the cats. Prefer SVG or CSS-drawn cats so they remain crisp at different screen sizes.

Do not use random emoji as the primary cat illustrations.

## 6. Birthday Countdown

Create a beautiful rounded countdown card with a soft pink gradient and subtle shadow.

Display:

"Your Special Day Is In..."

- Days
- Hours
- Minutes
- Seconds

The countdown must calculate the time remaining until **29 October 2026 at 00:00 in the Asia/Kolkata timezone**.

Requirements:

- Update the countdown every second.
- Calculate the countdown using the actual target date rather than hardcoded numbers.
- Display zero after the target time has passed.
- Do not show a negative countdown.
- When the birthday arrives, replace the countdown heading with a birthday greeting such as "Today Is Your Special Day! ♡".
- Keep the countdown responsive and visually balanced.

Add a tiny animated cat sitting on top of the countdown card.

The cat can gently wave its paw or blink occasionally.

## 7. Main Cat Animation System — Highest Priority

Cats are a defining feature of this website. They should appear throughout the page, not only in one section.

Create a reusable cat animation system with multiple distinct cat characters.

Each cat should be an independent component with configurable properties such as:

- Cat type or appearance.
- Size.
- Position.
- Animation type.
- Animation duration.
- Animation delay.
- Scroll-triggered behavior.
- Optional decorative accessory.

Avoid having every cat perform the same movement.

### A. Cat running across the screen while scrolling

This is the most important animation.

Create a small, adorable cat that runs horizontally across the viewport as the user scrolls down.

Behavior:

- When the user begins scrolling down, the cat runs from the left edge toward the right edge of the screen.
- Its legs animate rapidly to simulate running.
- Its body bounces slightly with each step.
- Its tail swings naturally.
- The cat can occasionally blink.
- Small paw prints briefly appear behind it.
- Tiny hearts may appear during some runs.
- The cat should stop or leave the screen naturally when its animation finishes.
- Trigger the animation again when the user reaches selected sections, with enough spacing between appearances.

The animation should be synchronized with scrolling where practical, using Framer Motion's scroll progress utilities or an equivalent implementation.

Do not simply attach an uncontrolled animation to every scroll event.

Use a performant approach that avoids unnecessary React re-renders.

On desktop, let the cat run across most of the viewport width. On mobile, adjust its size and travel distance.

The cat should never permanently block text, photographs, buttons, or navigation.

Respect reduced-motion accessibility settings.

### B. Multiple running cats

Create several different running-cat variations.

Examples:

- A white cat with a pink bow.
- A cream-colored cat carrying a tiny heart.
- A gray kitten with a small ribbon.
- A fluffy orange kitten.
- A black-and-white kitten.

Give each cat a different silhouette or accessory so they are visually distinguishable.

Introduce them at different scroll positions rather than displaying all of them simultaneously.

Occasionally, allow two kittens to run together as if they are chasing each other.

Keep these animations delightful rather than distracting.

### C. Cats reacting to scrolling

Create different scroll-triggered behaviors:

- A cat peeks in from the left side of the screen.
- A kitten climbs upward along the side of a section.
- A sleepy cat stretches when a section enters the viewport.
- A kitten slides into view from behind a photograph.
- A cat jumps onto a decorative card and sits down.
- A cat follows a small floating heart.
- A kitten appears near the bottom of the page as the user approaches the footer.

Use intersection observers or Framer Motion viewport detection for section-based triggers.

Avoid triggering the same entrance animation repeatedly every time a user makes a small scroll movement. Use appropriate once-only triggers or deliberate re-entry behavior.

### D. Cat interactions

Add playful interactions:

- Hovering over a cat makes it blink, wiggle its ears, or sway its tail.
- Clicking a cat makes it perform a small jump.
- A click can release a few tiny hearts or paw prints.
- A sleeping cat occasionally displays a tiny "Zzz".
- A cat carrying a heart can drop the heart into a small floating animation.
- A cat may briefly display a cute speech bubble such as "Meow! ♡".

All interactions must be lightweight and must not interfere with navigation or gallery controls.

On touch devices, make interactions work with taps instead of relying exclusively on hover.

### E. Cat placement throughout the website

Distribute cats naturally across the following locations:

1. Navigation bar: a tiny peeking cat.
2. Hero section: three or four decorative cats with different behaviors.
3. Countdown card: a sitting or waving cat.
4. Gallery heading: a tiny kitten sitting beside the title.
5. Gallery section: cats peeking from behind selected photo frames.
6. Between major sections: occasional running cats.
7. Special message section: a cat holding a heart.
8. Footer: two tiny cats sitting beside each other.

These are placement suggestions, not a requirement to crowd every section.

Use enough animated cat moments to make the website feel full of life, while maintaining a clear visual hierarchy.

## 8. Our Gallery

Create a beautiful gallery section inspired by the reference image.

Section heading:

"♥ Our Gallery ♥"

Subtitle:

"A collection of our favorite moments ♡"

Display our photographs in a responsive grid or a playful polaroid layout.

### Gallery design

- White or pale-pink photo frames.
- Slightly varied rotations for selected photographs.
- Soft shadows.
- Rounded corners.
- Small hearts or doodles around the frames.
- Smooth hover transitions.
- Gentle entrance animations as photos enter the viewport.

Use actual image assets supplied in the project whenever available.

If no photos are supplied, create clearly identifiable placeholder images and organize the code so I can replace them easily.

Do not invent personal photographs or embed random unrelated images as though they were our memories.

### Gallery interactions

When the user hovers over a photograph:

- Slightly enlarge the frame.
- Straighten its rotation.
- Increase its shadow subtly.
- Reveal a small heart or decorative element.

When a photograph is clicked:

- Open it in an elegant lightbox.
- Show the image at a suitable size.
- Include previous and next controls.
- Include a close button.
- Allow closing with the Escape key.
- Support keyboard navigation where appropriate.
- Prevent the underlying page from scrolling while the lightbox is open.

On mobile, ensure the lightbox works with touch gestures or clear navigation controls.

Add a "View More Photos" button if the gallery contains more photos than initially displayed.

Do not make the gallery dependent on a backend unless the existing project already requires one.

### Cat interactions inside the gallery

- A kitten peeks over the top edge of one photo.
- A small cat occasionally walks along the gallery's bottom edge.
- A cat sits beside the gallery heading.
- A kitten briefly chases a tiny heart between photo frames.
- Selected frames can contain small paw-print decorations.

Keep the photographs visually dominant. Cats must never permanently cover important parts of the photos.

## 9. Our Memories Section

Create a section for meaningful moments from our relationship.

Heading:

"Our Little World ♡"

Use a timeline or a collection of rounded memory cards.

Each card should support:

- A photograph.
- A short title.
- A date, if provided.
- A brief personal caption.

Use placeholder content when the real memories have not yet been provided.

Possible placeholder titles:

- Our First Memory
- My Favorite Day
- Little Things, Big Feelings
- Every Moment With You

Animate the cards gently as they enter the viewport.

Include a tiny animated cat that walks between selected cards or sits near a memory.

Keep all text and memory data in an easy-to-edit configuration file or array.

Do not invent specific dates or relationship events.

## 10. A Special Birthday Message

Create a dedicated section for a personal message.

Heading:

"Just For You ♡"

Use a soft pink or cream card with handwritten typography, small decorative hearts, and a gentle entrance animation.

Include an editable placeholder message:

"To my favorite person,

You make my ordinary days feel special, and every little moment with you becomes a memory I want to keep forever.

I hope this birthday brings you as much happiness as you bring into my life.

Happy Birthday, my love. ♡"

Make the message easy to replace with my own words.

Add a small cat holding a heart beside the message card.

Optionally, include a button labeled "A Little Surprise" that reveals an additional message with a smooth transition.

Do not autoplay music or use disruptive sound effects.

## 11. Footer

Create a soft, romantic footer with a pink gradient and gentle decorative elements.

Display:

"I'm so lucky to have you in my life ♡"

Add two small cats sitting together.

Their tails can move gently, and tiny hearts can occasionally float upward.

Include a small closing line such as:

"Made with love, just for you. ♡"

Avoid adding unnecessary social links, business branding, or generic copyright text.

## 12. Global Animation and Scroll Behavior

Use smooth, coordinated animations throughout the entire page.

### Scroll animations

- Hero content fades and slides into place on initial load.
- Gallery images appear with subtle staggered timing.
- Memory cards enter the viewport with gentle movement.
- Decorative hearts float at different speeds.
- Cats run across the screen at selected scroll milestones.
- Small cats peek out from section edges.
- Footer decorations appear as the user approaches the bottom.

### Animation principles

- Prefer transform and opacity animations.
- Avoid animating layout-heavy properties on every frame.
- Avoid excessive blur, huge particle counts, or heavy animation libraries.
- Keep animations smooth on mid-range mobile devices.
- Use a centralized animation configuration where practical.
- Avoid horizontal overflow caused by off-screen cat movement.
- Use appropriately managed event listeners and clean up observers.
- Do not create hundreds of DOM elements for decorative particles.
- Avoid repeating or stacking multiple running-cat animations accidentally.

### Reduced motion

Respect `prefers-reduced-motion`.

When reduced motion is enabled:

- Disable continuous running and floating animations.
- Replace large movements with simple fades or static decorations.
- Keep all content and interactions accessible.

The website must remain attractive even when animations are disabled.

## 13. Typography and Visual Polish

Use complementary fonts such as:

- A playful handwritten font for romantic headings.
- A rounded sans-serif font for navigation and body content.

Suitable examples include Caveat, Fredoka, and Nunito.

Load fonts efficiently and provide fallbacks.

Use consistent spacing, appropriate line heights, balanced section widths, and subtle borders.

Avoid excessive font sizes on mobile, overlapping decorations, inconsistent shadows, or too many competing visual effects.

The finished site should feel cohesive and intentionally designed.

## 14. Responsive Design

The website must work properly on:

- Desktop computers.
- Laptops.
- Tablets.
- Mobile phones.

### Desktop

- Spacious hero layout.
- Large, visually expressive headings.
- Prominent photo gallery.
- Cats running across the viewport.
- Decorative elements distributed around the content.

### Mobile

- Stack the hero content vertically.
- Keep the main heading readable.
- Place the countdown below the introductory message.
- Use a responsive two-column or one-column photo grid as appropriate.
- Reduce cat sizes and animation distances.
- Prevent navigation overflow.
- Keep buttons large enough to tap.
- Ensure cats do not cover text or interactive controls.

Test at narrow viewport widths as well as common desktop resolutions.

## 15. Performance and Accessibility

- Use lazy loading for gallery images below the fold.
- Reserve image dimensions to reduce layout shifts.
- Avoid unnecessary dependencies.
- Use semantic section headings.
- Add descriptive alt text to personal photographs.
- Provide accessible labels for icon-only buttons.
- Ensure adequate text contrast.
- Support keyboard navigation in the gallery and lightbox.
- Prevent animation loops from continuing unnecessarily when components unmount.
- Ensure decorative cats are hidden from screen readers where appropriate.
- Use optimized SVG or CSS illustrations instead of unnecessarily large animated image files.

Do not use enormous GIFs for every cat.

## 16. Code Architecture

Keep the implementation modular.

Suggested structure:

src/
  components/
    Navbar.tsx
    Hero.tsx
    BirthdayCountdown.tsx
    Cat.tsx
    RunningCat.tsx
    CatDecorations.tsx
    Gallery.tsx
    PhotoLightbox.tsx
    Memories.tsx
    SpecialMessage.tsx
    Footer.tsx
  data/
    photos.ts
    memories.ts
    siteConfig.ts
  hooks/
    useBirthdayCountdown.ts
    useScrollAnimations.ts
  assets/
    photos/
    cats/
  styles/
    globals.css
  App.tsx
  main.tsx

Adapt this structure to the actual project rather than blindly duplicating existing files.

Keep reusable cat animation components separate from the main page.

Store the birthday date, messages, gallery images, and memory captions in easy-to-edit configuration files.

Do not put the entire application into one enormous component.

## 17. Implementation Instructions

Before coding:

1. Inspect the existing project files and package configuration.
2. Identify the current framework, dependencies, and entry points.
3. Reuse existing components and conventions where appropriate.
4. Use the supplied reference image to guide the visual implementation.
5. Plan the page structure and reusable animation components.

Then implement the complete website.

If a project already exists, modify it rather than unnecessarily rebuilding it from scratch.

If the project is empty, create the required files and configuration.

Install only the dependencies that are genuinely needed.

Do not stop after generating a plan, mockup, or isolated component.

Implement the full experience, including functional navigation, a working countdown, gallery lightbox, responsive layouts, and the cat animation system.

## 18. Final Quality Checklist

Before considering the project complete, verify the following:

- [ ] The overall design closely follows the supplied reference image.
- [ ] The website feels cute, girlish, romantic, and personal.
- [ ] The birthday date is 29 October 2026.
- [ ] The countdown uses the correct timezone and updates every second.
- [ ] The gallery supports actual photographs and placeholder replacement.
- [ ] Clicking a photograph opens the lightbox.
- [ ] Navigation links scroll to the correct sections.
- [ ] Multiple distinct cat illustrations appear across the website.
- [ ] At least one cat runs across the screen in response to scrolling.
- [ ] Running cats have animated legs, body bounce, and tail movement.
- [ ] Additional cats have distinct behaviors such as peeking, jumping, sitting, and chasing hearts.
- [ ] Cats do not permanently obstruct photographs, text, or controls.
- [ ] Animations remain smooth and performant.
- [ ] Reduced-motion preferences are respected.
- [ ] The site works on mobile and desktop.
- [ ] No broken assets, console errors, or nonfunctional buttons remain.
- [ ] All personal messages and photos can be easily customized.

## Final Instruction

Treat the supplied image as the primary design reference, but do not limit yourself to copying a static screenshot.

Build a delightful, fully functional birthday website where the visual identity is pastel pink and romantic, the gallery celebrates our memories, and cute animated cats bring the whole experience to life.

**The signature feature is the collection of adorable cats that run, peek, jump, chase hearts, and react to scrolling.** Make these animations feel intentional, varied, smooth, and charming.

Prioritize visual quality, functional completeness, and performance over adding unnecessary features.

Start by inspecting the project, then implement the complete website and explain how I can add our photographs and customize the birthday message.