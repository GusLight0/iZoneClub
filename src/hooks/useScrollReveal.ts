import { useEffect } from "react";

const STAGGER_STEP = 70;
const MAX_STAGGER_DELAY = 420;

function collectRevealElements(root: ParentNode) {
  const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (root instanceof HTMLElement && root.matches("[data-reveal]")) {
    return [root, ...elements];
  }

  return elements;
}

function formatDelay(delay: string | undefined, fallback: string) {
  if (!delay) return fallback;
  return /^\d+$/.test(delay) ? `${delay}ms` : delay;
}

function getRevealDelay(element: HTMLElement) {
  const group = element.closest<HTMLElement>("[data-reveal-stagger]");

  if (!group) {
    return formatDelay(element.dataset.revealDelay, "0ms");
  }

  const groupedElements = collectRevealElements(group).filter(
    (item) => item.closest("[data-reveal-stagger]") === group
  );
  const index = Math.max(groupedElements.indexOf(element), 0);
  const staggerDelay = `${Math.min(index * STAGGER_STEP, MAX_STAGGER_DELAY)}ms`;

  return formatDelay(element.dataset.revealDelay, staggerDelay);
}

export function useScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const preparedElements = new WeakSet<HTMLElement>();
    let observer: IntersectionObserver | undefined;

    function revealElement(element: HTMLElement) {
      element.dataset.revealed = "true";
      element.classList.add("is-visible");
      observer?.unobserve(element);
    }

    if (!reducedMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealElement(entry.target as HTMLElement);
            }
          });
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.12
        }
      );
    }

    function prepareElement(element: HTMLElement) {
      if (preparedElements.has(element) || element.dataset.revealed === "true") return;

      preparedElements.add(element);
      element.style.setProperty("--reveal-delay", reducedMotion ? "0ms" : getRevealDelay(element));

      if (reducedMotion) {
        revealElement(element);
        return;
      }

      observer?.observe(element);
    }

    collectRevealElements(document).forEach(prepareElement);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            collectRevealElements(node).forEach(prepareElement);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
