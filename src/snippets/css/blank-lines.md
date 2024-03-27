---
caption: "Note that properties are alphabetized for easy scanning."
---

```css
figure {
	align-items: stretch;
	display: flex;
	flex-direction: column-reverse;
	gap: 0.5rem;
	justify-content: space-between;
	margin: var(--space-m, 1.25rem) 0;
}

figcaption {
	line-height: 1;
	padding: 0;
	text-align: center;
}

figure.is-indexed figcaption::before {
	content: "Figure " counter(figures) ": ";
}
```
