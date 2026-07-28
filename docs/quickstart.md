# Uso rapido del Design System YiQi

Esta guia es para quien solo necesita consumir el Design System desde una app.
No hace falta leer la documentacion completa del repositorio para este caso.

## 1. Incorporar estilos al proyecto

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">

<!-- Evitar copiar el contenido localmente -->
```

Regla de oro: el proyecto consumidor debe llamar esta hoja publicada desde el
repo `yiqi-imagen`. No copies `styles.css`, tokens, temas ni clases visuales al
proyecto consumidor. Si falta una regla visual reusable, agregala primero en
este repo y luego consumila desde la URL publicada.

## 2. Activar tema

```html
<!-- El tema por defecto es "system" (sigue la preferencia del OS) -->
<body data-theme="system">

<!-- Forzar dark o light -->
<body data-theme="dark">
<body data-theme="light">
```

El toggle tiene 3 estados: `"dark"` -> `"system"` -> `"light"`.

## 3. Fondos

**Dashboards y apps**: solo radiales, sin grilla.

```html
<body data-theme="system">
  <!-- El fondo radial se aplica automaticamente desde styles.css -->
```

**Marketing y landing**: usar la clase canónica publicada para la variante de
fondo correspondiente. No recrear la grilla en una hoja local. Si la variante
necesaria todavía no existe, debe agregarse primero a `styles.css`.

## 4. CSS permitido en la app

La app no debe contener CSS visual embebido (`<style>`, CSS-in-JS visual o
`cssText`). El CSS local se limita a adaptadores pequeños de comportamiento o
integración y vive en archivos `.css` separados.

Los estilos inline se reservan para valores realmente calculados en runtime:

```tsx
<div className="load-progress-fill" style={{ width: `${progress}%` }} />
```

No usar inline para constantes visuales:

```tsx
{/* Incorrecto: debe ser una clase de styles.css */}
<div style={{ display: 'grid', gap: 12 }} />
```
