## Math

Inline equation: $E = mc^2$.

$$\int_0^1 x^2\,dx = \frac{1}{3}$$

## Diagram

```mermaid
flowchart LR
  Review --> Patch --> Verify --> Merge
```

## Chart

```chart
{"type":"bar","data":{"labels":["Before","After"],"datasets":[{"label":"Reviewed changes","data":[2,6],"backgroundColor":["#7360b0","#4388c4"]}]},"options":{"animation":false}}
```

## Code and Markdown extensions

```js
const result = { status: 'verified' };
console.log(result.status);
```

Highlighted ==text==, a H~2~O subscript, a squared x^2^, and a footnote.[^note]

[^note]: A footnote rendered by the maintained Markdown extension.

::: tip Verification
The original container styling and title should be retained.
:::

:::: code-group
::: code-group-item JavaScript
```js
export const status = 'verified';
```
:::
::: code-group-item TypeScript
```ts
export const status: string = 'verified';
```
:::
::::
