export function closeSibblingContexts(contextId: string) {
  const context = document.getElementById(contextId);
  if (context) {
    // Get the parent element of the clicked <p>
    const parent = context.closest(
      `.contextsHolders:not(#${contextId.replaceAll(" ", "")})`
    );

    // Get all <p> elements inside the parent
    const siblings = parent?.querySelectorAll(".contextsHolders");

    // Change the color of all sibling <p>, excluding the clicked <p>
    siblings?.forEach((sibling) => {
      if (sibling !== context) {
        (sibling as HTMLElement).style.display = "none"; // Change this to any color you want
      }
    });
  }
}
export function getTotalZIndex(element: HTMLElement): number {
  let totalZIndex = 0;
  let currentElement: HTMLElement | null = element;

  while (currentElement && currentElement !== document.documentElement) {
    const computedStyle = window.getComputedStyle(currentElement);
    const zIndex = parseInt(computedStyle.zIndex, 10);

    if (!isNaN(zIndex) && zIndex !== 0) {
      totalZIndex += zIndex;
    }

    // Move to the parent element
    currentElement = currentElement.parentElement;
  }

  return totalZIndex;
}
